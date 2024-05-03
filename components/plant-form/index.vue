<template>
<div class="wrapper-plant-form">
  <div class="type-plant-form-title">
    <span v-if="type === 'create'">Создание</span>
    <span v-else>Обновление</span>
    растения
  </div>
  <USelectMenu v-model:model-value="selectValue"
               :options="optionTypePlant" class="w-36">
    <template #label>
      <span v-if="selectValue" class="truncate">{{ selectValue.title }}</span>
      <span v-else class="truncate">Не выбрано</span>
    </template>
    <template #option="{ option }">
      <span class="truncate">{{ option.title }}</span>
    </template>
  </USelectMenu>
  <UInput v-model:model-value="model.coverage" placeholder="Название"></UInput>
  <UInput v-model:model-value="model.count" placeholder="Описание"></UInput>
  <UButton v-if="type === 'create'" @click="handlerOnCreate">Создать</UButton>
  <UButton v-else @click="handlerOnUpdete">Обновить</UButton>
</div>
</template>

<script setup lang="ts">

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
  if(selectValue.value){
    model.value.typePlant = { id:selectValue.value?.id}
  }
  emits('onCreate',  model.value )
}

const handlerOnUpdete = () => {
  if(selectValue.value){
    model.value.typePlant = selectValue.value
  }
  emits('onUpdated',  model.value )
}

const props =  withDefaults(defineProps<PlantFormProps>(),{
  modelValue: () =>{
    return {
      id:{
        resourceId: ''
      },
      count: 0,
      coverage:0,
      typePlant: undefined
    }
  }
})
const {modelValue} = toRefs(props)
const emits = defineEmits<PlantFormEmit>()


const model = ref<Plant>(modelValue.value)
const selectValue = ref<TypePlant>()



</script>

<style scoped lang="scss">
.wrapper-plant-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

</style>