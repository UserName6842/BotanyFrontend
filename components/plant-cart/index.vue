<template>
  <div class="wrapper-plant-cart" @click="$emit('onClick', option)">
    <div class="wrapper-plant-cart-image">
      <img v-if="option.img && option.img.path" :src="  useRuntimeConfig().public.apiURL + ':8080' + option.img.path" :alt="option.title" class="plant-cart-image">
    </div>
    <div>
      <div  class="title-xs">
        <span v-if="option.title" >{{option.title}}</span>
        <span v-else >?</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {TypePlant} from "~/stores/type-plant/types";


interface PlantCartProps {
  option: TypePlant
}

interface PlantCartEmits {
  (event: 'onClick', id: TypePlant | undefined): void
}
defineEmits<PlantCartEmits>()

defineProps<PlantCartProps>()

</script>

<style scoped lang="scss">
.wrapper-plant-cart {
  border: 2px solid var(--ling-root);
  border-radius: 6px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }


  .wrapper-plant-cart-image {
    border-radius: 6px;
    padding: 5px;

    .plant-cart-image {
      border-radius: 6px;
      width: 200px;
      height: 150px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover {
    .plant-cart-title {
      color: var(--dark-root);
    }

    .wrapper-plant-cart-image .plant-cart-image {
      transform: scale(1.03);
    }
  }
}

@media (min-width: 260px) and (max-width: 700px) {
  .wrapper-plant-cart{
    width: 135px;
    height: 120px;

    .wrapper-plant-cart-image .plant-cart-image {
      width: 100px;
      height: 75px;
    }
  }
}



</style>
