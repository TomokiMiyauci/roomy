<template>
  <v-app>
    <the-navigation-drawer-left />
    <the-navigation-drawer-right
      :view-histories="viewHistories"
      :favorite-rooms="favoriteRooms"
      @open:qrcode="onOpenQrcode"
    />
    <the-app-bar-chat />

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import TheAppBarChat from '@/components/organisms/TheAppBarChat.vue'
import TheNavigationDrawerLeft from '@/components/organisms/TheNavigationDrawerLeft.vue'
import TheNavigationDrawerRight from '@/components/organisms/TheNavigationDrawerRight.vue'
import { favoriteRoom, viewHistory } from '@/store'
import { PublicRoom } from '~types/core'

export default defineComponent({
  components: {
    TheAppBarChat,
    TheNavigationDrawerLeft,
    TheNavigationDrawerRight
  },

  setup(_, { root }) {
    const onOpenQrcode = (room: PublicRoom) => {
      root.$nuxt.$emit('open:qrcode', room)
    }

    return {
      viewHistories: computed(() => viewHistory.viewHistories),
      favoriteRooms: computed(() => favoriteRoom.favoriteRooms),
      onOpenQrcode
    }
  }
})
</script>
