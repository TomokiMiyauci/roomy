<template>
  <div>
    <message-set-oneself v-if="isOwn" :message="message" />
    <message-set-others v-else :message="message" />
  </div>
</template>

<script lang="ts">
import { mdiAccountCircle, mdiFileImage } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import ChipFileSize from '@/components/atoms/ChipFileSize.vue'
import BoxCallout from '@/components/atoms/SpeechBalloon.vue'
import UserNameAnonymous from '@/components/atoms/UserNameAnonymous.vue'
import ButtonAudio from '@/components/molecules/ButtonAudio.vue'
import ButtonFileDownload from '@/components/molecules/ButtonFileDownload.vue'
import MessageSetOneself from '@/components/molecules/MessageSetOneself.vue'
import MessageSetOthers from '@/components/molecules/MessageSetOthers.vue'
import { Message } from '@/types/core'
export default defineComponent({
  components: {
    BoxCallout,
    ButtonAudio,
    ButtonFileDownload,
    ChipFileSize,
    UserNameAnonymous,
    MessageSetOthers,
    MessageSetOneself
  },

  filters: {
    time(timestamp: { seconds: number }) {
      if (!timestamp) {
        return
      }
      dayjs.locale('ja')
      dayjs.extend(relativeTime)

      return dayjs(timestamp.seconds * 1000).to(dayjs())
    }
  },

  props: {
    message: {
      type: Object as () => Message,
      required: true
    },

    isOwn: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    return { mdiFileImage, mdiAccountCircle }
  }
})
</script>
