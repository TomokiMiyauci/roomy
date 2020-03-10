<template>
  <v-app>
    <the-app-bar />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  components: {
    TheAppBar: () => import('~/components/organisms/TheAppBar.vue')
  }
})
</script>
