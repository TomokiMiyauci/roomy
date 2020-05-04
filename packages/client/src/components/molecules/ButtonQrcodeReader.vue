<template>
  <v-btn v-on="$listeners" icon color="secondary">
    <v-icon>{{ mdiQrcodeScan }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { mdiQrcodeScan } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return { mdiQrcodeScan }
  }
})
</script>
