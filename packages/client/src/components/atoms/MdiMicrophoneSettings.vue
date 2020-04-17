<template>
  <base-icon v-on="$listeners">{{ mdiMicrophoneSettings }}</base-icon>
</template>

<script lang="ts">
import { mdiMicrophoneSettings } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import BaseIcon from '@/components/atoms/BaseIcon.vue'

export default defineComponent({
  components: {
    BaseIcon
  },

  setup() {
    return { mdiMicrophoneSettings }
  }
})
</script>
