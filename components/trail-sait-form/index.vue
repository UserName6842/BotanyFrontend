<template>
  <UForm :state="modelValue" :validate="validateTransect" @submit="$emit('onCreate', modelValue )">
    <div class="wrapper-trail-site-form">
      <div class="title-s">Создание пробной площадки</div>
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
      <UButton type="submit">Создать</UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import type {TypeForm} from "~/stores/types";
import type {TrialSite} from "~/stores/trial-site/types";
import {validateTransect} from "~/components/transect-form/helpers";

interface TrialSiteFormProps {
  type: TypeForm
  modelValue: TrialSite
}

interface TrialSiteFormEmit {
  (event: 'onCreate', value: TrialSite | undefined): void
}

defineEmits<TrialSiteFormEmit>()

const modelValue: TrialSite = reactive({
  id: {
    resourceId: ""
  },
  title: "",
  plant: []
})

</script>

<style lang="scss" scoped>
.wrapper-trail-site-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}
</style>
