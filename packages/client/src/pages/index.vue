<template>
  <div>
    {{ hello }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup(_) {
    // root.$router.push('/public')

    return { hello: process.env.TTTT }
  }
})
</script>
