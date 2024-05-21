<template>
  <defaults-loader v-if="typePlantStores.loading"/>
  <div v-else class="wrapper-plant-list">
    <div class="wrapper-title">
      <div class="type-plant-form-title">Список типов растений</div>
      <div>
        <div class="type-plant-form-total">Всего растений {{ total }}</div>
      </div>

      <div>
        <UButton label="Создать новое растение" @click="navigateTo('type-plant/create')"/>
      </div>
    </div>
    <div class="mt-20">
      <plant-cart-list :option="typePlantStores.getTypePlants" @on-click="onClickCart"/>

    </div>
    <div class="wrapper-pagination">
      <UPagination v-if="typePlantStores.getTypePlants.length > 0" v-model="page" @update:modelValue="(value) => typePlantStores.fetchTypePlant({page: {page: value, limit: 10}})" :total="total"/>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {TypePlant} from "~/stores/type-plant/types";
import {useTypePlant} from "~/stores/type-plant/type-plant";

const typePlantStores = useTypePlant()


const option = ref<TypePlant[]>([])

const page = ref(1)
useAsyncData(async () => {
  typePlantStores.fetchTypePlant({page: {page: page.value, limit: 10}})
})

const total: number = typePlantStores.getTotalCountTypePlants

const onClickCart = (value: TypePlant) => {
  navigateTo("/type-plant/" + btoa(value.id?.resourceId!))
}

</script>

<style lang="scss" scoped>
.wrapper-plant-list {
  width: 1261px;
}

.wrapper-pagination {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 15px;
}

.wrapper-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
}

.type-plant-form-title {
  font-size: 26px;
  color: var(--ling-root);
  font-weight: 700;
}
</style>