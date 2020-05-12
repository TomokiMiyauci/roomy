<template>
  <v-tooltip color="secondary" top>
    <template v-slot:activator="{ on }">
      <base-button v-on="on" @click="$emit('send')" color="primary" icon
        ><v-icon>{{ mdiSend }}</v-icon>
      </base-button>
    </template>
    <span>Send</span>
  </v-tooltip>
</template>

<script lang="ts">
import { mdiSend } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
export default defineComponent({
  components: {
    BaseButton
  },

  setup() {
    return { mdiSend }
  }
})
</script>
