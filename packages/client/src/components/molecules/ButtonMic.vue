<template>
  <v-tooltip :color="login ? 'secondary' : undefined" top>
    <template v-slot:activator="{ on }">
      <base-button
        v-on="on"
        @click="login ? $emit('audio') : undefined"
        :color="login ? 'primary' : 'grey'"
        icon
        ><v-icon>{{ mdiMicrophone }}</v-icon>
      </base-button>
    </template>
    <span v-if="login">Audio </span>
    <span v-else
      ><v-icon left color="green">{{ mdiInformation }}</v-icon> Require
      Signin</span
    >
  </v-tooltip>
</template>

<script lang="ts">
import { mdiInformation, mdiMicrophone } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
export default defineComponent({
  components: {
    BaseButton
  },

  props: {
    login: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { mdiInformation, mdiMicrophone }
  }
})
</script>
