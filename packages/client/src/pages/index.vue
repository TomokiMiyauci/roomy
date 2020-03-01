<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import { createComponent, reactive, toRefs } from '@vue/composition-api'
export default createComponent({
  setup() {
    const state = reactive({
      message: 'hello'
    })

    return toRefs(state)
  }
})
</script>
