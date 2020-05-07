<template>
  <v-avatar :color="displayName ? 'secondary' : undefined" :size="100">
    <img v-if="login && photoURL" :src="photoURL" alt="avatar" />
    <span v-else-if="login && displayName" class="white--text display-3">{{
      displayName
    }}</span>
    <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
  </v-avatar>
</template>

<script lang="ts">
import { mdiAccountCircle } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    displayName: {
      type: String,
      default: ''
    },

    photoURL: {
      type: String,
      default: ''
    },

    login: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { mdiAccountCircle }
  }
})
</script>
