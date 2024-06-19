export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error(error);
  };
  nuxtApp.hook("vue:error", (err) => {
    console.error(err);
  });
});
