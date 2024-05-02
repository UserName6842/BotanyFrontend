<template>
  <div class="p-4">
    <div class="wrapper-home">
      <span class="subtitle-page"> Создание Экоморфа </span>
      <UBadge color="white" variant="solid" v-if="type === 'update'">ID: {{modelValue.id.resourceId}}</UBadge>
      <UInput v-model:model-value="modelValue.title" placeholder="Название"></UInput>
      <UInput v-model:model-value="modelValue.description" placeholder="Описание"></UInput>
      <UButton v-if="type === 'create'" @click="$emit('onCreate', modelValue )">Создать</UButton>
      <UButton v-else @click="$emit('onUpdated', modelValue )">Обновить</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>


import type {Ecomorph} from "~/stores/ecomorph/types";
import type {TypeForm} from "~/stores/types";

interface EcomorphFormEmit {
  (event: 'onCreate', value: Ecomorph | undefined): void

  (event: 'onUpdated', value: Ecomorph | undefined): void
}

interface EcomorphFormProps {
  type: TypeForm
}

defineProps<EcomorphFormProps>()
defineEmits<EcomorphFormEmit>()

const modelValue = defineModel<Ecomorph>("modelValue", {default: {title: "", description: "", id: {resourceId: ""}}})


</script>


<style lang="scss" scoped>

</style>