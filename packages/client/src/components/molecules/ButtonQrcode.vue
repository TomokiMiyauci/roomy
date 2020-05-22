<template>
  <v-btn
    v-on="$listeners"
    v-bind="$attrs"
    aria-label="qrcode"
    icon
    color="secondary"
  >
    <v-icon color="grey lighten-1">{{ mdiQrcode }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { mdiQrcode } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return { mdiQrcode }
  }
})
</script>
