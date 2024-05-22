<template>
  <div class="wrapper">
    <div class="title">
      Список Экоморфов
    </div>
    <div class="wrapper-search">
      <span>Поиск по названию</span>
      <div class="wrapper-search-input">
        <UInput v-model:model-value="searchValue" placeholder="Введите название"/>
        <div class="wrapper-search-button">
          <UButton label="Поиск" @click="onSearch"/>
          <UButton label="Очистить" @click="onCleanSearch"/>
        </div>
      </div>
    </div>
    <UTable :columns="columns" :rows="rows">
      <template #id-data="{ row, index}">
        {{ (index + 1) + (pageCount * (page - 1)) }}
      </template>
      <template #ecomorph-data="{ row }">
      <span v-if="row.ecomorphs && row.ecomorphs.title">{{
          row.ecomorphs.title
        }}
        </span>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost"/>
        </UDropdown>
      </template>
    </UTable>
    <div class="wrapper-add-button">
      <UButton class="add-button" icon="i-ph-list-plus" @click="() => {
      typeEomorhFormData = { id:{resourceId: ''}, title: '', description: '' ,displayTable: '', score: 0, ecomorphs: ecomorhStores.getEcomorphs[0]}
      isOpen = true
      typeModal = 'create'
    }"/>
    </div>
    <div class="wrapper-pagination">
      <UPagination v-model="page" :page-count="pageCount" :total="typeEomorhStores.getTypeEcomorphs.length"/>
    </div>
  </div>
  <UModal v-model="isOpen">
    <type-ecomorph-form
      v-model:model-value="typeEomorhFormData"
      :type="typeModal"
      @on-create="createTypeEcomorph"
      @on-updated="updateTypeEcomorph"/>
  </UModal>

</template>

<script lang="ts" setup>
import {useTypeEcomorph} from "~/stores/type-ecomorphs/ecomorph";
import type {TypeEcomorph} from "~/stores/type-ecomorphs/types";
import {useEcomorph} from "~/stores/ecomorph/ecomorph";
import type {TypeForm} from "~/stores/types";


const typeEomorhStores = useTypeEcomorph()
const ecomorhStores = useEcomorph()
const isOpen = ref(false)

const searchValue = ref("")

const onSearch = () => {
  typeEomorhStores.fetchEcomorhs({filter: {searchTitle: searchValue.value}})
}
const onCleanSearch = () => {
  searchValue.value = ""
  typeEomorhStores.fetchEcomorhs({filter: {searchTitle: searchValue.value}})
}

const columns = [{
  key: 'id',
  label: '№'
},
  {
    sortable: true,
    key: 'ecomorph',
    label: 'Екоморф'
  }, {
    key: 'title',
    label: 'Название'
  },
  {
    key: 'description',
    label: 'Описание'
  }, {
    key: 'displayTable',
    label: 'Отображение в таблице'
  }, {
    key: 'score',
    label: 'Баллы',
    sortable: true
  }, {
    key: 'actions'
  }]

const items = (row) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      typeModal.value = "update"
      isOpen.value = true
      typeEomorhFormData = {...row}
    }
  },], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => typeEomorhStores.DeleteEcomorhs(row.id)
  }]
]

typeEomorhStores.fetchEcomorhs()

ecomorhStores.fetchAsyncEcomorhs()

const typeModal = ref<TypeForm>("create")

let typeEomorhFormData = reactive<TypeEcomorph>({
  title: '',
  description: '',
  score: 0,
  displayTable: "",
  ecomorphs: ecomorhStores.getEcomorphs[0]
})

const createTypeEcomorph = async (value: TypeEcomorph) => {
  isOpen.value = false
  await typeEomorhStores.CrateEcomorhs(value)
}
const updateTypeEcomorph = async (value: TypeEcomorph) => {
  isOpen.value = false
  await typeEomorhStores.UpdateEcomorhs(value)
}

const page = ref(1)
const pageCount = 8

const rows = computed(() => {
  if (typeEomorhStores.getTypeEcomorphs) {
    return typeEomorhStores.getTypeEcomorphs.slice((page.value - 1) * pageCount, (page.value) * pageCount)
  }
})

</script>


<style lang="scss">
.title {
  font-size: 40px;
  color: var(--ling-root);
  font-weight: 700;
}

.wrapper-search {
  margin-top: 20px;
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

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper-add-button {
  display: flex;
  flex-direction: row-reverse;
  margin-left: auto;

  .add-button {
    border-radius: 30px;

    .i-ph-list-plus {
      width: 32px;
      height: 32px;
    }

  }
}

.wrapper-pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.wrapper-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.title-page {
  font-size: 24px;
  color: var(--ling-root);
}

.subtitle-page {
  font-size: 20px;
  color: var(--ling-root);
}
</style>
