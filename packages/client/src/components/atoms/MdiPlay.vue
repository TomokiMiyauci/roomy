<template>
  <base-icon v-on="$listeners">{{ mdiPlay }}</base-icon>
</template>

<script lang="ts">
import { mdiPlay } from '@mdi/js'
import { createComponent } from '@vue/composition-api'

import BaseIcon from '@/components/atoms/BaseIcon.vue'
export default createComponent({
  components: {
    BaseIcon
  },

  setup() {
    return { mdiPlay }
  }
})
</script>
