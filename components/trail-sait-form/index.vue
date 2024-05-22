<template>
  <div class="wrapper-trail-site-form">
    <div class="title-s">Создание растения</div>
    <b-input title="Название" placeholder="Введите название" v-model="modelValue.title"></b-input>
    <b-input title="Покрытие" placeholder="Введите покрытие" v-model="modelValue.covered"></b-input>
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
