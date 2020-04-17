<template>
  <span class="caption">{{ timestamp | time }}</span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default defineComponent({
  filters: {
    time(timestamp: { seconds: number }) {
      if (!timestamp) {
        return
      }
      dayjs.locale('en')
      dayjs.extend(relativeTime)

      return dayjs(timestamp.seconds * 1000).fromNow(true)
    }
  },

  props: {
    timestamp: {
      type: Object as () => { seconds: number },
      default: 0
    }
  }
})
</script>
