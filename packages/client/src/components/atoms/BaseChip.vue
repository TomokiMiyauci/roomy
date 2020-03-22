<template>
  <v-chip v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-chip>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({})
</script>
