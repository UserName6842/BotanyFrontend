<template>
  <div class="min-h-screen">
    <UCard
      :ui="{ strategy: 'override', base: 'flex min-h-screen ', body: { strategy: 'override', base: 'flex-1 p-0' } }"
      class="min-h-screen w-full flex flex-col justify-between"
    >
      <template #header>
        <UContainer class="footer w-full">
          <defaults-header />
        </UContainer>
      </template>

      <div class="flex flex-col items-center justify-between">
        <slot name="default" />
      </div>

      <template #footer>
        <UContainer class="footer w-full">
          <defaults-footer />
        </UContainer>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Биологический калькулятор",
});
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 30px;
}
</style>
