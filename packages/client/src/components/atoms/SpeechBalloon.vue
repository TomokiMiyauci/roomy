<template>
  <!-- Check if component’s slot is empty -->
  <div
    v-if="$slots.default"
    :class="[$style.base, left ? $style.left : $style.right]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  props: {
    left: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" module>
.base {
  position: relative; /* Set to fix triangle position */
  z-index: auto;
  display: inline-block;
  max-width: 180px;
  padding: 6px 12px;
  white-space: pre-line;
  text-align: left;
  word-wrap: break-word;
  background: #ececec;
  border-radius: 20px;
}

.base::after {
  position: absolute;
  z-index: -1;
  border: 20px solid transparent;
  content: '';
}

.left::after {
  bottom: 0;
  left: -10px;
  border-bottom-color: #ececec;
}
.right::after {
  top: 0;
  right: -10px;
  border-top-color: #ececec;
}
</style>
