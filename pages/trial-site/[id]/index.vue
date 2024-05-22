<template>
  <div class="wrapper-transecta">
    <div class="transecta-title">
      Пробная площадка
    </div>
    <UBadge color="white" variant="solid">ID: {{ model.id.resourceId.toString() }}</UBadge>
    <div class="wrapper-transecta-input">
      <UInput v-model:model-value="model.title"/>
      <UInput v-model:model-value="model.rating"/>
      <UInput v-model:model-value="model.covered"/>
    </div>
    <div>
      <div class="plant-title">
        Растения
      </div>
      <UTable :columns="columns" :rows="rows">
        <template #id-data="{row, index}">
          {{ index + 1 }}
        </template>
        <template #typePlant-data="{row, index}">
          <span v-if= "row.typePlant && row.typePlant.title">{{ row.typePlant.title }}</span>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost"/>
          </UDropdown>
        </template>
        <template #empty-state>
          <div class="wrapper-empty-state">
            <div>
              Создать новое растение
            </div>
            <UButton @click="onCreatPlant">Создать</UButton>
          </div>
        </template>
      </UTable>
      <div class="wrapper-transecta-footer-table" v-if="model.plant && model.plant.length > 0">
        <UButton @click="onCreatPlant">Создать</UButton>
        <UPagination v-model="page" :page-count="pageCount" :total="model.plant.length"/>
      </div>
    </div>
    <UButton :loading="loading" @click="handlerOnUpdate">Обновить</UButton>
  </div>
  <UModal  v-model="isOpen">
    <plant-form :type="typePlantForm" :model-value="plant" :option-type-plant="typePlantStore.getTypePlants" @on-create="CratePlant" @on-updated="UpdatePlant"/>
  </UModal>
</template>

<script lang="ts" setup>
import type {Plant, TrialSite} from "~/stores/trial-site/types";
import {useTrialSite} from "~/stores/trial-site/trial-site";
import {useTypePlant} from "~/stores/type-plant/type-plant";
import type {TypeForm} from "~/stores/types";


const isOpen = ref<boolean>(false)
const trialSiteStore = useTrialSite()
const typePlantStore = useTypePlant()
const route = useRoute();
const id = atob(route.params.id.toString());
const loading = ref<boolean>(false)

const typePlantForm = ref<TypeForm>("create")
const plant= ref<Plant>()

const page = ref(1)
const pageCount = 8

await useAsyncData( async () => {
  await trialSiteStore.fetchTrialSiteById(id)
})

typePlantStore.fetchTypePlant()

let model =  reactive({...trialSiteStore.getTrialSite})


const handlerOnUpdate = async () => {
  try {
    loading.value = true
    await trialSiteStore.UpdateTrialSite(model)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const CratePlant = async (value: Plant) => {
  try {
    loading.value = true
    await trialSiteStore.CratePlant(value)
    if (!model.plant) {
      model.plant = []
      model.plant.push(trialSiteStore.getPlant)
    } else {
      const trialSite = model.plant
      const plant = trialSiteStore.getPlant
      trialSite.push(plant)
      model.plant = trialSite
    }
    await trialSiteStore.UpdateTrialSite(model)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const UpdatePlant = async (value: Plant) => {
  try {
    loading.value = true
    await trialSiteStore.UpdatePlant(value)
    const index = model.plant.findIndex(item => item.id!.resourceId === value.id!.resourceId)
    model.plant[index] = value
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const onCreatPlant = () => {
  isOpen.value = true
  typePlantForm.value = "create"
  plant.value = undefined
}

const handlerOnDeletePlant = async (input: Plant) => {
  try {
    loading.value = true;
    await trialSiteStore.DeletePlant(input.id!);
    const index = model.plant.findIndex(item => item.id!.resourceId === input.id!.resourceId)
    model.plant.splice(index, 1)
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};



//Таблица
const columns = [
    {
  key: 'id',
  label: '№'
}, {
  key: 'typePlant',
  label: 'Вид растения'
}, {
  key: 'count',
  label: 'Количество особей'
}, {
  key: 'coverage',
  label: 'Покрытие'
}, {
  key: 'actions'
}]

const items = (row: Plant) => [
  [{
    label: 'Изменить',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      isOpen.value = true
      plant.value = row
      typePlantForm.value = "update"
    }
  },], [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => handlerOnDeletePlant(row)
  }]
]


const rows = computed(() => {
  if(model.plant){
    return model.plant.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  }
})

</script>

<style lang="scss" scoped>
.wrapper-transecta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
}
.wrapper-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.wrapper-transecta-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 600px;
  gap: 15px;
}

.wrapper-transecta-footer-table{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.transecta-title {
  font-size: 36px;
  color: var(--ling-root);
  font-weight: 700;
}
</style>