<template>
  <v-textarea v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-textarea>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
