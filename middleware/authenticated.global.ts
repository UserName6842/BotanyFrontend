export default defineNuxtRouteMiddleware(async (to) => {
  const { getToken } = useApollo();
  const token = await getToken();
  if (
    to.path.toString() !== "/" &&
    to.path.toString() !== "/login" &&
    to.path.toString() !== "/user-agreement" &&
    to.path.toString() !== "/logup" &&
    !token
  ) {
    return navigateTo("/login");
  }
});
