<template>
  <v-icon v-bind="$attrs">{{ mdiEye }}</v-icon>
</template>

<script lang="ts">
import { mdiEye } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    return { mdiEye }
  }
})
</script>
