<template>
  <defaults-loader v-if="typePlantStores.loading" />
  <plant-list-pages v-else />
</template>

<script lang="ts" setup>
import { useTypePlant } from "~/stores/type-plant/type-plant";

const typePlantStores = useTypePlant();

await useAsyncData(async () => {
  await typePlantStores.fetchTypePlant();
});
</script>
