<template>
  <div class="wrapper-transecta">
    <div class="transecta-title">
      Пробная площадка
    </div>
    <UBadge color="white" variant="solid">ID: {{ id.toString() }}</UBadge>
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
            <UButton @click="isOpen = true">Создать</UButton>
          </div>
        </template>
      </UTable>
      <div class="wrapper-transecta-footer-table" v-if="model.plant && model.plant.length > 0">
        <UButton @click="isOpen = true">Создать</UButton>
        <UPagination v-model="page" :page-count="pageCount" :total="model.plant.length"/>
      </div>
    </div>
    <UButton :loading="loading" @click="handlerOnUpdate">Обновить</UButton>
  </div>
  <UModal  v-model="isOpen">
    <plant-form :type="typePlantForm" :option-type-plant="typePlantStore.getTypePlants" @on-create="CratePlant"/>
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
typePlantStore.fetchTypePlant()
trialSiteStore.fetchTrialSiteById(id)
const loading = ref<boolean>(false)

const typePlantForm = ref<TypeForm>("create")

const handlerOnUpdate = async () => {
  try {
    loading.value = true
    await trialSiteStore.UpdateTrialSite(model.value)
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
    if (!model.value.plant) {
      model.value.plant = []
      model.value.plant.push(trialSiteStore.getPlant)
    } else {
      const trialSite = model.value.plant
      trialSite.push(trialSiteStore.getPlant)
      model.value.plant = trialSite
    }
    await trialSiteStore.UpdateTrialSite(model.value)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}



const model = ref<TrialSite>(trialSiteStore.getTrialSite)

const columns = [{
  key: 'id',
  label: '№'
}, {
  key: 'typePlant',
  label: 'Тип растения'
}, {
  key: 'count',
  label: 'Количество'
}, {
  key: 'coverage',
  label: 'Покрытость'
}, {
  key: 'actions'
}]

const items = (row) => [
  [{
    label: 'Открыть',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo("transecta/" + btoa(row.id))
  },], [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => console.log("Delete", row)
  }]
]

const page = ref(1)
const pageCount = 8

const rows = computed(() => {
  if(model.value.plant){
    return model.value.plant.slice((page.value - 1) * pageCount, (page.value) * pageCount)
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