<template>
  <div class="wrapper-transecta">
    <div class="transecta-title">
      Трансекта
    </div>
    <UBadge v-if="valueType === 'update' && value.id.resourceId" color="white" variant="solid">ID:
      {{ value.id.resourceId }}
    </UBadge>
    <div class="wrapper-transecta-input">
      <UInput v-model:model-value="value.title" placeholder="Название"/>
      <UInput v-model:model-value="value.rating" placeholder="Балы"/>
      <UInput v-model:model-value="value.covered" placeholder="Покрытость"/>
      <UInput v-model:model-value="value.countTypes" placeholder="Количество типов растений"/>
      <UInput v-model:model-value="value.squareTrialSite" placeholder="Площадь ПП"/>
      <UInput v-model:model-value="value.square" placeholder="Площадь"/>
    </div>
    <div v-if="valueType === 'update' " class="wrapper-transecta-table">
      <div class="plant-title">
        Пробные площадки
      </div>
      <UTable :columns="columns" :rows="rows">
        <template #id-data="{row, index}">
          {{ index + 1 }}
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost"/>
          </UDropdown>
        </template>
        <template #empty-state>
          <div class="wrapper-empty-state">
            <div>
              Создать пробную площадку
            </div>
            <UButton @click="isOpen = true">Создать</UButton>
          </div>
        </template>
      </UTable>
      <div class="wrapper-transecta-footer-table">
        <UButton v-if=" value.trialSite && value.trialSite.length > 0" @click="isOpen = true">Создать</UButton>
        <UPagination v-if="value.trialSite" v-model="page" :page-count="pageCount" :total="value.trialSite.length"/>
      </div>
    </div>
    <UButton v-if="valueType === 'create'" :loading="loading" @click="handlerOnCreate">Создать</UButton>
    <div v-else>
      <UButton :loading="loading" @click="handlerOnUpdate">Обновить</UButton>
    </div>
  </div>
  <UModal v-model="isOpen">
    <trail-sait-form/>
  </UModal>
</template>

<script lang="ts" setup>

import type {Transecta} from "~/stores/transecta/types";
import type {TypeForm} from "~/stores/types";
import {useTransecta} from "~/stores/transecta/transecta";


interface TransectaFormProps {
  type: TypeForm
  modelValue: Transecta
}

interface TrialSiteFormEmit {
  (event: 'onCreate', value: Transecta | undefined): Promise<Transecta | undefined>

  (event: 'onUpdated', value: Transecta | undefined): void
}

const emits = defineEmits<TrialSiteFormEmit>()
const loading = ref<boolean>(false)
const transectaStore = useTransecta()

const props = withDefaults(defineProps<TransectaFormProps>(), {
  modelValue: (props) => {
    return {
      id: {
        resourceId: ""
      },
      title: "",
      trialSite: [],
    }
  },
  type: "update"
})


const handlerOnCreate = async () => {
  try {
    loading.value = true
    await transectaStore.CrateTransecta(value.value)

    const transecta = transectaStore.getTransect
    if (transecta && transecta.id && transecta.id.resourceId !== "") {
      debugger
      navigateTo("/transecta/" + btoa(transecta.id.resourceId))
    }

  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }

}

const handlerOnUpdate = async () => {
  try {
    loading.value = true
    await transectaStore.UpdateTransecta(value.value)


  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }

}

let {modelValue, type} = toRefs(props)

let value = ref<Transecta>({...modelValue.value})
let valueType = type.value.toString()


const isOpen = ref<boolean>(false)

const columns = [{
  key: 'id',
  label: '№'
}, {
  key: 'title',
  label: 'Название'
}, {
  key: 'rating',
  label: 'Рейтинг'
}, {
  key: 'covered',
  label: 'Покрытость'
}, {
  key: 'actions'
}]

const items = (row) => [
  [{
    label: 'Открыть',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo("/trial-site/" + btoa(row.id))
  },], [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => console.log("Delete", row)
  }]
]

const page = ref(1)
const pageCount = 8

const rows = computed(() => {
  if (value.value.trialSite) {
    return value.value.trialSite.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  }
})

</script>

<style lang="scss" scoped>
.wrapper-transecta-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border: 1px solid var(--ling-root);
  border-radius: 16px;
  padding: 15px;

}

.wrapper-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.wrapper-transecta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
}

.wrapper-transecta-footer-table {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

.transecta-title {
  font-size: 36px;
  color: var(--ling-root);
  font-weight: 700;
}
</style>