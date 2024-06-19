<template>
  <div>
    <OpenIcon class="h-6 menu-open-icon" @click="isOpen = true" />

    <USlideover v-model="isOpen" side="left">
      <UCard
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
        class="flex flex-col flex-1"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">Меню</h3>
            <UButton
              class="my-1"
              color="gray"
              icon="i-heroicons-x-mark-20-solid"
              variant="ghost"
              @click="isOpen = false"
            />
          </div>
          <div v-if="auth.user">
            {{ auth.user.name }}
          </div>
        </template>

        <template #default>
          <div class="wrapper-menu">
            <UVerticalNavigation :links="links" />
            <UButton
              class="menu-logout"
              icon="i-heroicons-arrow-right-end-on-rectangle-solid"
              label="Выйти"
              @click="logout"
            />
          </div>
        </template>
      </UCard>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
import OpenIcon from "assets/icons/menu/open-icon.svg";
import { useAuth } from "~/stores/auth";

const isOpen = ref(false);

const links = computed(() => {
  const config = [
    {
      label: "Главная",
      icon: "i-heroicons-home",
      to: "/home",
      click: () => {
        isOpen.value = false;
      },
    },
    {
      label: "Геоботаническое описание",
      icon: "i-heroicons-document-text",
      to: "/transecta",
      click: () => {
        isOpen.value = false;
      },
    },
    {
      label: "Видовой состав",
      icon: "i-ph-plant-light",
      to: "/type-plant",
      click: () => {
        isOpen.value = false;
      },
    },
  ];

  if (auth.user?.role === "SuperUser") {
    config.push({
      label: "Группы Экоморфов",
      icon: "i-ph-plant-light",
      to: "/ecomorph",
      click: () => {
        isOpen.value = false;
      },
    });
    config.push({
      label: "Экоморфы",
      icon: "i-ph-plant-light",
      to: "/type-ecomorphs",
      click: () => {
        isOpen.value = false;
      },
    });
  }

  return config;
});

const auth = useAuth();

await auth.getMe();

const logout = async () => {
  const { onLogout } = useApollo();
  auth.setIsLogin(false);
  await onLogout();
  let token = useCookie("apollo:default.token");
  if (token.value) {
    token.value = null;
  }
  navigateTo("/");
};
</script>

<style lang="scss" scoped>
.menu-open-icon {
  color: var(--ling-root);

  &:hover {
    cursor: pointer;
  }
}

.wrapper-menu {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .menu-logout {
    width: 90px;
    margin-left: 10px;
  }
}
</style>
