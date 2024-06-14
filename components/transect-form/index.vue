<template>
  <div class="wrapper-transecta">
    <div class="title-m">
      Трансекта
    </div>
    <UBadge v-if="type === 'update' && modelValue && modelValue.id" color="white" variant="solid">ID:
      {{ modelValue.id.resourceId }}
    </UBadge>
    <UForm :state="modelValue" :validate="validateTransect" @submit="handlerOnCreate">
      <div class="wrapper-transecta-input">
        <UFormGroup label="Название" name="title">
          <UInput class="w-[205px]" v-model="modelValue.title" placeholder="Введите название"/>
        </UFormGroup>
        <UFormGroup label="Покрытость" name="covered">
          <UInput class="w-[205px]" v-model="modelValue.covered" placeholder="Введите покрытость" type="number">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Площадь ПП" name="squareTrialSite">
          <UInput class="w-[205px]" v-model="modelValue.squareTrialSite" placeholder="Введите Площадь ПП" type="number">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">м <sup>2</sup></span>
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Площадь" name="square">
          <UInput class="w-[205px]" v-model="modelValue.square" placeholder="Введите Площадь Трансекты" type="number">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">м <sup>2</sup></span>
            </template>
          </UInput>
        </UFormGroup>
      </div>
      <div class="flex flex-col mt-10 items-center">
        <UButton v-if="type === 'create'" :loading="loading" type="submit">Создать</UButton>
      </div>

    </UForm>
    <div v-if="type === 'update' " class="wrapper-transecta-table">
      <div class="plant-title">
        Пробные площадки
      </div>
      <UTable :columns="columns" :loading="loading" :rows="rows">
        <template #id-data="{row, index}">
          {{ index + 1 }}
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
        <UPagination v-if="modelValue.trialSite" v-model="page" :page-count="pageCount"
                     :total="modelValue.trialSite.length"/>
      </div>
    </div>
    <div v-if="type === 'update'">
      <UButton :loading="loading" @click="handlerOnUpdate">Обновить</UButton>
    </div>
  </div>
  <UModal v-model="isOpen">
    <trail-sait-form type="create" @on-create="CreateTrailSite"/>
  </UModal>
</template>

<script lang="ts" setup>
import type {Transecta} from "~/stores/transecta/types";
import type {TypeForm} from "~/stores/types";
import {useTransecta} from "~/stores/transecta/transecta";
import type {TrialSite} from "~/stores/trial-site/types";
import {useTrialSite} from "~/stores/trial-site/trial-site";
import {validateTransect} from "~/components/transect-form/helpers";


interface TransectaFormProps {
  type: TypeForm
}

defineProps<TransectaFormProps>()


const page = ref(1)
const pageCount = 8
const loading = ref<boolean>(false)
const transectaStore = useTransecta()
const trialSiteStore = useTrialSite()
const isOpen = ref<boolean>(false)

const modelValue: Transecta = {
  id: {resourceId: ""},
  title: "",
  trialSite: []
};

const CreateTrailSite = async (input: TrialSite) => {
  try {
    loading.value = true;
    await trialSiteStore.CrateTrialSite(input);
    const newTrialSite = trialSiteStore.getTrialSite;
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
const handlerOnCreate = async () => {
  try {
    loading.value = true;
    await transectaStore.CrateTransecta(modelValue);
    const transecta = transectaStore.getTransect;
    if (transecta && transecta.id && transecta.id.resourceId !== '') {
      navigateTo(`/transecta/${btoa(transecta.id.resourceId)}`);
    }
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
    label: 'Рейтинг'
  },
  {
    key: 'covered',
    label: 'Покрытость'
  },
  {
    key: 'dominant',
    label: 'Доминант'
  },
  {
    key: 'subDominant',
    label: 'Сабдоминант'
  }, {
    key: 'actions'
  }]

const items = (row) => [
  [{
    label: 'Открыть',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo("/trial-site/" + btoa(row.id?.resourceId!))
  },], [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => console.log("Delete", row)
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
  justify-content: space-between;
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
