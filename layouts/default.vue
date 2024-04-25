<template>
<div class="flex flex-col items-center justify-between w-screen h-screen ">
  <UContainer class="h-">
    header
    <defaults-header/>
  </UContainer>
  <UContainer class="flex-1">
    <slot name="default"/>
  </UContainer>
  <UContainer>
    footer
  </UContainer>
</div>




</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>