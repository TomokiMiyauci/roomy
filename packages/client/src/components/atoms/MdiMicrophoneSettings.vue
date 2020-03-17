<template>
  <base-icon v-on="$listeners">{{ mdiMicrophoneSettings }}</base-icon>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { mdiMicrophoneSettings } from '@mdi/js'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
export default createComponent({
  components: {
    BaseIcon
  },

  setup() {
    return { mdiMicrophoneSettings }
  }
})
</script>
