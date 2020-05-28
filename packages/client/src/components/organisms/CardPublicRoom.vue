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
    <v-img
      v-if="room.photoURL"
      :src="room.photoURL"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      aspect-ratio="1"
      max-width="500px"
      max-height="200px"
      alt="room"
    />
    <v-icon v-else class="d-flex mx-auto" size="200px">{{ mdiNewBox }}</v-icon>
    <v-divider />
    <v-overlay :value="overlay" absolute>
      <SvgQrcode :text="room.name" />
      <button-close @click="overlay = false" />
    </v-overlay>
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
      <div v-if="room.description">
        <v-icon left>{{ mdiBookInformationVariant }}</v-icon
        >{{ room.description }}
      </div>
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
            <AvatarWrapper
              :displayName="
                room.recent.author.isAnonymous
                  ? ''
                  : room.recent.author.displayName
              "
              :photoURL="
                room.recent.author.isAnonymous
                  ? ''
                  : room.recent.author.photoURL
              "
              :login="!room.recent.author.isAnonymous"
            />
            <!-- <v-im/g v-else :src="room.recent.author.photoURL" /> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              room.recent.author.isAnonymous
                ? ''
                : room.recent.author.displayName
            }}</v-list-item-title>
            <v-list-item-subtitle
              v-text="room.recent.shortMessage"
            ></v-list-item-subtitle>
          </v-list-item-content>

          <chip-date :unixtime="room.recent.updatedAt.seconds" format="dddd" />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import {
  mdiAccountCircle,
  mdiBookInformationVariant,
  mdiChatProcessing,
  mdiNewBox,
  mdiTagMultiple
} from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

import ChipDate from '@/components/atoms/ChipDate.vue'
import SvgQrcode from '@/components/atoms/SvgQrcode.vue'
import AvatarWrapper from '@/components/molecules/AvatarWrapper.vue'
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
    SvgQrcode,
    AvatarWrapper,
    ChipDate
  },

  setup() {
    const overlay = ref(false)

    return {
      overlay,
      mdiNewBox,
      mdiChatProcessing,
      mdiTagMultiple,
      mdiAccountCircle,
      mdiBookInformationVariant
    }
  }
})
</script>
