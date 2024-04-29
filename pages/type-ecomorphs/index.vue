<template>
  <UTable :rows="typeEomorhStores.getTypeEcomorphs" :columns="columns" >
    <template #id-data="{ row }">
      {{row.id.resourceId}}
    </template>
    <template #ecomorph-data="{ row }">
      <span v-if="row.ecomorphs && row.ecomorphs.title">{{
          row.ecomorphs.title
      }}
        </span>
    </template>
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
      </UDropdown>
    </template>
  </UTable>
  <div class="wrapper-add-button">
    <UButton icon="i-ph-list-plus" class="add-button" @click="isOpen = true"/>
  </div>
  <UModal v-model="isOpen">
    <div class="p-4">
      <div class="wrapper-home">
        <span class="subtitle-page"> Создание Екоморфа </span>
        <UInput v-model:model-value="typeEomorhFormData.title" placeholder="Название"></UInput>
        <UInput  v-model:model-value="typeEomorhFormData.description" placeholder="Описание"></UInput>
        <UInput  v-model:model-value="typeEomorhFormData.displayTable" placeholder="Отображение в таблице"></UInput>
        <UInput  v-model:model-value="typeEomorhFormData.score" placeholder="Баллы"></UInput>
        <USelectMenu v-model:model-value="typeEomorhFormData.ecomorphs" :options="ecomorhStores.getEcomorphs">
          <template #label>
            <span class="truncate">{{ typeEomorhFormData.ecomorphs.title }}</span>
          </template>
          <template #option="{ option }">
            <span class="truncate">{{ option.title }}</span>
          </template>
        </USelectMenu>
        <UButton @click="createTypeEcomorph">Создать</UButton>
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import {useTypeEcomorph} from "~/stores/type-ecomorphs/ecomorph";
import type {TypeEcomorph} from "~/stores/type-ecomorphs/types";
import {useEcomorph} from "~/stores/ecomorph/ecomorph";

const typeEomorhStores = useTypeEcomorph()
const ecomorhStores = useEcomorph()
const isOpen = ref(false)
const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'title',
  label: 'Название'
}, {
  key: 'description',
  label: 'Описание'
},  {
  key: 'displayTable',
  label: 'Отображение в таблице'
}, {
  key: 'score',
  label: 'Баллы'
},{
  key: 'ecomorph',
  label: 'Екоморф'
},  {
  key: 'actions'
}]

const items = (row) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, ], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => typeEomorhStores.DeleteEcomorhs(row.id)
  }]
]

typeEomorhStores.fetchEcomorhs()

ecomorhStores.fetchEcomorhs()

const typeEomorhFormData= reactive<TypeEcomorph>({
  title: '',
  description: '',
  score: 0,
  displayTable:"",
  ecomorphs: ecomorhStores.getEcomorphs[0]
})

const createTypeEcomorph = async () =>{
  isOpen.value = false
  await typeEomorhStores.CrateEcomorhs(typeEomorhFormData)
}
</script>


<style  lang="scss">
.wrapper-add-button{
  display: flex;
  flex-direction: row-reverse;
  .add-button{
    border-radius: 30px;
    .i-ph-list-plus{
      width: 32px;
      height: 32px;
    }

  }
}

.wrapper-home{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.title-page{
  font-size: 24px;
  color: var(--ling-root);
}

.subtitle-page{
  font-size: 20px;
  color: var(--ling-root);
}
</style>