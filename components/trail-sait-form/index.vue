<template>
  <div class="wrapper-trail-site-form">
    <div>Создание растения</div>
    <UInput placeholder="Название" v-model="modelValue.title"></UInput>
    <UInput placeholder="Балы" v-model="modelValue.rating"></UInput>
    <UInput placeholder="Покрытие" v-model="modelValue.covered"></UInput>
    <UButton v-if="type === 'create'" @click="$emit('onCreate', modelValue )">Создать</UButton>
  </div>
</template>

<script setup lang="ts">
import type {TypeForm} from "~/stores/types";
import type {TrialSite} from "~/stores/trial-site/types";

interface TrialSiteFormProps {
  type: TypeForm
  modelValue: TrialSite
}

interface TrialSiteFormEmit {
  (event: 'onCreate', value: TrialSite | undefined): void
}

defineEmits<TrialSiteFormEmit>()

const props = withDefaults(defineProps<TrialSiteFormProps>(), {
  modelValue: (props) => {
    return {
      id: {
        resourceId: ""
      },
      title: "",
      plant: []
    }
  }
})

</script>

<style scoped lang="scss">
.wrapper-trail-site-form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 5px;
}
</style>