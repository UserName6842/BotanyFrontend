<template>
  <div class="w-[220px] text-center">
    10:00-20:00 MSK • GMT +3
    hello@result.school
  </div>
  <div class="flex  flex-col items-center justify-center mr-24">
      <NuxtLink href="/home" target="_blank">
        Документация
      </NuxtLink>
    <a href="https://donnu.ru/bio/bec" target="_blank">
        О нас
      </a>
  </div>
  <div class="icon-wrapper">
    <a href="https://t.me/Kalin24Don" target="_blank">
      <telegram/>
    </a>
    <a href="https://vk.com/bio_profkom" target="_blank">
      <vkontacte/>
    </a>
  </div>
</template>

<script lang="ts" setup>
import telegram from "assets/icons/footer/telegram.svg"
import vkontacte from "assets/icons/footer/vkontacte.svg"
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 122px;
  height: 32px;

  svg {
    width: 32px;
    height: 32px;
  }
}

</style>
