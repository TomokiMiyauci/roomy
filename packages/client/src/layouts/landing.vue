<template>
  <v-app>
    <v-app-bar tile raised elevate-on-scroll app>
      <v-toolbar-title>
        Roomy
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn text>home</v-btn>
        <v-btn text>services</v-btn>
        <v-btn text>contact</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
