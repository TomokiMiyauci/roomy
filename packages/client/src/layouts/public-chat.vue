<template>
  <v-app>
    <the-navigation-drawer-left />
    <the-navigation-drawer-right
      :view-histories="viewHistories"
      :rooms="rooms"
      @open:qrcode="onOpenQrcode"
    />
    <the-app-bar-chat :title="room ? room.name : ''" />

    <v-content>
      <transition name="fade">
        <nuxt />
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import TheAppBarChat from '@/components/organisms/TheAppBarChat.vue'
import TheNavigationDrawerLeft from '@/components/organisms/TheNavigationDrawerLeft.vue'
import TheNavigationDrawerRight from '@/components/organisms/TheNavigationDrawerRight.vue'
import { useFirestore } from '@/core/useFirestore'
import { firestore } from '@/plugins/firebase'
import { publicRoom, user } from '@/store'
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

    const room = useFirestore(
      firestore.collection('rooms').doc(root.$route.params.id)
    )

    return {
      rooms: computed(() => publicRoom.rooms),
      viewHistories: computed(() => user.viewHistories),
      onOpenQrcode,
      room
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
