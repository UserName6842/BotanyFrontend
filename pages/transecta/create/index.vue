<template>
  <defaults-loader v-if="transectaStore.loading" > </defaults-loader>
  <transect-form v-else :type="'create'" />
</template>

<script lang="ts" setup>
import {useTransecta} from "~/stores/transecta/transecta";
import type {Transecta} from "~/stores/transecta/types";

const transectaStore = useTransecta()


</script>

<style lang="scss" scoped>

</style>