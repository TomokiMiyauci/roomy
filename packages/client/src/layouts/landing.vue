<template>
  <v-app>
    <v-app-bar tile raised elevate-on-scroll app>
      <logo-fullset />
      <v-spacer />
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn text>home</v-btn>
        <v-btn text>services</v-btn>
        <v-btn text>contact</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer color="grey">
      <v-card-text class="text-center">
        TomokiMiyauci &copy; {{ new Date().getFullYear() }}
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    LogoFullset: () => import('@/components/molecules/LogoFullset.vue')
  }
})
</script>
