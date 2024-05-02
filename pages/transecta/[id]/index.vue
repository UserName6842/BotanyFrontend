<template>
  <defaults-loader v-if="transectaStore.loading" > </defaults-loader>
  <transect-form v-else :model-value="transectaStore.getTransect" :type="'update'" />
</template>

<script lang="ts" setup>

import type {Transecta} from "~/stores/transecta/types";
import {useTransecta} from "~/stores/transecta/transecta";

const route = useRoute();
const id = atob(route.params.id.toString());


const transectaStore = useTransecta()

transectaStore.fetchTransectaById(id)


</script>

<style lang="scss" scoped>

</style>