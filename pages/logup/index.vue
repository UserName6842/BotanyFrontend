<template>
  <AuthForm v-model:value="authValue" class="mt-20" type="logup" @on-click="logup" />
</template>

<script lang="ts" setup>
import type { ModelAuth } from "~/components/auth-form/types";

const authValue = ref<ModelAuth>();
const toast = useToast();

const logup = async (value) => {
  try {
    const mutation = gql`
      mutation reg($data: SignUpUserInput) {
        auth {
          signUpUser(data: $data) {
            access_token
            refresh_token
          }
        }
      }
    `;

    const variables = {
      data: {
        email: value.email,
        name: value.name,
        password: value.password,
      },
    };

    const { mutate, onDone, onError } = useMutation(mutation);

    onDone((data) => {
      const refreshToken = useCookie("refresh_token");
      refreshToken.value = data.data.auth.signUpUser.refresh_token;
      const token = data.data.auth.signUpUser.access_token;
      const { onLogin } = useApollo();
      onLogin(token);
      const auth = useAuth();
      auth.setIsLogin(true);
      navigateTo("/home");
    });

    onError((error) => {
      console.error("Ошибка при регистрации:", error);
      if (error.message == "duplicate email") {
        toast.add({
          id: "duplicateEmail",
          title: "Пользаватель с такой почтой уже существует",
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
