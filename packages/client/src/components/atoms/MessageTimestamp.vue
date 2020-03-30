<template>
  <span class="caption">{{ timestamp | time }}</span>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default createComponent({
  filters: {
    time(timestamp: { seconds: number }) {
      if (!timestamp) {
        return
      }
      dayjs.locale('en')
      dayjs.extend(relativeTime)

      return dayjs(timestamp.seconds * 1000).to(dayjs())
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
