<template>
  <v-icon v-bind="$attrs">{{ mdiChatProcessing }}</v-icon>
</template>

<script lang="ts">
import { mdiChatProcessing } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    return { mdiChatProcessing }
  }
})
</script>
