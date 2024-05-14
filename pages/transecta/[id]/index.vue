<template>
  <defaults-loader v-if="false" />
  <div v-else>
    <div class="wrapper-transecta">
      <div class="transecta-title">
        Трансекта
      </div>
      <UBadge v-if=" modelValue && modelValue.id" color="white" variant="solid">ID:
        {{ modelValue.id.resourceId }}
      </UBadge>
      <div class="wrapper-transecta-input">
        <UInput v-model:model-value="modelValue.title" placeholder="Название"/>
        <UInput v-model:model-value="modelValue.rating" placeholder="Балы"/>
        <UInput v-model:model-value="modelValue.covered" placeholder="Покрытость"/>
        <UInput v-model:model-value="modelValue.countTypes" placeholder="Количество типов растений"/>
        <UInput v-model:model-value="modelValue.squareTrialSite" placeholder="Площадь ПП"/>
        <UInput v-model:model-value="modelValue.square" placeholder="Площадь"/>
      </div>
      <div class="wrapper-transecta-table">
        <div class="plant-title">
          Пробные площадки
        </div>
        <UTable :columns="columns" :loading="loading" :rows="rows">
          <template #id-data="{row, index}">
            {{ (index + 1) + (pageCount * (page - 1))  }}
          </template>
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost"/>
            </UDropdown>
          </template>
          <template #dominant-data="{ row }">
            <span v-if="row.dominant"> {{ row.dominant.title }} </span>
          </template>
          <template #subDominant-data="{ row }">
            <span v-if="row.subDominant"> {{ row.subDominant.title }} </span>
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
          <UButton v-if=" modelValue.trialSite && modelValue.trialSite.length > 0" @click="isOpen = true">Создать</UButton>
          <UPagination v-if="modelValue.trialSite" v-model="page" :page-count="pageCount" :total="modelValue.trialSite.length"/>
        </div>
      </div>
        <UButton :loading="loading" @click="handlerOnUpdate">Обновить</UButton>
    </div>
    <UModal v-model="isOpen">
      <trail-sait-form type="create" @on-create="CreateTrailSite"/>
    </UModal></div>
</template>

<script lang="ts" setup>
import { useTransecta } from "~/stores/transecta/transecta";
import type {TrialSite} from "~/stores/trial-site/types";
import {useTrialSite} from "~/stores/trial-site/trial-site";
import type {Transecta} from "~/stores/transecta/types";

const route = useRoute();
const id = atob(route.params.id.toString());
const transectaStore = useTransecta()
const page = ref(1)
const pageCount = 8
const loading = ref<boolean>(false)
const trialSiteStore = useTrialSite()
const isOpen = ref<boolean>(false)

await useAsyncData( async () => {
  await transectaStore.fetchTransectaById(id)
})


const modelValue = reactive({...transectaStore.getTransect})

const handlerOnDeleteTrailSite = async (input: TrialSite) => {
  try {
    loading.value = true;
    await trialSiteStore.DeleteTrialSite(input.id!);
    const index = modelValue.trialSite.findIndex(item => item.id!.resourceId === input.id!.resourceId)
    modelValue.trialSite.splice(index, 1)
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const CreateTrailSite = async (input: TrialSite) => {
  try {
    loading.value = true;
    await trialSiteStore.CrateTrialSite(input);
    const newTrialSite = { ...trialSiteStore.getTrialSite };
    if (!modelValue.trialSite) {
      modelValue.trialSite = [];
    }
    modelValue.trialSite.push(newTrialSite);
    await handlerOnUpdate();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handlerOnUpdate = async () => {
  try {
    loading.value = true;
    await transectaStore.UpdateTransecta(modelValue);
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
  },
  {
    key: 'title',
    label: 'Название'
  },
  {
    key: 'rating',
    label: 'Обилие'
  },
  {
    key: 'covered',
    label: 'Покрытие'
  },
  {
    key: 'dominant',
    label: 'Доминант'
  },
  {
    key: 'subDominant',
    label: 'Содоминант'
  }, {
    key: 'actions'
  }]

const items = (row: TrialSite) => [
  [{
    label: 'Открыть',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo("/trial-site/" + btoa(row.id?.resourceId!))
  },], [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => handlerOnDeleteTrailSite(row)
  }]
]

const rows = computed(() => {
  return  modelValue && modelValue.trialSite ? modelValue.trialSite.slice((page.value - 1) * pageCount, (page.value) * pageCount) : []
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