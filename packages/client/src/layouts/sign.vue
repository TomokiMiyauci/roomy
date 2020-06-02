<template>
  <v-app>
    <client-only>
      <v-navigation-drawer
        v-if="!$vuetify.breakpoint.mdAndDown"
        app
        color="primary"
        width="600px"
      >
        <div
          class="white--text"
          style="position:absolute;left:200px;font-size:20rem;writing-mode: vertical-rl;"
        >
          Roomy
        </div>
      </v-navigation-drawer>
    </client-only>

    <v-content class="aaa">
      <transition name="fade">
        <nuxt />
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>

<style lang="scss">
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s;
}
</style>
