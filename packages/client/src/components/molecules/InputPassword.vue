<template>
  <v-text-field
    :append-icon="show ? mdiEye : mdiEyeOff"
    :type="show ? 'text' : 'password'"
    :prepend-inner-icon="mdiShieldKey"
    :rules="[required]"
    :value="value"
    @click:append="show = !show"
    v-on="$listeners"
    outlined
    dense
    placeholder="Enter Password"
    label="Password"
  />
</template>

<script lang="ts">
import { mdiEye, mdiEyeOff, mdiShieldKey } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

import { isValidEmail, required } from '@/utils/validator'
export default defineComponent({
  props: {
    value: {
      type: String || Number,
      default: ''
    }
  },

  setup() {
    const show = ref(false)

    return {
      show,
      mdiShieldKey,
      mdiEye,
      mdiEyeOff,
      required,
      isValidEmail
    }
  }
})
</script>
