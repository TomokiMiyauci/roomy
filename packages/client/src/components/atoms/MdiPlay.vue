<template>
  <base-icon v-on="$listeners">{{ mdiPlay }}</base-icon>
</template>

<script lang="ts">
import { mdiPlay } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import BaseIcon from '@/components/atoms/BaseIcon.vue'
export default defineComponent({
  components: {
    BaseIcon
  },

  setup() {
    return { mdiPlay }
  }
})
</script>
