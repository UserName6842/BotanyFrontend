<template>
<div class="flex flex-col items-center justify-between w-full h-screen ">
  <UContainer class="h-20 w-full pt-2">
    <defaults-header/>
  </UContainer>
  <UContainer class="flex-1">
    <slot name="default"/>
  </UContainer>
  <UContainer class="h-20 w-full">
    footer
  </UContainer>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>