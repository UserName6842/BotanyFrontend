<template>
  <div class="wrapper-form">
    <span class="title-s">Выберете группы экоморфов</span>
    <UInput v-model:model-value="model.title" placeholder="Название"></UInput>
    <USelectMenu v-model:model-value="selected" :options="selectOption" class="w-36" multiple placeholder="Не выбрано">
      <template #label>
        <span v-if="model.ecomorph?.length"></span>
        <span v-for="item in model.ecomorph" class="truncate">{{ item.title }}</span>
      </template>
      <template #option="{ option }">
        <span>
          {{ option.title }}
        </span>
      </template>
    </USelectMenu>
    <URadioGroup v-model="model.typeAnalysis" :options="options" class="wrapper-form-radio" />
    <UButton @click="handlerOnDownload">Скачать</UButton>
  </div>
</template>

<script lang="ts" setup>
import type { Analysis, Transecta } from "~/stores/transecta/types";
import { useEcomorph } from "~/stores/ecomorph/ecomorph";
import type { Ecomorph } from "~/stores/ecomorph/types";

const ecomorhStores = useEcomorph();

interface AnalysisEmit {
  (event: "onDownload", id: Analysis | undefined): void;
}

interface AnalysisProps {
  transect: Transecta;
}

const emits = defineEmits<AnalysisEmit>();
const props = defineProps<AnalysisProps>();

const selected = ref<Ecomorph[]>([]);

const selectOption = ecomorhStores.getEcomorphs;

const handlerOnDownload = () => {
  debugger;
  try {
    model.value.ecomorph = selected.value;

    emits("onDownload", model.value);
  } catch (e) {
    console.error(e);
  }
};

const model = ref<Analysis>({
  transect: props.transect,
  ecomorph: [],
});

const options = [
  {
    value: "TypeAnalysisPlant",
    label: "по Растениям",
  },
  {
    value: "TypeAnalysisTransect",
    label: "по Трансекте",
  },
];
</script>

<style lang="scss" scoped>
.wrapper-form {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.wrapper-form-radio {
  padding: 7px;
  border-radius: 10px;
  border: 1px dashed var(--ling-root);
  background-color: rgb(245, 245, 245);
}
</style>
