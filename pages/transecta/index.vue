<template>
  <defaults-loader v-if="transectaStore.loading" />
  <div v-else class="flex flex-col items-center justify-center gap-10 w-[100%]">
    <div class="title-m">Трансекта</div>
    <div class="flex items-center justify-center gap-20 sm:gap-40">
      <div>Всего растений {{ transectaStore.getTransects.length }}</div>
      <UButton  @click="navigateTo('/transecta/create')">Создать Трансекту</UButton>
    </div>
    <UTable :columns="columns" :rows="rows" class="min-width overflow-x-auto">
      <template #id-data="{ row, index }">
        {{ index + 1 + pageCount * (page - 1) }}
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost" />
        </UDropdown>
      </template>
    </UTable>

    <div class="wrapper-transecta-table">
      <UPagination
        v-if="transectaStore.getTransects && transectaStore.getTransects.length > pageCount"
        v-model="page"
        :page-count="pageCount"
        :total="transectaStore.getTransects.length"
      />
    </div>
  </div>
  <UModal v-model="isOpen">
    <analysis-form :transect="transect" @on-download="onDownload" />
  </UModal>
  <a ref="linkDownload" />
</template>

<script lang="ts" setup>
import { useTransecta } from "~/stores/transecta/transecta";
import type { Analysis, Transecta } from "~/stores/transecta/types";
import { useEcomorph } from "~/stores/ecomorph/ecomorph";

const transectaStore = useTransecta();
await transectaStore.fetchTransecta();

const isOpen = ref<boolean>(false);
const transect = ref<Transecta>();
const linkDownload = ref();
const ecomorhStores = useEcomorph();
await useAsyncData(async () => {
  await ecomorhStores.fetchAsyncEcomorhs();
});

const onDownload = async (input: Analysis) => {
  console.log(input);
  await transectaStore.CrateAnalysis(input);
  let reader = new FileReader();
  reader.onload = function () {
    linkDownload.value.href = reader.result;
    linkDownload.value.download = transectaStore.analysis.title;
    linkDownload.value.click();
  };
  const url = useRuntimeConfig().public.apiURL + ":8080" + transectaStore.analysis.path;
  debugger;
  const blob = await downloadFileAsBlob(url);
  reader.readAsDataURL(blob!);
};

async function downloadFileAsBlob(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to download image");
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error downloading image:", error.message);
    return null;
  }
}

const columns = [
  {
    key: "id",
    label: "№",
  },
  {
    key: "title",
    label: "Название",
  },
  {
    key: "rating",
    label: "Рейтинг",
  },
  {
    key: "covered",
    label: "Покрытость",
  },
  {
    key: "countTypes",
    label: "Количество типов",
  },
  {
    key: "squareTrialSite",
    label: "Площадь ПП",
  },
  {
    key: "square",
    label: "Площадь",
  },
  {
    key: "actions",
  },
];

const items = (row) => [
  [
    {
      label: "Открыть",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        navigateTo("transecta/" + btoa(row.id?.resourceId!));
      },
    },
  ],
  [
    {
      label: "Получить анализ ",
      icon: "i-ph-download-simple-light",
      click: () => {
        isOpen.value = true;
        transect.value = row;
      },
    },
  ],
  [
    {
      label: "Удалить",
      icon: "i-heroicons-trash-20-solid",
      click: () => transectaStore.DeleteTransecta(row.id),
    },
  ],
];

const page = ref(1);
const pageCount = 6;

const rows = computed(() => {
  if (transectaStore.getTransects) {
    return transectaStore.getTransects.slice((page.value - 1) * pageCount, page.value * pageCount);
  }
});
</script>

<style scoped>

@media (min-width: 260px) and (max-width: 768px) {
  .min-width {
    max-width: 100%;
  }
}
</style>
