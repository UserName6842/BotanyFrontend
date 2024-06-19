export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("apollo:error", async (error) => {
    try {
      if (error.networkError && error.networkError.statusCode === 403) {
        const { onLogin, onLogout } = useApollo();
        await onLogout();
        const quert = gql`
          mutation Refrash($dataRefrash: RefreshTokenRequest) {
            auth {
              refreshToken(data: $dataRefrash) {
                access_token
                refresh_token
              }
            }
          }
        `;

        const refreshToken = useCookie("refresh_token");

        const variables = {
          dataRefrash: {
            refresh_token: refreshToken.value,
          },
        };

        const { mutate, onDone, onError } = useMutation(quert);

        onDone(async (data) => {
          await onLogin(data.data.auth.refreshToken.access_token);
          let token = useCookie("apollo:default.token");
          if (!token.value) {
            token.value = data.data.auth.signInUser.access_token;
          }

          const auth = useAuth();
          auth.setIsLogin(true);
        });

        onError((error) => {
          console.error("Ошибка при регистрации:", error);
        });

        await mutate(variables);
      }
    } catch (e) {
      console.error("Ошибка Apollo:", e);
    }
  });
});
