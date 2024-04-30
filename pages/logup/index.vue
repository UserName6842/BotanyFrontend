<template>
  <AuthForm class="mt-20" type="logup" v-model:value="authValue"  @on-click="logup"/>
</template>

<script setup lang="ts">
import type {ModelAuth} from "~/components/auth-form/types";

const authValue = ref<ModelAuth>()

const logup = async (value) => {
  try {
    const mutation = gql`
      mutation reg($data: SignUpUserInput) {
        auth{
          signUpUser(data: $data) {
            access_token
          }
        }
      }
    `

    const variables = {
      data: {
        email: value.email,
        name: value.name,
        password: value.password,
      }
    }

    const { mutate, onDone, onError } = useMutation(mutation)

    onDone((data) => {
      const token = data.data.auth.signUpUser.access_token
      const { onLogin } = useApollo()
      onLogin(token)
      const auth = useAuth()
      auth.setIsLogin(true)
      console.log('Успешная регистрация. Токен:', token)
      navigateTo('/home')
    })

    onError((error) => {
      console.error('Ошибка при регистрации:', error)
    })

    mutate(variables)
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error)
  }
}

</script>

<style scoped lang="scss">

</style>