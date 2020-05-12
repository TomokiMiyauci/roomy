<template>
  <v-btn v-bind="$attrs" v-on="$listeners" @click="$emit('click')" icon>
    <v-icon>{{ mdiClose }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { mdiClose } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return { mdiClose }
  }
})
</script>
