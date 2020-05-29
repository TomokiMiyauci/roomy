<template>
  <div>
    <imgLogo align="top" />
    <textLogo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    imgLogo: () => import('@/components/atoms/imgLogo.vue'),
    textLogo: () => import('@/components/atoms/textLogo.vue')
  }
})
</script>
