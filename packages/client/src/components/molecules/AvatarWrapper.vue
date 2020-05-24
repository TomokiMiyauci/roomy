<template>
  <v-avatar :color="displayName ? 'secondary' : undefined" :size="size">
    <img v-if="login && photoURL" :src="photoURL" alt="avatar" />
    <span
      v-else-if="login && displayName"
      :style="{ fontSize: `${size * 0.7}px` }"
      class="white--text"
      >{{ displayName | firstUpperCase }}</span
    >
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
    },

    size: {
      type: Number || String,
      default: 48
    }
  },

  filters: {
    firstUpperCase(text: string | undefined | null): string {
      if (!text) return ''

      return text.substring(0, 1).toUpperCase()
    }
  },

  setup() {
    return { mdiAccountCircle }
  }
})
</script>
