<template>
  <span>
    <span
      style="padding:8px;color:#fff;font-weight: bold;font-size: 2em;text-shadow:3px 3px 3px #000;"
    >
      Roo<span :class="$style.logo">my</span>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({})
</script>

<style lang="scss" module>
.logo {
  margin-left: 4px;
  padding: 0 5px;
  color: white;
  text-shadow: 2px 2px 3px #000;
  background-color: #ffab00;
  border-radius: 5px;
  box-shadow: 2px 2px 3px #000;
  transition: all 0.8s;
}

.logo:hover {
  background-color: #3bd1b3;
}
</style>
