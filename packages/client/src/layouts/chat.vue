<template>
  <v-app>
    <the-app-bar-chat />
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

export default createComponent({
  components: {
    TheAppBarChat
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
