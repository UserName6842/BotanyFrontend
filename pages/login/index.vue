<template>
  <AuthForm v-model:value="authValue" class="mt-20" type="login" @on-click="login" />
</template>

<script lang="ts" setup>
import type { ModelAuth } from "~/components/auth-form/types";

const toast = useToast();
const authValue = ref<ModelAuth>();

const login = async (value: ModelAuth) => {
  try {
    const mutation = gql`
      mutation auth($data: SignInUserInput) {
        auth {
          signInUser(data: $data) {
            access_token
            refresh_token
          }
        }
      }
    `;

    const variables = {
      data: {
        email: value.email,
        password: value.password,
      },
    };

    const { mutate, onDone, onError } = useMutation(mutation);

    onDone(async (data) => {
      console.log("Авторизация:",data.data)
      const refreshToken = useCookie("refresh_token");
      refreshToken.value = data.data.auth.signInUser.refresh_token;
      const { onLogin } = useApollo();
      await onLogin(data.data.auth.signInUser.access_token);
      console.log("Авторизация:",useCookie('apollo:default.token'))
      const auth = useAuth();
      auth.setIsLogin(true);
      navigateTo("/home");
    });

    onError((error) => {
      console.error("Ошибка при авторизации:", error.message);
      if (error.message == "record not found") {
        toast.add({
          id: "recordNotFound",
          title: "Пользаватель не найден",
          timeout: 5000,
          description: "",
          color: "red",
        });
      }
    });

    mutate(variables);
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
  }
};
</script>

<style lang="scss" scoped></style>
