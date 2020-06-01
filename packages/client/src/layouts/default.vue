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
import { defineComponent } from '@vue/composition-api'

import TheAppBar from '@/components/organisms/TheAppBar.vue'
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
</style>
