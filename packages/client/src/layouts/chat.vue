<template>
  <v-app>
    <the-navigation-drawer-left />
    <the-navigation-drawer-right :rooms="rooms" />
    <the-app-bar-chat />

    <v-content>
      <transition name="fade">
        <nuxt />
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TheAppBarChat from '@/components/organisms/TheAppBarChat.vue'
import TheNavigationDrawerLeft from '@/components/organisms/TheNavigationDrawerLeft.vue'
import TheNavigationDrawerRight from '@/components/organisms/TheNavigationDrawerRight.vue'
import { useFirestore } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'

export default defineComponent({
  components: {
    TheAppBarChat,
    TheNavigationDrawerLeft,
    TheNavigationDrawerRight
  },

  setup() {
    const { collectionRef } = roomReference()

    const rooms = useFirestore(
      collectionRef.value
        .where('isPrivate', '==', false)
        .orderBy('recent.updatedAt', 'desc')
    )

    return { rooms }
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
