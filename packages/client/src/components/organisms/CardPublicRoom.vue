<template>
  <v-card
    v-bind="$attrs"
    :to="`/public/${room.id}`"
    shaped
    raised
    nuxt
    color="primary"
    dark
  >
    <v-overlay :value="overlay" absolute>
      <SvgQrcode :text="room.name" />
      <button-close @click="overlay = false" />
    </v-overlay>
    <v-icon class="d-flex mx-auto" size="200px">{{ mdiNewBox }}</v-icon>
    <v-divider />
    <v-card-title>
      {{ room.name }}
      <v-spacer />
      <ButtonQrcode @click.prevent="overlay = true" />
    </v-card-title>
    <v-card-subtitle>
      <v-icon small left>{{ mdiChatProcessing }}</v-icon
      >{{ room.messageCount }}
    </v-card-subtitle>

    <v-card-text>
      <div>This is description</div>
      <v-subheader>
        <v-icon left>{{ mdiTagMultiple }}</v-icon
        >Tags</v-subheader
      >
      <v-row>
        <v-col v-for="tag in room.tags" :key="tag" cols="auto">
          <ChipTag :text="tag" color="grey" />
        </v-col>
      </v-row>

      <v-subheader>
        <v-icon left>{{ mdiChatProcessing }}</v-icon> Latest message
      </v-subheader>

      <v-list two-line class="v-card--shaped">
        <v-list-item :key="room.recent.shortMessage">
          <v-list-item-avatar>
            <v-icon>{{ mdiAccountCircle }}</v-icon>
            <!-- <v-im/g v-else :src="room.recent.author.photoURL" /> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>sfaff</v-list-item-title>
            <v-list-item-subtitle
              v-text="room.recent.shortMessage"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {
  mdiAccountCircle,
  mdiChatProcessing,
  mdiNewBox,
  mdiTagMultiple
} from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

import SvgQrcode from '@/components/atoms/SvgQrcode.vue'
import ButtonClose from '@/components/molecules/ButtonClose.vue'
import ButtonQrcode from '@/components/molecules/ButtonQrcode.vue'
import ChipTag from '@/components/molecules/ChipTag.vue'
import { PublicRoomMerged } from '~types/core'
export default defineComponent({
  props: {
    room: {
      type: Object as () => PublicRoomMerged,
      required: true
    }
  },

  components: {
    ChipTag,
    ButtonQrcode,
    ButtonClose,
    SvgQrcode
  },

  setup() {
    const overlay = ref(false)

    return {
      overlay,
      mdiNewBox,
      mdiChatProcessing,
      mdiTagMultiple,
      mdiAccountCircle
    }
  }
})
</script>
