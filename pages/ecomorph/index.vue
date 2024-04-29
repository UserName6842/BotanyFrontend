<template>

  <UTable :rows="ecomorh" :columns="columns" >
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
        <UInput v-model:model-value="title" placeholder="Название"></UInput>
        <UInput  v-model:model-value="description" placeholder="Описание"></UInput>
        <UButton @click="login">Создать</UButton>
      </div>
    </div>
  </UModal>

</template>

<script setup lang="ts">
import {useEcomorph} from "~/stores/ecomorph/ecomorph";
import {ecomorphsToTable} from "~/pages/ecomorph/hepers";

const ecomorh = computed(() => ecomorphsToTable(ecomorhStores.getEcomorphs))
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
    click: () => ecomorhStores.DeleteEcomorhs(row.id)
  }]
]

 ecomorhStores.fetchEcomorhs()


const title = ref('')
const description = ref('')
const login = async () =>{
  isOpen.value = false
  await ecomorhStores.CrateEcomorhs({title: title.value, description:description.value})
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