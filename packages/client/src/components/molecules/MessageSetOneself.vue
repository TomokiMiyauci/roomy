<template>
  <v-row justify="end" no-gutters style="padding:12px;">
    <v-col cols="auto" align-self="end">
      <message-timestamp class="mr-2" :timestamp="message.createdAt" />
    </v-col>

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
          <v-row no-gutters style="padding-bottom:6px;">
            <v-col>
              <chip-file-size :size="message.size" />
            </v-col>
          </v-row>
          <v-row no-gutters justify="center">
            <v-col cols="auto">
              <button-audio :src="message.audioURL" />
            </v-col>
          </v-row>
          <v-row no-gutters justify="center" style="padding-top:6px;">
            <v-col cols="auto">
              <button-file-download :origin-url="message.audioURL" />
            </v-col>
          </v-row>
        </box-callout>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mdiAccountCircle, mdiFileImage } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import ChipFileSize from '@/components/atoms/ChipFileSize.vue'
import MessageTimestamp from '@/components/atoms/MessageTimestamp.vue'
import BoxCallout from '@/components/atoms/SpeechBalloon.vue'
import ButtonAudio from '@/components/molecules/ButtonAudio.vue'
import ButtonFileDownload from '@/components/molecules/ButtonFileDownload.vue'
import { Message } from '@/types/core'
export default defineComponent({
  components: {
    BoxCallout,
    ButtonAudio,
    ButtonFileDownload,
    ChipFileSize,
    MessageTimestamp
  },

  props: {
    message: {
      type: Object as () => Message,
      required: true
    }
  },

  setup() {
    return { mdiFileImage, mdiAccountCircle }
  }
})
</script>
