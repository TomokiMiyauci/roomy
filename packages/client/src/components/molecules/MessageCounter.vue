<template>
  <div>
    <mdi-chat-processing small left></mdi-chat-processing>
    <span>{{ messageCount }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    messageCount: {
      type: Number,
      default: 0
    }
  },
  components: {
    MdiChatProcessing: () =>
      import('@/components/atoms/icons/MdiChatProcessing.vue')
  }
})
</script>
