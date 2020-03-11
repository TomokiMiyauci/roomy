<template>
  <!-- Check if component’s slot is empty -->
  <div
    v-if="$slots.default"
    class="speech-balloon"
    :class="left ? 'left' : 'right'"
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

<style lang="scss">
.speech-balloon {
  position: relative; /* Set to fix triangle position */
  display: inline-block;
  max-width: 180px;
  padding: 8px 15px;
  white-space: pre-line;
  text-align: left;
  word-wrap: break-word;
  background: #ececec;
  border-radius: 20px;
}

.speech-balloon::after {
  position: absolute;
  bottom: 0;
  border: 20px solid transparent;
  border-bottom-color: #ececec;
  content: '';
}
.left::after {
  left: -10px;
}
.right::after {
  right: -10px;
}
</style>
