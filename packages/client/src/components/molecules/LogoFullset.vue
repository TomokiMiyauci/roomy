<template>
  <div>
    <logo-img align="top" />
    <logo-text />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    LogoImg: () => import('@/components/atoms/LogoImg.vue'),
    LogoText: () => import('@/components/atoms/LogoText.vue')
  }
})
</script>
