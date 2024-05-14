<template>
  <div class="wrapper-header">
    <div>
      <NuxtLink to="/">
        <logo class="h-16"/>
      </NuxtLink>
    </div>
    <div v-if="!auth.getIsLogin" class="wrapper-header-auth">
      <NuxtLink to="/login">
        <UButton>
          Авторизация
        </UButton>
      </NuxtLink>
      <NuxtLink to="/logup">
        <UButton>
          Регистрация
        </UButton>
      </NuxtLink>
    </div>
    <div v-else>
      <defaults-menu/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from "assets/icons/logo.svg"
import {useAuth} from "~/stores/auth";

const {getToken, onLogout} = useApollo()

const auth = useAuth()

await auth.checkLogin()

</script>

<style lang="scss" scoped>
.wrapper-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .wrapper-header-auth {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
  }
}
</style>