<template>
  <div class="wrapper-plant-list">
    <div class="wrapper-title">
      <div class="title-m">Список типов растений</div>
      <div class="plant-list-option">
        <div>Всего растений {{ total }}</div>
        <div>
          <UButton label="Добавить новое растение" @click="navigateTo('type-plant/create')" />
        </div>
      </div>
      <div class="wrapper-search">
        <b-search
          v-model:model-value="searchValue"
          placeholder="Введите название"
          title="Поиск по названию"
          @on-clean="onCleanSearch"
          @on-search="onSearch"
        />
      </div>
    </div>
    <div class="mt-8">
      <plant-cart-list :option="rows" @on-click="onClickCart" />
    </div>
    <div class="wrapper-pagination">
      <UPagination v-model="page" :page-count="pageCount" :total="total" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTypePlant } from "~/stores/type-plant/type-plant";
import type { TypePlant } from "~/stores/type-plant/types";

const typePlantStores = useTypePlant();

const searchValue = ref("");

const page = ref(1);
const pageCount = 8;

const total = computed(() => typePlantStores.getTypePlants.length);
const onClickCart = (value: TypePlant) => {
  if (value.id && value.id?.resourceId) {
    navigateTo("/type-plant/" + btoa(value.id.resourceId));
  }
};

const onSearch = () => {
  typePlantStores.fetchTypePlant({ filter: { searchTitle: searchValue.value } });
};
const onCleanSearch = () => {
  searchValue.value = "";
  typePlantStores.fetchTypePlant({ filter: { searchTitle: searchValue.value } });
};

const rows = computed(() => {
  if (!typePlantStores.getTypePlants) {
    return [];
  }

  const start = (page.value - 1) * pageCount;
  const end = page.value * pageCount;
  let plants = typePlantStores.getTypePlants.slice(start, end);

  if (plants.length === 0 && page.value > 1) {
    page.value--;
    plants = typePlantStores.getTypePlants.slice((page.value - 1) * pageCount, page.value * pageCount);
  }

  return plants;
});
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
  max-width: 65%;
}

.plant-list-option {
  display: flex;
  gap: 56px;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

@media (min-width: 260px) and (max-width: 700px) {
  .plant-list-option {
    gap: 0px;
  }
  .wrapper-plant-list {
    max-width: 80%;
  }
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
