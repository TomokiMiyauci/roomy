<template>
  <div>
    <template v-if="isOwn">
      <v-avatar color="indigo" right size="36">
        <span class="white--text headline">36</span>
      </v-avatar>
      <box-callout :left="true">{{ message.text }}</box-callout>
      <span class="ml-2 caption">{{ message.createdAt | time }}</span>
    </template>

    <template v-else>
      <span class="mr-2 caption">{{ message.createdAt | time }}</span>
      <box-callout class="mr-3" :left="false">{{ message.text }}</box-callout>
    </template>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import firebase from '@/plugins/firebase'
import BoxCallout from '@/components/atoms/SpeechBalloon.vue'

export type Message = {
  text: string
  createdAt: firebase.firestore.FieldValue
}

export default createComponent({
  components: {
    BoxCallout
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
      required: true
    }
  },

  setup() {}
})
</script>
