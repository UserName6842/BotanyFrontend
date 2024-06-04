<template>
  <div class="flex flex-col items-center justify-between w-full h-screen ">
    <UContainer class="h-20 w-full pt-2">
      <defaults-header/>
    </UContainer>
    <UContainer class="flex-1">
      <slot name="default"/>
    </UContainer>
    <UContainer class="footer h-20 w-full">
      <defaults-footer/>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 30px;
  border-top: 1px solid var(--ling-root);
}
</style>
