<template>
  <div class="wrapper-transecta h-full">
    <div class="title-m">Трансекта</div>
    <UForm :state="modelValue" :validate="validateTransect" @submit="handlerOnCreate">
      <div class="wrapper-transecta-input">
        <UFormGroup label="Название" name="title">
          <UInput v-model="modelValue.title" class="w-[205px]" placeholder="Введите название" />
        </UFormGroup>
        <UFormGroup label="Покрытость" name="covered">
          <UInput v-model="modelValue.covered" class="w-[205px]" placeholder="Введите покрытость" type="number">
            <template #trailing>
              <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup label="Площадь ПП" name="squareTrialSite">
          <UInput v-model="modelValue.squareTrialSite" class="w-[205px]" placeholder="Введите Площадь ПП" type="number">
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
      <div class="flex flex-col mt-10 items-center">
        <UButton v-if="type === 'create'" :loading="loading" type="submit">Создать</UButton>
      </div>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import type { Transecta } from "~/stores/transecta/types";
import type { TypeForm } from "~/stores/types";
import { useTransecta } from "~/stores/transecta/transecta";
import { validateTransect } from "~/components/transect-form/helpers";

interface TransectaFormProps {
  type: TypeForm;
}

defineProps<TransectaFormProps>();

const loading = ref<boolean>(false);
const transectaStore = useTransecta();

const modelValue: Transecta = {
  id: { resourceId: "" },
  title: "",
  trialSite: [],
};

const handlerOnCreate = async () => {
  try {
    loading.value = true;
    await transectaStore.CrateTransecta(modelValue);
    const transecta = transectaStore.getTransect;
    if (transecta && transecta.id && transecta.id.resourceId !== "") {
      navigateTo(`/transecta/${btoa(transecta.id.resourceId)}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
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
