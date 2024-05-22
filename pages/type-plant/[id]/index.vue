<template>
  <defaults-loader v-if="typePlantStores.loading"/>
  <type-plant-form v-else  type="update"  :model-value="modelValue" />
</template>

<script setup lang="ts">
import {useTypePlant} from "~/stores/type-plant/type-plant";
import {useEcomorph} from "~/stores/ecomorph/ecomorph";
import {useTypeEcomorph} from "~/stores/type-ecomorphs/ecomorph";
import type {Identifier} from "~/stores/types";
const ecomorhStores = useEcomorph()
const typeEcomorhStores = useTypeEcomorph()
const typePlantStores = useTypePlant()

const route = useRoute();


const id = atob(route.params.id.toString());

ecomorhStores.fetchAsyncEcomorhs()
typeEcomorhStores.fetchEcomorhs()
await useAsyncData(async () => {
  await typePlantStores.fetchTypePlantById(id)
})

const modelValue = reactive({...typePlantStores.getTypePlant})

</script>

<style scoped lang="scss">

</style>
