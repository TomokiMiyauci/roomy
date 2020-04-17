<template>
  <base-user-name>Anonymous</base-user-name>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import BaseUserName from '@/components/atoms/BaseUserName.vue'

export default defineComponent({
  components: {
    BaseUserName
  }
})
</script>
