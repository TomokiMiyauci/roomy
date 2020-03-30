<template>
  <base-user-name>Anonymous</base-user-name>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import BaseUserName from '@/components/atoms/BaseUserName.vue'

export default createComponent({
  components: {
    BaseUserName
  }
})
</script>
