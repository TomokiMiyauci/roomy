<template>
  <v-app>
    <the-app-bar :login="login" :photo-u-r-l="photoURL" />
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
import TheBottomNavigation from '@/components/organisms/TheBottomNavigation.vue'
import { user } from '@/store'

export default createComponent({
  components: {
    TheAppBar,
    TheBottomNavigation
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
