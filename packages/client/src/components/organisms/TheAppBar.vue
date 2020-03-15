<template>
  <v-app-bar
    app
    hide-on-scroll
    inverted-scroll
    src="https://picsum.photos/1920/1080?random"
  >
    <v-btn icon>
      <v-icon>{{ mdiArrowLeft }}</v-icon>
    </v-btn>
    <v-divider></v-divider>
    <v-btn icon>
      <v-icon>{{ mdiArrowLeft }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { mdiArrowLeft } from '@mdi/js'
import { createComponent } from '@vue/composition-api'
export default createComponent({
  setup() {
    return { mdiArrowLeft }
  }
})
</script>
