<template>
  <v-app>
    <the-navigation-drawer-left @edit="$nuxt.$emit('edit')" />
    <the-navigation-drawer-right
      :rooms="rooms"
      :login="login"
      :view-histories="viewHistories"
      :favorite-rooms="favoriteRooms"
      @open:qrcode="onOpenQrcode"
    />
    <the-app-bar-public
      :login="login"
      :photo-u-r-l="photoURL"
      :display-name="displayName"
      @click="$nuxt.$emit('close')"
      @scan="$nuxt.$emit('scan')"
    />

    <v-content>
      <nuxt :nuxt-child-key="$route.fullPath" />
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

import { favoriteRoom, publicRoom, user, viewHistory } from '@/store'
import { PublicRoom } from '~types/core'
export default defineComponent({
  components: {
    TheAppBarPublic: () => import('@/components/organisms/TheAppBarPublic.vue'),
    TheNavigationDrawerLeft: () =>
      import('@/components/organisms/TheNavigationDrawerLeft.vue'),
    TheNavigationDrawerRight: () =>
      import('@/components/organisms/TheNavigationDrawerRight.vue'),
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
