<template>
  <v-app>
    <the-navigation-drawer-left />
    <the-navigation-drawer-right />
    <the-app-bar-private
      :login="login"
      :photo-u-r-l="photoURL"
      @click="$nuxt.$emit('close')"
    />

    <v-content>
      <transition name="fade">
        <nuxt />
      </transition>
    </v-content>
    <client-only>
      <the-bottom-navigation v-if="$vuetify.breakpoint.mdAndDown" />
    </client-only>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { user } from '@/store'

export default defineComponent({
  components: {
    TheAppBarPrivate: () =>
      import('@/components/organisms/TheAppBarPrivate.vue'),
    TheNavigationDrawerLeft: () =>
      import('@/components/organisms/TheNavigationDrawerLeft.vue'),
    TheNavigationDrawerRight: () =>
      import('@/components/organisms/TheNavigationDrawerRight.vue'),
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
