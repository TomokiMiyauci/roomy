<template>
  <v-list-item
    @mouseenter.prevent.stop="state = true"
    @mouseleave.prevent.stop="state = false"
    @focus.prevent.stop="state = true"
    @blur.prevent.stop="state = false"
    :to="`/public/${room.id}`"
    color="primary"
  >
    <v-list-item-avatar tile>
      <v-img v-if="room.photoURL" :src="room.photoURL" color="primary"></v-img>
      <v-icon v-else color="primary">{{ mdiNewBox }}</v-icon>
    </v-list-item-avatar>

    <v-list-item-content class="pt-1 pb-1">
      <v-list-item-title>
        {{ room.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <v-avatar color="grey" size="24">
          <v-icon v-if="room.recent.author.isAnonymous">{{
            mdiAccountCircle
          }}</v-icon>
          <img v-else :src="room.recent.author.photoURL" alt="user image" />
        </v-avatar>
        {{ room.recent.shortMessage }}
      </v-list-item-subtitle>
      <transition name="slide-x-transition">
        <div v-if="state">
          <v-icon small left>{{ mdiChatProcessing }}</v-icon
          >{{ room.messageCount }}
        </div>
      </transition>
    </v-list-item-content>
    <v-list-item-action v-if="'messageDiff' in room && room.messageDiff">
      <v-avatar color="primary" size="26">
        <span class="white--text">{{ room.messageDiff }}</span>
      </v-avatar>
    </v-list-item-action>

    <v-list-item-action> </v-list-item-action>

    <v-list-item-action>
      <span
        class="grey-darken-1--text caption"
        style="position:absolute;bottom:0;"
        >{{ room.recent.updatedAt | time }}</span
      >
      <v-btn @click.prevent="$emit('click:qrcode')" aria-label="qrcode" icon>
        <v-icon color="grey lighten-1">{{ mdiQrcode }}</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import {
  mdiAccountCircle,
  mdiChatProcessing,
  mdiNewBox,
  mdiQrcode
} from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'
import dayjs from 'dayjs'

import { PublicRoom } from '~types/core'
export default defineComponent({
  filters: {
    time(timestamp: { seconds: number }) {
      if (!timestamp) {
        return
      }
      dayjs.locale('en')

      return dayjs(timestamp.seconds * 1000).format('dddd')
    }
  },

  props: {
    room: {
      type: Object as () => PublicRoom & { id: string },
      required: true
    }
  },

  setup() {
    const state = ref(false)
    return {
      mdiNewBox,
      mdiAccountCircle,
      mdiQrcode,
      mdiChatProcessing,
      state
    }
  }
})
</script>
