<template>
  <v-text-field
    :prepend-inner-icon="mdiEmail"
    :rules="[required, isValidEmail]"
    :clear-icon="mdiCloseCircle"
    :value="value"
    v-on="$listeners"
    type="email"
    placeholder="Enter email address"
    outlined
    clearable
    dense
    hint="e.g.: roomy@gmail.com"
    label="Email"
  />
</template>

<script lang="ts">
import { mdiCloseCircle, mdiEmail } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import { isValidEmail, required } from '@/utils/validator'
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  setup() {
    return { mdiEmail, required, isValidEmail, mdiCloseCircle }
  }
})
</script>
