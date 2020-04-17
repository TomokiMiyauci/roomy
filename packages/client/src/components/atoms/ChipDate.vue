<template>
  <base-chip>{{ date }}</base-chip>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import dayjs from 'dayjs'

import BaseChip from '@/components/atoms/BaseChip.vue'

type Props = {
  unixtime: number
  format: string
}
export default defineComponent({
  components: {
    BaseChip
  },

  props: {
    unixtime: {
      type: Number,
      required: true
    },

    format: {
      type: String,
      default: ''
    }
  },

  setup(props: Props) {
    const date = computed(() => dayjs(props.unixtime).format(props.format))

    return { date }
  }
})
</script>
