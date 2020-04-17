<template>
  <v-chip v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-chip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
