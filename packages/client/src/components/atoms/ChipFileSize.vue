<template>
  <base-chip small label>
    <v-icon small left>{{ mdiFileImage }}</v-icon
    >{{ size | prettyBytes }}
  </base-chip>
</template>

<script lang="ts">
import { mdiFileImage } from '@mdi/js'
import { createComponent } from '@vue/composition-api'

import BaseChip from '@/components/atoms/BaseChip.vue'

export default createComponent({
  props: {
    size: {
      type: Number,
      required: true
    }
  },

  components: {
    BaseChip
  },

  setup() {
    return { mdiFileImage }
  }
})
</script>
