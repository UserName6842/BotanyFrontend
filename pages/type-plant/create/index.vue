<template>
  <defaults-loader v-if="ecomorhStores.loading || typeEcomorhStores.loading" />
  <type-plant-form v-else type="create" v-model:model-value="typePlant" />
</template>

<script lang="ts" setup>
import {useEcomorph} from "~/stores/ecomorph/ecomorph";
import {useTypeEcomorph} from "~/stores/type-ecomorphs/ecomorph";
import type {TypePlant} from "~/stores/type-plant/types";
import {useTypePlant} from "~/stores/type-plant/type-plant";

const ecomorhStores = useEcomorph()
const typeEcomorhStores = useTypeEcomorph()


const typePlant = reactive<TypePlant>(
    {
      title: "",
      subtitle: "",
      ecomorphsEntity: [],
      img:{
        id: {
          resourceId: ""
        },
        name: "",
        path: ""
      }
    }
)


ecomorhStores.fetchAsyncEcomorhs()
typeEcomorhStores.fetchEcomorhs()
</script>

<style lang="scss" scoped>

</style>
