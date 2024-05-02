<template>
  <div class="wrapper-transecta">
    <div class="transecta-title">
      Пробная площадка
    </div>
    <UBadge color="white" variant="solid">ID: {{ id.toString() }}</UBadge>
    <div class="wrapper-transecta-input">
      <UInput v-model:model-value="option.title"/>
      <UInput v-model:model-value="option.rating"/>
      <UInput v-model:model-value="option.covered"/>
    </div>
    <div>
      <div class="plant-title">
        Растения
      </div>
      <UTable :columns="columns" :rows="rows">
        <template #id-data="{row, index}">
          {{ index + 1 }}
        </template>
        <template #typePlant-data="{row, index}">
          {{ row.typePlant.title }}
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost"/>
          </UDropdown>
        </template>
      </UTable>
      <div class="wrapper-transecta-footer-table">
        <UButton @click="isOpen = true">Создать</UButton>
        <UPagination v-model="page" :page-count="pageCount" :total="option.plant.length"/>
      </div>
    </div>
  </div>
  <UModal :ui="{}" v-model="isOpen">
    <trail-sait-form/>
  </UModal>
</template>

<script lang="ts" setup>
import type {TrialSite} from "~/stores/trial-site/types";

const route = useRoute();
const id = atob(route.params.id.toString());
const isOpen = ref<boolean>(false)


const option: TrialSite = {
  id: {
    resourceId: id.toString()
  },
  title: "Пробная площадка " + id.toString(),
  rating: parseInt(id.toString()),
  covered: parseInt(id.toString()) * 10,
  plant: []
}

for (let i = 0; i < 10; i++) {
  option.plant.push({
    id: {
      resourceId: i.toString()
    },
    coverage: i,
    count: i,
    typePlant: {
      id: {
        resourceId: i.toString()
      },
      title: "Тип растения " + i.toString(),
      subtitle: "Type plant " + i.toString(),
      ecomorphsEntity: [],
    }

  })
}

const columns = [{
  key: 'id',
  label: '№'
}, {
  key: 'typePlant',
  label: 'Тип растения'
}, {
  key: 'count',
  label: 'Количество'
}, {
  key: 'coverage',
  label: 'Покрытость'
}, {
  key: 'actions'
}]

const items = (row) => [
  [{
    label: 'Открыть',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo("transecta/" + btoa(row.id))
  },], [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => console.log("Delete", row)
  }]
]

const page = ref(1)
const pageCount = 8

const rows = computed(() => {
  return option.plant.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

</script>

<style lang="scss" scoped>
.wrapper-transecta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
}

.wrapper-transecta-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 600px;
  gap: 15px;
}

.wrapper-transecta-footer-table{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.transecta-title {
  font-size: 36px;
  color: var(--ling-root);
  font-weight: 700;
}
</style>