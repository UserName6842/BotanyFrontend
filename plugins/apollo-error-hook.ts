export default defineNuxtPlugin((nuxtApp) => {

    nuxtApp.hook('apollo:error', async (error) => {
        if (error.networkError && error.networkError.statusCode === 403) {
            const {onLogin, getToken, onLogout} = useApollo()
            await onLogout()
            const quert = gql`
            mutation Refrash($dataRefrash : RefreshTokenRequest ){
              auth {
                RefreshToken(data:$dataRefrash){
                  access_token
                  refresh_token
                }
              }
            }`

            const refreshToken = useCookie("refresh_token")

            const variables = {
                dataRefrash: {
                    refresh_token: refreshToken.value
                }
            }

            const {mutate, onDone, onError} = useMutation(quert)

            onDone(async (data) => {
                const token = data.data.auth.RefreshToken.access_token
                console.log(token)
                await onLogin(token)

                const auth = useAuth()
                auth.setIsLogin(true)
                console.log('Успешная регистрация. Токен:', token)
                location.reload()
            })

            onError((error) => {
                console.error('Ошибка при регистрации:', error)
            })

            await mutate(variables)
        }
    })
})