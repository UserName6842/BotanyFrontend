<template>
  <type-plant-form type="update" :model-value="modelValue" />
</template>

<script setup lang="ts">
import { useTypePlant } from "~/stores/type-plant/type-plant";
import { useEcomorph } from "~/stores/ecomorph/ecomorph";
import { useTypeEcomorph } from "~/stores/type-ecomorphs/ecomorph";
const ecomorhStores = useEcomorph();
const typeEcomorhStores = useTypeEcomorph();
const typePlantStores = useTypePlant();

const route = useRoute();

const id = atob(route.params.id.toString());
await ecomorhStores.fetchAsyncEcomorhs();
await typeEcomorhStores.fetchEcomorhs();
await useAsyncData(async () => {
  await typePlantStores.fetchTypePlantById(id);
});

const modelValue = toRef(typePlantStores.getTypePlant);
</script>

<style scoped lang="scss"></style>
