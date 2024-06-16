<template>
  <Head>
    <Title> Биология </Title>
    <Meta name="description" content="Биология" />
    <Link rel="icon" href="/logo.svg" type="image/x-icon" />
  </Head>
  <ClientOnly>
    <!-- Yandex.Metrika counter -->
    <component :is="'script'">
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date(); for (var
      j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window,
      document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym"); ym(97451761, "init", { clickmap:true,
      trackLinks:true, accurateTrackBounce:true });
    </component>
    <noscript>
      <div><img alt="" src="https://mc.yandex.ru/watch/97451761" style="position: absolute; left: -9999px" /></div>
    </noscript>
    <!-- /Yandex.Metrika counter -->
  </ClientOnly>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <div>
      <UNotifications />
    </div>
  </ClientOnly>
</template>
