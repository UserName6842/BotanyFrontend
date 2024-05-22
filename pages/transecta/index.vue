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
  <UModal v-model="isOpen">
    <analysis-form :transect="transect" @on-download="onDownload"/>
  </UModal>
  <a ref="linkDownload" />

</template>

<script lang="ts" setup>
import {useTransecta} from "~/stores/transecta/transecta";
import type {Analysis, Transecta} from "~/stores/transecta/types";
import {useEcomorph} from "~/stores/ecomorph/ecomorph";

const transectaStore = useTransecta()
await transectaStore.fetchTransecta()

const isOpen = ref<boolean>(false)
const transect = ref<Transecta>()
const linkDownload = ref()
const ecomorhStores = useEcomorph()
await useAsyncData( async () => {
  await ecomorhStores.fetchAsyncEcomorhs()
})

const onDownload = async (input: Analysis) => {
  console.log(input)
  await transectaStore.CrateAnalysis(input)
  let reader = new FileReader();
  reader.onload = function() {
    linkDownload.value.href = reader.result;
    linkDownload.value.download = transectaStore.analysis.title ;
    linkDownload.value.click();
  };
  const url =  "http://localhost:8080" + transectaStore.analysis.path
  debugger
  const blob = await downloadFileAsBlob(url)
  reader.readAsDataURL(blob!);
}

async function downloadFileAsBlob(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to download image');
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Error downloading image:', error.message);
    return null;
  }
}

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
    click: () => {
      navigateTo("transecta/" + btoa(row.id?.resourceId!))
    }
  },],
  [{
      label: 'Получить анализ ',
      icon: 'i-ph-download-simple-light',
      click: () => {
        isOpen.value = true
        transect.value = row
      }
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
