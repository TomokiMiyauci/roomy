<template>
  <div class="fill-height">
    <client-only>
      <v-tabs-items v-if="$vuetify.breakpoint.mdAndDown" v-model="tabs">
        <v-tab-item>
          <the-rooms :rooms="rooms" @dialog:qrcode="o" />
        </v-tab-item>
        <v-tab-item>
          hello
        </v-tab-item>
      </v-tabs-items>
      <v-row
        v-else
        justify="center"
        align="center"
        class="fill-height flex-column grey-darken-1--text"
      >
        <v-col cols="auto">
          <div class="display-1">Select Right</div>
        </v-col>
        <v-col class="pa-0" cols="auto">or</v-col>
        <v-col cols="auto">
          <button-create-room @click="onCreate" :login="true" />
          <!-- <v-btn @click="dialog = true" fab color="primary">
            <v-icon>{{ mdiCommentPlus }}</v-icon>
          </v-btn> -->
        </v-col>
      </v-row>
    </client-only>

    <v-dialog
      :value="dialog"
      :fullscreen="$vuetify.breakpoint.mdAndDown"
      :transition="
        $vuetify.breakpoint.mdAndDown
          ? 'dialog-bottom-transition'
          : 'fab-transition'
      "
      max-width="600px"
      hide-overlay
    >
      <svg-qrcode v-if="url" :text="url" />

      <!-- <card-room-share :url="text" @close="dialog = false" /> -->
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { mdiCommentPlus } from '@mdi/js'
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs
} from '@vue/composition-api'

import ButtonCreateRoom from '@/components/molecules/ButtonCreateRoom.vue'
import TheRooms from '@/components/organisms/TheRooms.vue'
// import { useFirestore } from '@/core/useFirestore'
// import { roomReference } from '@/core/useFirestoreReference'
import { createRoom, getRoomKey, joinRoom } from '@/repositories/privateRoom'
import { privateRoom } from '@/store'

export default defineComponent({
  layout: 'private',

  components: {
    TheRooms,
    ButtonCreateRoom,
    SvgQrcode: () => import('@/components/atoms/SvgQrcode.vue'),
    CardRoomShare: () => import('@/components/molecules/CardRoomShare.vue')
  },

  setup(_, { root }) {
    const dialog = ref(false)
    const tabs = ref(0)

    const o = (room: any) => {
      text.value = `https://${process.env.AUTH_DOMAIN}/private/invite?roomId=${room.id}&key=${room.key}`
      dialog.value = true
    }

    const text = ref('')

    const newRoom = reactive({
      id: '',
      key: '',
      url: ''
    })

    onMounted(() => {
      root.$nuxt.$on('close', () => {
        dialog.value = true
      })

      root.$nuxt.$on('tab', (a: any) => {
        tabs.value = a
      })
    })

    onUnmounted(() => {
      root.$nuxt.$off(['close', 'tab'])
    })

    const roomURL = computed(() => {
      const url = `https://${process.env.AUTH_DOMAIN}/private/invite?roomId=${newRoom.id}&key=${newRoom.key}`
      return url
    })

    privateRoom.subscribe()
    const rooms = computed(() => privateRoom.rooms)

    const create = async () => {
      const { id } = await createRoom()
      const key = await getRoomKey(id)
      newRoom.key = key
      newRoom.id = id
    }

    const onCreate = async () => {
      dialog.value = true
      const { id } = await createRoom()
      await joinRoom(id, true)
      const key = await getRoomKey(id)
      const inviteURL = `https://${process.env.AUTH_DOMAIN}/private/invite?roomId=${id}&key=${key}`

      newRoom.url = inviteURL
    }

    return {
      ...toRefs(newRoom),
      rooms,
      mdiCommentPlus,
      dialog,
      create,
      roomURL,
      o,
      text,
      tabs,
      createRoom,
      onCreate
    }
  }
})
</script>
