<template>
  <v-app>
    <the-app-bar :login="login" :photo-u-r-l="photoURL" />

    <!-- <the-navigation-drawer-left />
    <the-navigation-drawer-right /> -->
    <v-content>
      <transition name="fade">
        <nuxt />
      </transition>
    </v-content>
    <the-bottom-navigation />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TheAppBar from '@/components/organisms/TheAppBar.vue'
// import TheNavigationDrawerLeft from '@/components/organisms/TheNavigationDrawerLeft.vue'
// import TheNavigationDrawerRight from '@/components/organisms/TheNavigationDrawerRight.vue'
import { user } from '@/store'

export default defineComponent({
  components: {
    TheAppBar,
    TheBottomNavigation: () =>
      import('@/components/organisms/TheBottomNavigation.vue')
  },

  setup() {
    return { photoURL: user.photoURL, login: user.login }
  }
})
</script>

<style lang="scss">
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s;
}

.layout {
  &-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
  &-enter {
    transform: translateX(10px);
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.3s ease;
  }
}
</style>
