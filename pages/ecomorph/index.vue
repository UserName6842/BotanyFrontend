<template>

  <div class="wrapper">
    <div class="title">
      Список Групп экоморфов
    </div>
    <UTable :columns="columns" :rows="ecomorhStores.getEcomorphs">
      <template #id-data="{row, index}">
        {{ index + 1 }}
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" icon="i-heroicons-ellipsis-horizontal-20-solid" variant="ghost"/>
        </UDropdown>
      </template>
    </UTable>
    <div class="wrapper-add-button">
      <UButton class="add-button" icon="i-ph-list-plus" @click="() => {
      isOpen = true
      typeModal = 'create'
      ecoporph = {id:{resourceId: ''}, description: '',title: ''}
    }"/>
    </div>
  </div>
  <UModal v-model="isOpen">
    <ecomorph-form
      v-model:model-value="ecoporph"
      :type="typeModal"
      @on-create="onCreate"
      @on-updated="onUpdate"/>
  </UModal>

</template>

<script lang="ts" setup>
import {useEcomorph} from "~/stores/ecomorph/ecomorph";
import type {Ecomorph} from "~/stores/ecomorph/types";
import type {TypeForm} from "~/stores/types";


const ecomorhStores = useEcomorph()
const isOpen = ref(false)
const columns = [{
  key: 'id',
  label: '№'
}, {
  key: 'title',
  label: 'Экоморфы'
}, {
  key: 'description',
  label: 'Описание'
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
      ecoporph = {...row}
    }
  },], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => ecomorhStores.DeleteEcomorhs(row.id)
  }]
]

await useAsyncData(async () => {
  await ecomorhStores.fetchAsyncEcomorhs()
})


let ecoporph = reactive<Ecomorph>({
  title: "",
  description: ""
})
const typeModal = ref<TypeForm>("create")
const onCreate = async () => {
  isOpen.value = false
  await ecomorhStores.CrateEcomorhs(ecoporph)
}

const onUpdate = async () => {
  isOpen.value = false
  await ecomorhStores.UpdateEcomorhs(ecoporph)
}
</script>


<style lang="scss">

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.title {
  font-size: 40px;
  color: var(--ling-root);
  font-weight: 700;
}
.wrapper-add-button {
  align-items: flex-end;
  margin-left: auto;
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
