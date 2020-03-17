<template>
  <base-icon v-on="$listeners">{{ mdiPlay }}</base-icon>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { mdiPlay } from '@mdi/js'
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
