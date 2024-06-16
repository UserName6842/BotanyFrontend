<template>
  <defaults-loader v-if="ecomorhStores.loading || typeEcomorhStores.loading" />
  <type-plant-form v-else v-model:model-value="typePlant" type="create" />
</template>

<script lang="ts" setup>
import { useEcomorph } from "~/stores/ecomorph/ecomorph";
import { useTypeEcomorph } from "~/stores/type-ecomorphs/ecomorph";
import type { TypePlant } from "~/stores/type-plant/types";

const ecomorhStores = useEcomorph();
const typeEcomorhStores = useTypeEcomorph();

const typePlant = reactive<TypePlant>({
  title: "",
  subtitle: "",
  ecomorphsEntity: [],
  img: {
    id: {
      resourceId: "",
    },
    name: "",
    path: "",
  },
});

ecomorhStores.fetchAsyncEcomorhs();
typeEcomorhStores.fetchEcomorhs();
</script>

<style lang="scss" scoped></style>
