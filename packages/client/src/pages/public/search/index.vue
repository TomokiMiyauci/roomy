<template>
  <v-container>
    <div v-if="!rooms.length">No hits {{ q }} .</div>
    <v-subheader>Public Rooms</v-subheader>
    <v-row>
      <v-col v-for="room in rooms" :key="room.id">
        <card-public-room :room="room" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'

import CardPublicRoom from '@/components/organisms/CardPublicRoom.vue'
import { getPublicRooms } from '@/repositories/publicRoom'
import { PublicRoomMerged } from '~types/core'
export default defineComponent({
  watchQuery: ['q'],

  components: {
    CardPublicRoom
  },

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

    onBeforeMount(async () => {
      const keyword = root.$route.query.q as string

      const result = await getPublicRooms(keyword)

      result.docs.forEach(async (doc) => {
        const publicRoom = await doc.data()

        rooms.value.push(publicRoom)
      })
    })

    return {
      rooms,
      q: root.$route.query.q
    }
  }
})
</script>
