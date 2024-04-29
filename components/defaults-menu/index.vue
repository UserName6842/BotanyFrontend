<template>
  <div>
    <OpenIcon class="h-6 menu-open-icon" @click="isOpen = true"/>

    <USlideover v-model="isOpen" side="left">
      <UCard :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
             class="flex flex-col flex-1">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Меню
            </h3>
            <UButton class="my-1" color="gray" icon="i-heroicons-x-mark-20-solid" variant="ghost"
                     @click="isOpen = false"/>
          </div>
        </template>

        <template #default>
          <div class="wrapper-menu">
            <UVerticalNavigation :links="links"/>
            <UButton class="menu-logout" icon="i-heroicons-arrow-right-end-on-rectangle-solid" label="Выйти"
                     @click="logout"/>
          </div>
        </template>


      </UCard>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
import OpenIcon from "assets/icons/menu/open-icon.svg";
import {useAuth} from "~/stores/auth";

const isOpen = ref(false)

const route = useRoute()

const links = [
  {
    label: 'Главная',
    icon: 'i-heroicons-home',
    to: '/home'
  }, {
    label: 'Трансекты',
    icon: 'i-heroicons-document-text',
    to: '/transecta'
  }, {
    label: 'Типы растений',
    icon: 'i-ph-plant-light',
    to: '/type-plant'
  },
  {
    label: 'Экоморфы',
    icon: 'i-ph-plant-light',
    to: '/ecomorph'
  }
  ,
  {
    label: 'Типы Экоморфов',
    icon: 'i-ph-plant-light',
    to: '/type-ecomorphs'
  }]


const auth = useAuth()
const logout = async () => {
  const {onLogout} = useApollo()
  auth.setIsLogin(false)
  await onLogout()
  navigateTo('/')
}

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