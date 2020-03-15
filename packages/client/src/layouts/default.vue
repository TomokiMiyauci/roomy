<template>
  <v-app>
    <the-app-bar />
    <v-content>
      <transition name="fade">
        <nuxt />
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import TheAppBar from '@/components/organisms/TheAppBar.vue'

export default createComponent({
  components: {
    TheAppBar
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
