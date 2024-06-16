<template>
  <UForm :state="value" :validate="validateAuth" class="wrapper-form" @submit="$emit('onClick', value)">
    <span v-if="type === 'login'" class="title-s">Авторизация</span>
    <span v-if="type === 'logup'" class="title-s">Регистрация</span>

    <UFormGroup label="Почта" name="email">
      <UInput v-model="value.email" class="w-[205px]" />
    </UFormGroup>
    <UFormGroup v-if="type === 'logup'" label="Имя">
      <UInput v-model="value.name" class="w-[205px]" />
    </UFormGroup>
    <UFormGroup label="Пароль" name="password">
      <UInput v-model="value.password" class="w-[205px]" :type="!showPassword ? 'password' : ''" />
    </UFormGroup>
    <div class="form-wrapper-toggle">
      <UToggle v-model:model-value="showPassword" />
      <span class="form-toggle-title">Показать пароль</span>
    </div>
    <UButton type="submit">
      <span v-if="type === 'login'">Авторизоваться</span>
      <span v-if="type === 'logup'">Зарегистрироваться</span>
    </UButton>
  </UForm>
</template>

<script lang="ts" setup>
import type { ModelAuth } from "~/components/auth-form/types";
import { validateAuth } from "~/components/auth-form/helpers";

interface AuthFormProps {
  type: "login" | "logup";
}

interface AuthFormEmit {
  (event: "onClick", id: ModelAuth | undefined): void;
}

defineProps<AuthFormProps>();
const value = defineModel<ModelAuth>("value", { default: { email: "", name: "", password: "" } });
defineEmits<AuthFormEmit>();

const showPassword = ref<boolean>(false);
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
