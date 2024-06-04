<template>
  <defaults-loader v-if="typePlantStores.loading"/>
  <div v-else class="wrapper-plant-list">
    <div class="wrapper-title">
      <div class="title-m">Список типов растений</div>
      <div class="flex items-center justify-center gap-56">
        <div>Всего растений {{ total }}</div>
        <div>
          <UButton label="Добавить новое растение" @click="navigateTo('type-plant/create')"/>
        </div>
      </div>
      <div class="wrapper-search">
        <b-search
          v-model:model-value="searchValue"
          placeholder="Введите название"
          title="Поиск по названию"
          @on-clean="onCleanSearch"
          @on-search="onSearch"/>
      </div>

    </div>
    <div class="mt-8">
      <plant-cart-list :option="typePlantStores.getTypePlants" @on-click="onClickCart"/>

    </div>
    <div class="wrapper-pagination">
      <UPagination
      v-model="page"
      :total="total"
      @update:modelValue="(value) => typePlantStores.fetchTypePlant({page: {page: value, limit: 10}})"/>
    </div>

  </div>
</template>

<script lang="ts" setup>
import type {TypePlant} from "~/stores/type-plant/types";
import {useTypePlant} from "~/stores/type-plant/type-plant";

const typePlantStores = useTypePlant()

const searchValue = ref("")

const option = ref<TypePlant[]>([])

const page = ref(1)
await useAsyncData(async () => {
  await typePlantStores.fetchTypePlant({page: {page: page.value, limit: 10}})
})

const total: number = typePlantStores.getTotalCountTypePlants

const onClickCart = (value: TypePlant) => {
  navigateTo("/type-plant/" + btoa(value.id?.resourceId!))
}

const onSearch = () => {
  typePlantStores.fetchTypePlant({page: {page: page.value, limit: 10}, filter: {searchTitle: searchValue.value}})
}
const onCleanSearch = () => {
  searchValue.value = ""
  typePlantStores.fetchTypePlant({page: {page: page.value, limit: 10}, filter: {searchTitle: searchValue.value}})
}

</script>

<style lang="scss" scoped>

.wrapper-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .wrapper-search-input {
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;

    .wrapper-search-button {
      display: flex;
      gap: 8px;
    }
  }
}

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
  font-size: 40px;
  color: var(--ling-root);
  font-weight: 700;
}
</style>
