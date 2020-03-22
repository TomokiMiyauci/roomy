<template>
  <v-row :justify="isOwn ? 'start' : 'end'">
    <template v-if="isOwn">
      <v-col cols="auto" align-self="end">
        <v-avatar color="indigo" right size="36">
          <span class="white--text headline">36</span>
        </v-avatar>
      </v-col>

      <v-col cols="auto" align-self="end">
        <template v-if="message.kind === 'TEXT'">
          <box-callout :left="true">{{ message.text }}</box-callout>
        </template>

        <template v-else-if="message.kind === 'AUDIO'">
          <box-callout :left="true">{{ message.audioURL }}</box-callout>
        </template>

        <span class="ml-2 caption">{{ message.createdAt | time }}</span>
      </v-col>
    </template>

    <template v-else>
      <v-col cols="auto" align-self="end">
        <span class="caption">{{ message.createdAt | time }}</span>
      </v-col>

      <!-- <template v-if="message.kind === 'IMAGE'">
        <v-col cols="auto" align-self="center">
          <button-file-download :origin-url="message.imageURL" />
        </v-col>
      </template> -->

      <v-col cols="auto" align-self="end">
        <template v-if="message.kind === 'TEXT'">
          <box-callout :left="false">{{ message.text }}</box-callout>
        </template>

        <template v-if="message.kind === 'IMAGE'">
          <box-callout :left="false">
            <v-row no-gutters style="padding-bottom:6px;">
              <v-col>
                <chip-file-size :size="message.size" />
              </v-col>
            </v-row>
            <v-img :src="message.imageURL" />
            <v-row no-gutters justify="center" style="padding-top:6px;">
              <v-col cols="auto">
                <button-file-download :origin-url="message.imageURL" />
              </v-col>
            </v-row>
          </box-callout>
        </template>

        <template v-else-if="message.kind === 'AUDIO'">
          <box-callout :left="false">
            <button-audio :src="message.audioURL" />
          </box-callout>
        </template>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mdiFileImage } from '@mdi/js'
import BoxCallout from '@/components/atoms/SpeechBalloon.vue'
import { MessageSet, FirestoreFieldValue } from '@/types/core'
import ButtonAudio from '@/components/molecules/ButtonAudio.vue'
import ButtonFileDownload from '@/components/molecules/ButtonFileDownload.vue'
import ChipFileSize from '@/components/atoms/ChipFileSize.vue'

export default createComponent({
  components: {
    BoxCallout,
    ButtonAudio,
    ButtonFileDownload,
    ChipFileSize
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
      type: Object as () => MessageSet & FirestoreFieldValue,
      required: true
    },

    isOwn: {
      type: Boolean,
      required: true
    }
  },

  setup() {
    return { mdiFileImage }
  }
})
</script>
