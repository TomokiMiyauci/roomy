<template>
  <v-textarea
    :rules="[(v) => !!v || 'required']"
    :prepend-inner-icon="mdiChatProcessing"
    :clear-icon="mdiCloseCircle"
    v-on="$listeners"
    :value="value"
    type="text"
    clearable
    auto-grow
    solo
    dense
    rows="1"
    hide-details
    label="Enter message"
    rounded
    light
    auto-focus
  ></v-textarea>
</template>

<script lang="ts">
import { mdiChatProcessing, mdiCloseCircle } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  setup() {
    return { mdiChatProcessing, mdiCloseCircle }
  }
})
</script>
