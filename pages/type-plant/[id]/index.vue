<template>
  <type-plant-form  type="update"  :model-value="modelValue" />
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

const modelValue = typePlantStores.getTypePlant

const id = atob(route.params.id.toString());

ecomorhStores.fetchEcomorhs()
typeEcomorhStores.fetchEcomorhs()
useAsyncData(async () => {
  await typePlantStores.fetchTypePlantById(id)
})



</script>

<style scoped lang="scss">

</style>