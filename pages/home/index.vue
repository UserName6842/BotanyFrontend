<template>
  <div class="wrapper-page">
    <span class="title-m">Ознакомление</span>
    <div class="wrapper-content">
      <div v-for="(item, index) of content" :key="index" :class="{ 'row-reverse': index % 2 == 1 }" class="item">
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
const content: { title: string; content: string; img: string }[] = [
  {
    title: "Добавить вид растения",
    content: "Экологический анализ позволяет получить оценку экологических условий местообитания видов, определить взаимосвязь растений и окружающей среды. С помощью специальных шкал выполняется классификация растительных организмов по группам в зависимости от фактора среды и по уровням.",
    img: "/Plant.png",
  },
  {
    title: "Экоморфа",
    content: "Экоморфа – экологическая группа, к которой относятся виды по сходному отношению к экологическим факторам (увлажнение, плодородие почвы, освещение и д.р.) ",
    img: "/Ecomorph.png",
  },
  {
    title: "Трансекта",
    content: "Трансекта – отмеренная на территории экосистемы узкая прямоугольная площадка для изучения растительного покрова.",
    img: "/Transect.png",
  },
  {
    title: "Пробная площадка",
    content:
      "Пробная площадка – это ограниченный квадрат местообитания вида, на котором выполняется исследование растительного покрова (описание, наблюдение, сбор материала). Обычно является частью экспериментальных трансект и участков.",
    img: "/PP.png",
  },
];
</script>

<style lang="scss" scoped>
.wrapper-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 25px;
}

.wrapper-content {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .item {
    display: flex;
    gap: 10px;

    &.row-reverse {
      flex-direction: row-reverse;
    }
  }

  .wrapper-content-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 530px;
  }
}

@media (max-width: 768px) {
  .wrapper-page {
    gap: 30px;
  }
  .wrapper-content {
    .item {
      flex-direction: column;
      align-items: center;

      &.row-reverse {
        flex-direction: column;
        align-items: center;
      }
    }

    .wrapper-content-text {
      width: 75%;
      align-items: center;
      text-align: center;
    }
  }
}
</style>
