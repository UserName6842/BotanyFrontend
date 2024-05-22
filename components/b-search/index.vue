<template>
  <div class="search-wrapper">
    <span class="text-sm">{{ title }}</span>
    <div class="search-container">
      <UInput
        v-model:model-value="modelValue"
        :placeholder="placeholder"
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        @change="$emit('onChange', modelValue)"
      >
        <template #trailing>
          <UButton
            v-show="modelValue !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="heandlerClean(modelValue)"
          />
        </template>
      </UInput>
      <UButton label="Поиск" @click="$emit('onSearch', modelValue)"/>
    </div>
  </div>
</template>

<script lang="ts" setup>


interface InputProps {
  title: string
  placeholder: string
}

interface InputEmits {
  (event: 'onChange', value?: string | number ): void
  (event: 'onSearch', value?: string | number ): void
  (event: 'onClean', value?: string | number ): void
}

defineProps<InputProps>()
const emit = defineEmits<InputEmits>()

const modelValue = defineModel("modelValue")

const heandlerClean = (value?: string | number) => {
  modelValue.value = ""
  emit("onClean", value)
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .search-container {
    display: flex;
    gap: 8px;
    flex-direction: row;
    align-items: center;
  }
}
</style>
