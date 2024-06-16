<template>

  <UForm :validate="validateAuth" :state="value" class="wrapper-form" @submit="$emit('onClick', value)">
    <span v-if="type === 'login'" class="title-s">Авторизация</span>
    <span v-if="type === 'logup'" class="title-s">Регистрация</span>

    <UFormGroup label="Почта" name="email">
      <UInput class="w-[205px]" v-model="value.email"/>
    </UFormGroup>
    <UFormGroup v-if="type === 'logup'" label="Имя">
      <UInput class="w-[205px]" v-model="value.name" />
    </UFormGroup>
    <UFormGroup label="Пароль"  name="password">
      <UInput class="w-[205px]" v-model="value.password" type="password"/>
    </UFormGroup>


    <UButton type="submit">
      <span v-if="type === 'login'">Авторизоваться</span>
      <span v-if="type === 'logup'">Зарегистрироваться</span>
    </UButton>
  </UForm>
</template>

<script lang="ts" setup>
import type {ModelAuth} from "~/components/auth-form/types";
import {validateAuth} from "~/components/auth-form/helpers";

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

    .form-wrapper-toggle {
      display: flex;
      flex-direction: row;
      gap: 5px;

      .form-toggle-title {
        font-size: 12px;
      }
    }
  }
}


</style>
