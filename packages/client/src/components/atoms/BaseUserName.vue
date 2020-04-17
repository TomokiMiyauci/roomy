<template>
  <span :class="$style.base">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>

<style lang="scss" module>
.base {
  color: grey;
  font-size: 10px;
}
</style>
