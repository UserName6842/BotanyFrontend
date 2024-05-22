<template>

  <div class="wrapper-form">
    <span v-if="type === 'login'" class="title-s">Авторизация</span>
    <span v-if="type === 'logup'" class="title-s">Регистрация</span>
    <UInput v-model:model-value="value.email" placeholder="Email"/>
    <UInput v-if="type === 'logup'" v-model:model-value="value.name" placeholder="Name"/>
    <div class="form-password">
      <UInput v-model:model-value="value.password"  placeholder="Password" :type="!showPassword ? 'password' : ''"></UInput>
      <div class="form-wrapper-toggle">
      <UToggle  v-model:model-value="showPassword" />
        <span class="form-toggle-title">Показать пароль</span>
      </div>
    </div>
    <div class="wra">
      <UButton @click="$emit('onClick', value)" >
        <span v-if="type === 'login'" >Авторизоваться</span>
        <span v-if="type === 'logup'" >Зарегистрироваться</span>
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {ModelAuth} from "~/components/auth-form/types";

interface AuthFormProps {
  type: 'login' | "logup"
}

interface AuthFormEmit {
  (event: 'onClick', id: ModelAuth | undefined): void
}

defineProps<AuthFormProps>()
const value = defineModel<ModelAuth>("value", {default: {email: '', name: '', password: ''}})
defineEmits<AuthFormEmit>()

const showPassword = ref<boolean>(false)

</script>

<style lang="scss" scoped>
.wrapper-form {
  border: 1px solid var(--ling-root);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 300px;
  padding: 5px 10px 20px 10px;

  .form-password {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .form-wrapper-toggle{
      display: flex;
      flex-direction: row;
      gap: 5px;

      .form-toggle-title{
        font-size: 12px;
      }
    }
  }
}


</style>
