<template>
  <div>
    <v-row no-gutters class="flex-nowrap">
      <v-col cols="auto" align-self="end">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
      </v-col>
      <v-col class="ml-2" cols="auto">
        <speech-balloon
          style="background-color:rgba(0,0,0,0.12);cursor: progress;"
          left
          >{{ text }}</speech-balloon
        >
      </v-col>

      <v-col cols="auto" align-self="end">
        <v-skeleton-loader class="ml-2" type="chip" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <v-skeleton-loader width="80px" type="text" />
      </v-col>
    </v-row>
    <v-divider v-show="!$vuetify.breakpoint.mdAndDown" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import MessageTimestamp from '@/components/atoms/MessageTimestamp.vue'
import SpeechBalloon from '@/components/atoms/SpeechBalloon.vue'
export default defineComponent({
  components: {
    SpeechBalloon,
    MessageTimestamp
  },

  setup() {
    return {
      text: '　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　'
    }
  }
})
</script>
