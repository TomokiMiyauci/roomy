<template>
  <v-app>
    <the-navigation-drawer-left />
    <the-navigation-drawer-right :rooms="rooms" @open:qrcode="onOpenQrcode" />
    <the-app-bar-chat />

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
import { privateRoom } from '@/store'
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

    return { rooms: computed(() => privateRoom.rooms), onOpenQrcode }
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
