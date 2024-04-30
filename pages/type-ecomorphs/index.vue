<template>
  <UTable :columns="columns" :rows="typeEomorhStores.getTypeEcomorphs">
    <template #id-data="{ row, index}">
      {{ index + 1 }}
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


const typeEomorhStores = useTypeEcomorph()
const ecomorhStores = useEcomorph()
const isOpen = ref(false)

const columns = [{
  key: 'id',
  label: '№'
}, {
  key: 'title',
  label: 'Название'
}, {
  key: 'description',
  label: 'Описание'
}, {
  key: 'displayTable',
  label: 'Отображение в таблице'
}, {
  key: 'score',
  label: 'Баллы'
}, {
  key: 'ecomorph',
  label: 'Екоморф'
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

ecomorhStores.fetchEcomorhs()

const typeModal = ref<"create" | "update">("create")

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
  debugger
  await typeEomorhStores.UpdateEcomorhs(value)
}
</script>


<style lang="scss">
.wrapper-add-button {
  display: flex;
  flex-direction: row-reverse;

  .add-button {
    border-radius: 30px;

    .i-ph-list-plus {
      width: 32px;
      height: 32px;
    }

  }
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