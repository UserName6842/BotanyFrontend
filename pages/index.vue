<script lang="ts" setup>

</script>

<template>
  <div>
    <div class="wrapper-title">
      <div class="title">
        Биологический калькулятор
      </div>
      <div class="subtitle">
        Новое решение для биологов всех поколений для вычисления экологического анализа
      </div>
      <div>
        <UButton @click="navigateTo('/home')" label="Начать работу" icon="i-heroicons-play-solid"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>



.wrapper-title {
  margin-top: 140px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;

  .subtitle {
    font-size: 20px;
    font-weight: 700;
    width: 80%;
    margin: 0 auto; /* Добавляем отступы по бокам для центрирования */
    text-align: center;
  }

  .title {
    font-size: 50px;
    color: var(--ling-root);
    font-weight: 700;
  }
}

@media (max-width: 900px) {
  .wrapper-title{
    margin-top: 100px;
  }

  .wrapper-title .title{
    font-size: 26px;
  }
  .wrapper-title .subtitle{
    font-size: 18px;
  }
}


</style>