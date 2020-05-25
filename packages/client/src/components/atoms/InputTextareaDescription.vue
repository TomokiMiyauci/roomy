<template>
  <v-textarea
    :prepend-inner-icon="mdiBookInformationVariant"
    :clear-icon="mdiCloseCircle"
    :value="value"
    v-on="$listeners"
    type="text"
    outlined
    clearable
    dense
    hint="e.g.: This is Roomy Offical Room."
    placeholder="Enter room description"
    auto-grow
    rows="1"
    label="Room Description"
  />
</template>

<script lang="ts">
import { mdiBookInformationVariant, mdiCloseCircle } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    value: {
      type: String || Number,
      default: ''
    }
  },

  setup() {
    return { mdiBookInformationVariant, mdiCloseCircle }
  }
})
</script>
