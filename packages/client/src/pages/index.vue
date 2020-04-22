<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup(_, { root }) {
    root.$router.push('/public')
  }
})
</script>
