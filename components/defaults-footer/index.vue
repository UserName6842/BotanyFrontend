<template>
  <div class="first-content">
    10:00-20:00 MSK • GMT +3
    hello@result.school
  </div>
  <div class="center-content">
      <NuxtLink href="/home" target="_blank">
        Документация
      </NuxtLink>
    <a href="https://donnu.ru/bio/bec" target="_blank">
        О нас
      </a>
  </div>
  <div class="icon-wrapper">
    <a href="https://t.me/Kalin24Don" target="_blank">
      <telegram class="telegram" />
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

.telegram{
  color: #091a28;
}
.first-content{
  max-width: 220px;
  text-align: center;
}

.center-content{
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  margin-right: 96px;
}

@media (max-width: 768px) {
  .icon-wrapper {
    width: 102px;
    height: 32px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
  .first-content{
    font-size: 12px;
  }
  .center-content{
    font-size: 14px;
    margin-right: 0;
  }
}

</style>
