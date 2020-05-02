<template>
  <div style="padding:12px;">
    <v-row justify="start" no-gutters class="flex-nowrap">
      <v-col cols="auto" align-self="end">
        <v-avatar v-if="message.author.isAnonymous" color="grey" size="36">
          <v-icon>{{ mdiAccountCircle }}</v-icon>
        </v-avatar>

        <v-avatar v-else color="indigo" right size="36">
          <img :src="message.author.photoURL" alt="avatar" />
        </v-avatar>
      </v-col>

      <v-col class="ml-2" cols="auto">
        <template v-if="message.kind === 'TEXT'">
          <box-callout left>{{ message.text }}</box-callout>
        </template>

        <template v-else-if="message.kind === 'AUDIO'">
          <box-callout left>
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

        <template v-else-if="message.kind === 'IMAGE'">
          <box-callout left>
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
      </v-col>
      <v-col cols="auto" align-self="end">
        <message-timestamp :timestamp="message.createdAt" class="ml-2" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="auto">
        <user-name-anonymous v-if="message.author.isAnonymous" />
        <base-user-name v-else>{{ message.author.name }}</base-user-name>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { mdiAccountCircle, mdiFileImage } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import BaseUserName from '@/components/atoms/BaseUserName.vue'
import ChipFileSize from '@/components/atoms/ChipFileSize.vue'
import MessageTimestamp from '@/components/atoms/MessageTimestamp.vue'
import BoxCallout from '@/components/atoms/SpeechBalloon.vue'
import UserNameAnonymous from '@/components/atoms/UserNameAnonymous.vue'
import ButtonAudio from '@/components/molecules/ButtonAudio.vue'
import ButtonFileDownload from '@/components/molecules/ButtonFileDownload.vue'
import { Message } from '@/types/core'
export default defineComponent({
  components: {
    BoxCallout,
    ButtonAudio,
    ButtonFileDownload,
    ChipFileSize,
    UserNameAnonymous,
    MessageTimestamp,
    BaseUserName
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
