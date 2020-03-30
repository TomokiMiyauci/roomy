<template>
  <span :class="$style.base">
    <slot />
  </span>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({})
</script>

<style lang="scss" module>
.base {
  color: grey;
  font-size: 10px;
}
</style>
