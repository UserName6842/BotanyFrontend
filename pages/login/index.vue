<template>
  <AuthForm class="mt-20" type="login" v-model:value="authValue" @on-click="login"/>
</template>

<script setup lang="ts">
  import type {ModelAuth} from "~/components/auth-form/types";
  import router from "#app/plugins/router";

  const authValue = ref<ModelAuth>()

  const login = async (value: ModelAuth) =>{
    try {
      const mutation = gql`
  	mutation auth($data : SignInUserInput ){
			auth{
    			signInUser(data:$data){
      			access_token
            refresh_token
    			}
  			}
		}
    `

      const variables = {
        data:{
          email: value.email,
          password: value.password
        }
      }


      const { mutate, onDone, onError } = useMutation(mutation)

      onDone( async (data) => {
        const refreshToken = useCookie("refresh_token")
        refreshToken.value = data.data.auth.signInUser.refresh_token
        const { onLogin, getToken} = useApollo()
        const token = data.data.auth.signInUser.access_token
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