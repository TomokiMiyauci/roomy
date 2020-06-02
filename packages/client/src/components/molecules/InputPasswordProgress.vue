<template>
  <v-text-field
    :append-icon="show ? mdiEye : mdiEyeOff"
    :type="show ? 'text' : 'password'"
    :prepend-inner-icon="mdiShieldKey"
    :rules="[required, isValidLength]"
    :value="value"
    @click:append="show = !show"
    v-on="$listeners"
    autocomplete="new-password"
    outlined
    dense
    counter
    placeholder="Enter password"
    hint="At least 8 characters"
    label="Password"
    loading
  >
    <template v-slot:progress>
      <v-progress-linear
        :value="progress"
        :color="color"
        absolute
        height="7"
      ></v-progress-linear> </template
  ></v-text-field>
</template>

<script lang="ts">
import { mdiCloseCircle, mdiEye, mdiEyeOff, mdiShieldKey } from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import { isValidEmail, required } from '@/utils/validator'
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  setup(props: { value: string }) {
    const show = ref(false)

    const progress = computed(() => {
      return Math.min(100, props.value.length * 10)
    })

    const color = computed(() => {
      return ['error', 'warning', 'success'][Math.floor(progress.value / 40)]
    })

    const isValidLength = (text: string): true | 'At least 8 characters' => {
      return text.length >= 8 || 'At least 8 characters'
    }

    return {
      show,
      mdiShieldKey,
      mdiEye,
      mdiEyeOff,
      required,
      isValidEmail,
      mdiCloseCircle,
      progress,
      color,
      isValidLength
    }
  }
})
</script>
