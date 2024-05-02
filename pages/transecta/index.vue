<template>
  <defaults-loader v-if="transectaStore.loading" />
  <div v-else>
  <UButton @click="navigateTo('/transecta/create')">Создать Трансекту</UButton>
  <UTable :columns="columns" :rows="rows">
    <template #id-data="{ row, index}">
      {{ (index + 1) + (pageCount * (page - 1))  }}
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost"/>
      </UDropdown>
    </template>
  </UTable>
    <div class="wrapper-transecta-table">

      <UPagination v-if="transectaStore.getTransects" v-model="page" :page-count="pageCount" :total="transectaStore.getTransects.length"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useTransecta} from "~/stores/transecta/transecta";


const transectaStore = useTransecta()
await transectaStore.fetchTransecta()
const columns = [{
  key: 'id',
  label: '№'
}, {
  key: 'title',
  label: 'Название'
}, {
  key: 'rating',
  label: 'Рейтинг'
}, {
  key: 'covered',
  label: 'Покрытость'
},  {
  key: 'countTypes',
  label: 'Количество типов'
}, {
  key: 'squareTrialSite',
  label: 'Площадь ПП'
}, {
  key: 'square',
  label: 'Площадь'
}, {
  key: 'actions'
}]

const items = (row) => [
  [{
    label: 'Открыть',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo( "transecta/"+ btoa(row.id?.resourceId!))
  },],
  [{
    label: 'Получить анализ',
    icon: 'i-ph-download-simple-light',
    click: () => console.log("анализ")
  },]
  , [{
    label: 'Удалить',
    icon: 'i-heroicons-trash-20-solid',
    click: () => transectaStore.DeleteTransecta(row.id)
  }]
]

const page = ref(1)
const pageCount = 8

const rows = computed(() => {
  if (transectaStore.getTransects) {
    return transectaStore.getTransects.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  }
})
</script>

<style lang="scss" scoped>

</style>