<template>
  <v-icon v-bind="$attrs">{{ mdiNewBox }}</v-icon>
</template>

<script lang="ts">
import { mdiNewBox } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    return { mdiNewBox }
  }
})
</script>
