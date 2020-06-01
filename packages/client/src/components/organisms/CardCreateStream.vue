<template>
  <v-card>
    <v-toolbar>
      <button-close @click="$emit('close')" />
      <v-toolbar-title>Create Video</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <!-- <v-text-field /> -->
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary">create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import ButtonClose from '@/components/molecules/ButtonClose.vue'
export default defineComponent({
  components: {
    ButtonClose
  }
})
</script>
