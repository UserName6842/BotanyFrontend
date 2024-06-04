<template>
  <div class="slider">
    <div class="slides">
      <div v-for="(item, index) in content" class="slide">
        <cart
          :key="index"
          :content="item.content"
          :title="item.title"
          :type="index != 1 ? 'small' : 'defaults' "
          @click="  swapArrayElements(content, 1, index)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {CartProps} from "~/components/cart/types";
import {swapArrayElements} from "~/components/cart/helpers";

interface ListCartProps {
  content: CartProps[]
}

const {content} = defineProps<ListCartProps>()

</script>

<style lang="scss">
.slider {
  width: 100%;
}

.slides {
  display: flex;
  align-items: center;
  gap: 90px;
}

@media (max-width: 768px) {
  .slides{
    gap: 35px
  }
}
</style>
