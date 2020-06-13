<template>
  <v-app>
    <the-app-bar-public
      :login="login"
      :photo-u-r-l="photoURL"
      :display-name="displayName"
      @click="$nuxt.$emit('close')"
      @scan="$nuxt.$emit('scan')"
    />

    <v-content>
      <transition name="fade">
        <nuxt :nuxt-child-key="$route.fullPath" />
      </transition>
    </v-content>

    <the-bottom-navigation :login="login" />
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { favoriteRoom, publicRoom, user, viewHistory } from '@/store'
import { PublicRoom } from '~types/core'
export default defineComponent({
  components: {
    TheAppBarPublic: () => import('@/components/organisms/TheAppBarPublic.vue'),

    TheBottomNavigation: () =>
      import('@/components/organisms/TheBottomNavigation.vue')
  },

  setup(_, { root }) {
    const onOpenQrcode = (room: PublicRoom) => {
      root.$nuxt.$emit('open:qrcode', room)
    }

    return {
      photoURL: user.photoURL,
      displayName: user.displayName,
      login: user.login,
      rooms: computed(() => publicRoom.rooms),
      viewHistories: computed(() => viewHistory.viewHistories),
      favoriteRooms: computed(() => favoriteRoom.favoriteRooms),
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
