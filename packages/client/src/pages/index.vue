<template>
  <div></div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
export default createComponent({
  setup(_, { root }) {
    root.$router.push('/public')
  }
})
</script>
