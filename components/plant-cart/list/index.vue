<template>
  <div class="wrapper-plant-cart-list">
    <plant-cart
      v-for="item of option"
      :key="item.id?.resourceId"
      :option="item"
      @on-click="$emit('onClick', item)"
      />
    </div>
</template>

<script setup lang="ts">
import type {TypePlant} from "~/stores/type-plant/types";

interface PlantCartListProps {
  option: TypePlant[]
}

interface PlantCartListEmits {
  (event: 'onClick', id: TypePlant | undefined): void
}
defineEmits<PlantCartListEmits>()

defineProps<PlantCartListProps>()

</script>

<style scoped lang="scss">
.wrapper-plant-cart-list{
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

@media (min-width: 260px) and (max-width: 700px) {
  .wrapper-plant-cart-list{
    gap: 10px;
  }
}
</style>
