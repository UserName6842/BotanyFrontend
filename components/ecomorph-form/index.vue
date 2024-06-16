<template>
  <div class="p-4">
    <div class="wrapper-home">
      <div class="title-s">
        <span v-if="type === 'create'">Создание</span>
        <span v-else>Обновление</span>
        Экоморфа
      </div>
      <UBadge v-if="type === 'update'" color="white" variant="solid">ID: {{ modelValue.id.resourceId }}</UBadge>
      <b-input v-model:model-value="modelValue.title" placeholder="Название" title="Название"></b-input>
      <b-input v-model:model-value="modelValue.description" placeholder="Описание" title="Описание"></b-input>
      <UButton v-if="type === 'create'" @click="$emit('onCreate', modelValue)">Создать</UButton>
      <UButton v-else @click="$emit('onUpdated', modelValue)">Обновить</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ecomorph } from "~/stores/ecomorph/types";
import type { TypeForm } from "~/stores/types";

interface EcomorphFormEmit {
  (event: "onCreate", value: Ecomorph | undefined): void;

  (event: "onUpdated", value: Ecomorph | undefined): void;
}

interface EcomorphFormProps {
  type: TypeForm;
}

defineProps<EcomorphFormProps>();
defineEmits<EcomorphFormEmit>();

const modelValue = defineModel<Ecomorph>("modelValue", {
  default: { title: "", description: "", id: { resourceId: "" } },
});
</script>
