<template>
  <div class="p-4">
    <div class="wrapper-home">
      <div class="title-s">
        <span v-if="type === 'create'">Создание</span>
        <span v-else>Обновление</span>
        группы растений
      </div>
      <UBadge v-if="type === 'update'" color="white" variant="solid">ID: {{ modelValue.id.resourceId }}</UBadge>
      <b-input v-model:model-value="modelValue.title" title="Название" placeholder="Введите название"></b-input>
      <b-input v-model:model-value="modelValue.description" title="Описание" placeholder="Введите описание"></b-input>
      <b-input
        v-model:model-value="modelValue.displayTable"
        title="Отображение в таблице"
        placeholder="Введите обазначение"
      ></b-input>
      <b-input v-model:model-value="modelValue.score" title="Баллы" placeholder="Введите баллы"></b-input>
      <USelectMenu v-model:model-value="modelValue.ecomorphs" :options="ecomorhStores.getEcomorphs">
        <template #label>
          <span class="truncate">{{ modelValue.ecomorphs.title }}</span>
        </template>
        <template #option="{ option }">
          <span class="truncate">{{ option.title }}</span>
        </template>
      </USelectMenu>
      <UButton v-if="type === 'create'" @click="$emit('onCreate', modelValue)">Создать</UButton>
      <UButton v-else @click="$emit('onUpdated', modelValue)">Обновить</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEcomorph } from "~/stores/ecomorph/ecomorph";
import type { TypeEcomorph } from "~/stores/type-ecomorphs/types";
import type { TypeForm } from "~/stores/types";

interface EcomorphFormEmit {
  (event: "onCreate", value: TypeEcomorph | undefined): void;

  (event: "onUpdated", value: TypeEcomorph | undefined): void;
}

const ecomorhStores = useEcomorph();

interface TypeEcomorphFormProps {
  type: TypeForm;
}

defineProps<TypeEcomorphFormProps>();
defineEmits<EcomorphFormEmit>();

const modelValue = defineModel<TypeEcomorph>("modelValue", {
  default: {
    id: { resourceId: "" },
    title: "",
    description: "",
    score: 0,
    displayTable: "",
    ecomorphs: {},
  },
});
</script>

<style lang="scss" scoped></style>
