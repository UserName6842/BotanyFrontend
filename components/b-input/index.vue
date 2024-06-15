<template>
  <div class="input-wrapper">
    <span class="text-sm">{{ title }}</span>
    <div class="input-container">
      <UInput v-model:model-value="modelValue" :placeholder="placeholder" @change="$emit('onChange', modelValue)"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface InputProps {
  title?: string
  placeholder: string
}

interface InputEmits {
  (event: 'onChange', value?: string | number): void
}

defineProps<InputProps>()
defineEmits<InputEmits>()
const modelValue = defineModel("modelValue")
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .input-container {
    display: flex;
    gap: 8px;
    flex-direction: column;
    align-items: center;
  }
}
</style>
