<template>
  <v-app-bar v-bind="$attrs" v-on="$listeners">
    <slot />
  </v-app-bar>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({})
</script>
