<template>
  <div class="wrapper-page">
    <span class="title-m">Ознакомление</span>
  <div class="wrapper-content">
    <div v-for="(item, index) of content" :key="index" class="item" :class="{'row-reverse': index % 2 == 1}">
      <div class="wrapper-content-text">
        <span>
          {{ item.title }}
        </span>
        <span>
           {{ item.content }}
        </span>
      </div>
      <div>
        <img :src="item.img" alt="Картинка"/>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>

const content: { title: string, content: string, img:  string }[] = [
  {
    title: "Создание вида растени",
    content: "В экологическом анализе растения могут быть классифицированы по различным критериям, связанным с их взаимодействием с окружающей средой. По этим критериям мы и создаем виды растений ",
    img: "/Plant.png"
  },
  {
    title: "Экоморфы",
    content: "Экоморфы - это различные формы и структуры, которые растения развивают в ответ на определенные экологические условия, такие как климат, почва, доступность воды и наличие конкурентов.",
    img: "/Ecomorph.png"
  },
  {
    title: "Трансекта",
    content: "Трансекта - это линейная маршрутная полоса или прямая линия, которая используется для сбора данных и изучения экологических особенностей определенной области или экосистемы.",
    img:  "/Transect.png"
  },
  {
    title: "Пробная площадка",
    content: "Пробная площадка  - это участок земли или экосистемы, который используется для предварительного изучения и планирования.",
    img:  "/PP.png"
  },
]

</script>

<style lang="scss" scoped>
  .wrapper-page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 60px;

  }

  .wrapper-content{
    font-weight: bold;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .item{
      display: flex;
      gap: 10px;
      &.row-reverse{
        flex-direction: row-reverse;
      }
    }


    .wrapper-content-text{
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 530px;
    }
  }
</style>
