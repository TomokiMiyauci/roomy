<template>
  <v-text-field
    :prepend-inner-icon="mdiMagnify"
    :clear-icon="mdiCloseCircle"
    :value="value"
    v-on="$listeners"
    hide-details
    dense
    solo
    rounded
    clearable
    aria-label="search"
    placeholder="Enter keywords"
  />
</template>

<script lang="ts">
import { mdiCloseCircle, mdiMagnify } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  setup() {
    return { mdiMagnify, mdiCloseCircle }
  }
})
</script>
