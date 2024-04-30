<script lang="ts" setup>
import type {TypePlant} from "~/stores/type-plant/types";
import {useTypePlant} from "~/stores/type-plant/type-plant";
const typePlantStores = useTypePlant()
typePlantStores.fetchTypePlant()

const onClickCart = (value: TypePlant) => {
  navigateTo("/type-plant/" + btoa(value.id?.resourceId!))
}

</script>

<template>
  <div>
    <div>
      <UButton label="Создать новое растение" @click="navigateTo('type-plant/create')"/>
    </div>
    <div class="mt-20">
      <plant-cart-list :option="typePlantStores.getTypePlants" @on-click="onClickCart"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>