<template>
  <v-app>
    <the-app-bar :login="login" :photo-u-r-l="photoURL" />
    <the-navigation-drawer-left />
    <the-navigation-drawer-right />
    <v-content>
      <transition name="fade">
        <nuxt />
      </transition>
    </v-content>
    <the-bottom-navigation />
  </v-app>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import TheAppBar from '@/components/organisms/TheAppBar.vue'
import TheNavigationDrawerLeft from '@/components/organisms/TheNavigationDrawerLeft.vue'
import TheNavigationDrawerRight from '@/components/organisms/TheNavigationDrawerRight.vue'
import { user } from '@/store'

export default createComponent({
  components: {
    TheAppBar,
    TheBottomNavigation: () =>
      import('@/components/organisms/TheBottomNavigation.vue'),
    TheNavigationDrawerLeft,
    TheNavigationDrawerRight
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
</style>
