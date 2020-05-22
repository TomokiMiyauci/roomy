<template>
  <v-chip
    v-on="$listeners"
    v-bind="$attrs"
    :close="enableClose"
    :color="color"
    text-color="white"
    label
  >
    <v-icon left>{{ mdiTagText }}</v-icon>

    <span class="pr-2 pl-2 title">
      {{ text }}
    </span>
  </v-chip>
</template>

<script lang="ts">
import { mdiTagText } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    },

    enableClose: {
      type: Boolean,
      default: false
    },

    color: {
      type: String,
      default: 'primary'
    }
  },

  setup() {
    return { mdiTagText }
  }
})
</script>
