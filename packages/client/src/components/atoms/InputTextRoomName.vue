<template>
  <v-text-field
    :clear-icon="mdiCloseCircle"
    :prepend-inner-icon="mdiSemanticWeb"
    :rules="[required]"
    :value="value"
    v-on="$listeners"
    placeholder="Enter room name"
    clearable
    outlined
    hint="e.g.: Roomy Official"
    label="Room Name"
  ></v-text-field>
</template>

<script lang="ts">
import { mdiCloseCircle, mdiSemanticWeb } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import { required } from '@/utils/validator'
export default defineComponent({
  props: {
    value: {
      type: String || Number,
      default: ''
    }
  },

  setup() {
    return { required, mdiCloseCircle, mdiSemanticWeb }
  }
})
</script>
