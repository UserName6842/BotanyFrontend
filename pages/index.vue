<template>
  <div class="w-full">
    <div class="wrapper-title">
      <div class="title-x md: text-xl text-center">
        Биологический калькулятор
      </div>
      <div class="subtitle md: text-m">
        Новое решение для биологов всех поколений для вычисления экологического анализа
      </div>
      <div>
        <UButton icon="i-heroicons-play-solid" label="Начать работу" @click="navigateTo('/home')"/>
      </div>
    </div>
    <div class="wrapper-swiper">
      <swiper-list :content="listCart"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type {CartProps} from "~/components/cart/types";
import SwiperList from "~/components/cart/list.vue";

const listCart = ref<CartProps[]>([
  {
    title: "Скорость",
    content: "Эффективные алгоритмы и оптимизированный код помогают ускорить вычисления, обеспечивая быстрый и отзывчивый пользовательский опыт."
  },
  {
    title: "Надежность",
    content: "Надежность в контексте веб-сайта означает его способность функционировать без сбоев и простоев. Это важный аспект, который обеспечивает постоянный доступ к информации и услугам для пользователей."
  },
  {
    title: "Адаптивность",
    content: "Удобство использования для пользователей различного возраста и уровня навыков в использовании приложения."
  }
])
</script>

<style lang="scss" scoped>
.wrapper-swiper {
  margin-top: 70px;
}

.subtitle {
  font-size: 20px;
  font-weight: 700;
  width: 80%;
  margin: 0 auto; /* Добавляем отступы по бокам для центрирования */
  text-align: center;
}

.wrapper-title {
  margin-top: 120px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 900px) {
  .wrapper-swiper{
    display: none;
  }

  .subtitle{
    font-size: 14px;
  }
}


</style>
