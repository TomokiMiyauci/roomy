<template>
  <v-btn v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
