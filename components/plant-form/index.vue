<template>
  <div class="wrapper-plant-form">
    <div class="title-s">
      <span v-if="type === 'create'">Создание</span>
      <span v-else>Обновление</span>
      растения
    </div>
    <UBadge v-if="type === 'update'" color="white" variant="solid">ID: {{ model.id.resourceId.toString() }}</UBadge>
    <div class="flex flex-col items-center justify-center">
      <UFormGroup label="Покрытость" name="covered">
        <USelectMenu v-model:model-value="selectValue" :options="optionTypePlant"
                     :searchable="search" class="w-36">
          <template #label>
            <span v-if="selectValue" class="truncate">{{ selectValue.title }}</span>
            <span v-else class="truncate">Не выбрано</span>
          </template>
          <template #option="{ option }">
            <span class="truncate">{{ option.title }}</span>
          </template>
        </USelectMenu>
      </UFormGroup>
    </div>
    <UFormGroup label="Покрытость" name="covered">
      <UInput v-model="model.coverage" class="w-[205px]" placeholder="Введите покрытость" type="number">
        <template #trailing>
          <span class="text-gray-500 dark:text-gray-400 text-xs">%</span>
        </template>
      </UInput>
    </UFormGroup>
    <UFormGroup label="Количество" name="covered">
      <UInput v-model="model.count" class="w-[205px]" placeholder="Введите количество" type="number">
        <template #trailing>
          <span class="text-gray-500 dark:text-gray-400 text-xs">шт</span>
        </template>
      </UInput>
    </UFormGroup>
    <UButton v-if="type === 'create'" :loading="loading" @click="handlerOnCreate">Создать</UButton>
    <UButton v-else :loading="loading" @click="handlerOnUpdete">Обновить</UButton>
  </div>
</template>

<script lang="ts" setup>

import type {Plant} from "~/stores/trial-site/types";
import type {TypePlant} from "~/stores/type-plant/types";


interface PlantFormEmit {
  (event: 'onCreate', value: Plant | undefined): void

  (event: 'onUpdated', value: Plant | undefined): void
}

interface PlantFormProps {
  type: TypeForm
  optionTypePlant: TypePlant[]
  modelValue: Plant
}

const handlerOnCreate = () => {
  if (selectValue.value) {
    model.typePlant = {id: selectValue.value?.id, title: selectValue.value?.title}
  }
  emits('onCreate', model)
}

const handlerOnUpdete = () => {
  if (selectValue.value) {
    model.typePlant = {id: selectValue.value?.id, title: selectValue.value?.title}
  }
  emits('onUpdated', model)
}

const props = withDefaults(defineProps<PlantFormProps>(), {
  modelValue: () => {
    return {
      id: {
        resourceId: ''
      },
      count: 0,
      coverage: 0,
      typePlant: undefined
    }
  }
})

const {modelValue} = toRefs(props)
const emits = defineEmits<PlantFormEmit>()
const loading = ref<boolean>(false)

const model = reactive<Plant>({...modelValue.value})
const selectValue = ref<TypePlant>()

selectValue.value = modelValue.value.typePlant

async function search(q: string) {
  loading.value = true

  const option = props.optionTypePlant.filter(item => item.title!.toLowerCase().trim().includes(q.toLowerCase().trim()))

  loading.value = false

  return option
}
</script>

<style lang="scss" scoped>
.wrapper-plant-form {
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

</style>
