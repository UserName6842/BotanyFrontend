export default defineNuxtPlugin((nuxtApp) => {
  const { onLogin, onLogout } = useApollo();
  nuxtApp.hook("apollo:auth", async ({ token }) => {
    const localToken = useCookie("apollo:default.token");
    if (!token.value) {
      if (localToken.value) token.value = localToken.value;
    }
    if (localToken.value) {
      const isTokenValid = checkTokenValidity(localToken.value);
      if (!isTokenValid) {
        localToken.value = null;
      }
    }
  });

  nuxtApp.hook("apollo:error", async (error) => {
    await RefrashToken();
  });
});

function checkTokenValidity(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (e) {
    console.error("Failed to parse token", e);
    return false;
  }
}

async function RefrashToken() {
  try {
    const { onLogin } = useApollo();
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
  } catch (e) {
    console.error("Ошибка Apollo:", e);
  }
}
