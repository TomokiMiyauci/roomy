<template>
  <v-app>
    <the-app-bar-chat />
    <the-navigation-drawer-left />
    <the-navigation-drawer-right />
    <v-content>
      <transition name="fade">
        <nuxt />
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import TheAppBarChat from '@/components/organisms/TheAppBarChat.vue'
import TheNavigationDrawerLeft from '@/components/organisms/TheNavigationDrawerLeft.vue'
import TheNavigationDrawerRight from '@/components/organisms/TheNavigationDrawerRight.vue'

export default createComponent({
  components: {
    TheAppBarChat,
    TheNavigationDrawerLeft,
    TheNavigationDrawerRight
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
