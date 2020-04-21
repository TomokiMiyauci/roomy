<template>
  <v-app>
    <the-navigation-drawer-left />
    <the-navigation-drawer-right :rooms="rooms" @open:qrcode="onOpenQrcode" />
    <the-app-bar
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
      <the-bottom-navigation
        v-if="$vuetify.breakpoint.mdAndDown"
        :login="login"
      />
    </client-only>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { privateRoom, user } from '@/store'
import { PrivateRoom } from '~types/core'
export default defineComponent({
  components: {
    TheAppBar: () => import('@/components/organisms/TheAppBarPublic.vue'),
    TheNavigationDrawerLeft: () =>
      import('@/components/organisms/TheNavigationDrawerLeft.vue'),
    TheNavigationDrawerRight: () =>
      import('@/components/organisms/TheNavigationDrawerRight.vue'),
    TheBottomNavigation: () =>
      import('@/components/organisms/TheBottomNavigation.vue')
  },

  setup(_, { root }) {
    const onOpenQrcode = (room: PrivateRoom) => {
      root.$nuxt.$emit('open:qrcode', room)
    }

    return {
      photoURL: user.photoURL,
      login: user.login,
      rooms: computed(() => privateRoom.rooms),
      onOpenQrcode
    }
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
