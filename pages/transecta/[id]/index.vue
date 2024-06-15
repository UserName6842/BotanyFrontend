<template>
  <defaults-loader v-if="false"/>
  <div v-else>
    <div class="wrapper-transecta">
      <div class="title-m">
        Трансекта
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3 w-[300px]">
        <UBadge v-if=" modelValue && modelValue.id" color="white" variant="solid">ID:
          {{ modelValue.id.resourceId }}
        </UBadge>
        <UBadge v-if="modelValue && modelValue.rating" color="white" variant="solid">
          Баллы: {{ modelValue.rating }}
        </UBadge>
        <UBadge v-if=" modelValue && modelValue.countTypes" color="white" variant="solid">
          Кол-во видов: {{ modelValue.countTypes }}
        </UBadge>
        <UBadge v-if=" modelValue  && modelValue.dominant" color="white" variant="solid">
          Доминант: {{ modelValue.dominant?.title }}
        </UBadge>
        <UBadge v-if=" modelValue  && modelValue.subDominant" color="white" variant="solid">
          Содоминант: {{ modelValue.subDominant?.title }}
        </UBadge>
      </div>
      <UForm :state="modelValue" :validate="validateTransect">
        <div class="wrapper-transecta-input">

          <UFormGroup label="Название" name="title">
            <UInput v-model="modelValue.title" class="w-[205px]" placeholder="Введите название"/>
          </UFormGroup>
          <UFormGroup label="Покрытость" name="covered">
            <UInput v-model="modelValue.covered" class="w-[205px]" placeholder="Введите покрытость" type="number">
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
              </template>
            </UInput>
          </UFormGroup>
          <UFormGroup label="Площадь ПП" name="squareTrialSite">
            <UInput v-model="modelValue.squareTrialSite" class="w-[205px]" placeholder="Введите Площадь ПП"
                    type="number">
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">м <sup>2</sup></span>
              </template>
            </UInput>
          </UFormGroup>
          <UFormGroup label="Площадь" name="square">
            <UInput v-model="modelValue.square" class="w-[205px]" placeholder="Введите Площадь Трансекты" type="number">
              <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">м <sup>2</sup></span>
              </template>
            </UInput>
          </UFormGroup>
        </div>
      </UForm>
      <div class="wrapper-transecta-table">
        <div class="title-xs">
          Пробные площадки
        </div>
        <UTable :columns="columns" :loading="loading" :rows="rows">
          <template #id-data="{row, index}">
            {{ (index + 1) + (pageCount * (page - 1)) }}
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
          <UButton v-if=" modelValue.trialSite && modelValue.trialSite.length > 0" @click="isOpen = true">Создать
          </UButton>
          <UPagination v-if="modelValue.trialSite && modelValue.trialSite.length > pageCount" v-model="page"
                       :page-count="pageCount"
                       :total="modelValue.trialSite.length"/>
        </div>
      </div>
      <UButton :loading="loading" @click="handlerOnUpdate">Обновить</UButton>
    </div>
    <UModal v-model="isOpen">
      <trail-sait-form type="create" @on-create="CreateTrailSite"/>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import {useTransecta} from "~/stores/transecta/transecta";
import type {TrialSite} from "~/stores/trial-site/types";
import {useTrialSite} from "~/stores/trial-site/trial-site";
import {validateTransect} from "~/components/transect-form/helpers";
import {useWindowSize} from "@vueuse/core";

const route = useRoute();
const id = atob(route.params.id.toString());
const transectaStore = useTransecta()
const page = ref(1)
const pageCount = 4
const loading = ref<boolean>(false)
const trialSiteStore = useTrialSite()
const isOpen = ref<boolean>(false)

await useAsyncData(async () => {
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
    const newTrialSite = {...trialSiteStore.getTrialSite};
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


const {width} = useWindowSize()


const columns = computed(() => {
  if (width.value > 700) {
    return [
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
  } else {
    return [
      {
      key: 'id',
      label: '№'
      },
      {
        key: 'title',
        label: 'Название'
      },
      {
        key: 'actions'
      }
    ]
  }
})

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
  return modelValue && modelValue.trialSite ? modelValue.trialSite.slice((page.value - 1) * pageCount, (page.value) * pageCount) : []
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
  width: 100%;
  justify-content: space-around;
}

.wrapper-transecta-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 700px;
  gap: 15px;
}

@media (min-width: 260px) and (max-width: 700px) {
  .wrapper-transecta-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 255px;
    gap: 15px;
  }
}

</style>
