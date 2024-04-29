export default defineNuxtPlugin((nuxtApp) => {
    const cookie = useCookie("accessToken")
    nuxtApp.hook("apollo:auth", ({client, token}) => {
        if (userStore.authToken) {
            token.value = cookie
        }
    })
})