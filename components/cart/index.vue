<template>
  <div :class="{ small: type == 'small', big: type == 'big' }" class="wrapper-cart">
    <div class="title">
      {{ title }}
    </div>
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CartProps } from "./types";

defineProps<CartProps>();
</script>

<style lang="scss" scoped>
.wrapper-cart {
  display: flex;
  border: 2px solid var(--ling-root);
  gap: 10px;
  width: 276px;
  height: 332px;
  flex-direction: column;
  padding: 20px 25px 20px 20px;
  font-weight: bold;

  .title {
    font-size: 29px;
  }

  :hover {
    cursor: pointer;
  }

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    line-height: 19px;
  }
}

.wrapper-cart.small {
  height: 260px;
  width: 206px;

  .title {
    font-size: 20px;
  }

  .content {
    font-size: 14px;
  }
}
</style>
