<template>
  <base-button @click="onDownload" icon>
    <v-icon>{{ mdiFileDownload }}</v-icon>
  </base-button>
</template>

<script lang="ts">
import { mdiFileDownload } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'
import axios from 'axios'

import BaseButton from '@/components/atoms/BaseButton.vue'
type Props = {
  blob: Blob
  originUrl: string
}

export default defineComponent({
  components: {
    BaseButton
  },

  props: {
    blob: {
      type: Object as () => Blob
    },

    originUrl: {
      type: String
    }
  },

  setup(props: Props, { emit }) {
    const getBlob = async () => {
      const result = await axios
        .get(props.originUrl, {
          responseType: 'blob'
        })
        .catch((e: any) => {
          console.error(e)
        })

      return result ? (result.data as Blob) : undefined
    }

    const onDownload = async () => {
      if (!props.blob && !props.originUrl)
        return emit('donwloadend', { status: 400 })

      const blob = props.originUrl ? await getBlob() : props.blob
      if (!blob) return emit('donwloadend', { status: 400 })

      const a = document.createElement('a')

      a.download = ''
      a.href = URL.createObjectURL(blob)
      a.click()

      emit('donwloadend', { status: 200 })
    }
    return { mdiFileDownload, onDownload }
  }
})
</script>
