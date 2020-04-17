<template>
  <v-icon v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-icon>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
