<template>
  <v-container>
    <div v-if="!rooms.length">No hits {{ q }} .</div>
    <v-subheader>Public Rooms</v-subheader>
    <v-row>
      <v-col v-for="room in rooms" :key="room.id">
        <v-card :to="room.id" shaped raised nuxt color="primary" dark>
          <v-overlay :value="overlay" absolute>
            <SvgQrcode :text="room.name" />
            <button-close @click="overlay = false" />
          </v-overlay>
          <v-icon class="d-flex mx-auto" size="200px">{{ mdiNewBox }}</v-icon>
          <v-divider />
          <v-card-title>
            {{ room.name }}
            <v-spacer />
            <ButtonQrcode @click="overlay = true" />
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  mdiAccountCircle,
  mdiChatProcessing,
  mdiNewBox,
  mdiTagMultiple
} from '@mdi/js'
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'

import SvgQrcode from '@/components/atoms/SvgQrcode.vue'
import ButtonClose from '@/components/molecules/ButtonClose.vue'
import ButtonQrcode from '@/components/molecules/ButtonQrcode.vue'
import ChipTag from '@/components/molecules/ChipTag.vue'
import { getPublicRooms } from '@/repositories/publicRoom'
import { PublicRoomMerged } from '~types/core'
export default defineComponent({
  components: {
    ChipTag,
    ButtonQrcode,
    ButtonClose,
    SvgQrcode
  },

  watchQuery: ['q'],

  // validate() {
  //   console.log(query)
  //   if ('q' in query) {
  //     return true
  //   }

  //   redirect('/public')
  //   return false
  // },

  layout: 'publicRooms',

  setup(_, { root }) {
    const rooms = ref<PublicRoomMerged[]>([])
    const overlay = ref(false)

    onBeforeMount(async () => {
      const keyword = root.$route.query.q as string

      const result = await getPublicRooms(keyword)

      result.docs.forEach(async (doc) => {
        rooms.value.push(await doc.data())
      })
    })

    return {
      rooms,
      q: root.$route.query.q,
      mdiNewBox,
      mdiChatProcessing,
      mdiTagMultiple,
      mdiAccountCircle,
      overlay
    }
  }
})
</script>
