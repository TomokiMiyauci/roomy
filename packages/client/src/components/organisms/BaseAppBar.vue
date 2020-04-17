<template>
  <v-app-bar v-bind="$attrs" v-on="$listeners">
    <slot name="default" />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({})
</script>
