<template>
  <v-btn v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({})
</script>
