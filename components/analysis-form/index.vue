<template>
  <div class="wrapper-form">
    <span>Выберете группы экоморфов</span>
    <UInput v-model:model-value="model.title" placeholder="Название"></UInput>
    <USelectMenu v-model:model-value="selected"
                 :options="selectOption"
                 class="w-36"
                 multiple placeholder="Не выбрано">

      <template #option="{option}">
        <span>
          {{option.title}}
        </span>
      </template>
      <template #label>
        <span v-if="model.ecomorph" class="truncate">{{ model.ecomorph[0].title }}</span>
      </template>

      <!--    <template #option="{ option }">-->
      <!--      <span class="truncate">{{ option }}</span>-->
      <!--    </template>-->
    </USelectMenu>
    <URadioGroup v-model="model.typeAnalysis" :options="options" class="wrapper-form-radio"/>
    <UButton @click="handlerOnDownload">Загрузить</UButton>
  </div>
</template>

<script lang="ts" setup>
import type {Analysis, Transecta} from "~/stores/transecta/types";
import {useEcomorph} from "~/stores/ecomorph/ecomorph";
import type {Ecomorph} from "~/stores/ecomorph/types";

const ecomorhStores = useEcomorph()

interface AnalysisEmit {
  (event: 'onDownload', id: Analysis | undefined): void
}
interface AnalysisProps {
  transect: Transecta
}

const emits = defineEmits<AnalysisEmit>()
const props = defineProps<AnalysisProps>()

const selected = ref<Ecomorph[]>([])

const selectOption = ecomorhStores.getEcomorphs

const handlerOnDownload = () => {
  try {
    model.ecomorph = selected.value

    emits("onDownload", model)
  } catch (e) {
    console.error(e)
  }
}



const model = reactive<Analysis>({
  transect: props.transect
})

const select = <Ecomorph[]>([])

const options = [{
  value: "TypeAnalysisPlant",
  label: 'по Растениям'
}, {
  value: "TypeAnalysisTransect",
  label: 'по Трансекте'
},]

</script>

<style lang="scss" scoped>

.wrapper-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}


</style>