<template>
  <div class="fill-height">
    <the-rooms v-if="mobile" :rooms="rooms" @open:qrcode="qrcode" />

    <v-row
      v-else
      justify="center"
      align="center"
      class="fill-height flex-column grey--text"
    >
      <v-col cols="auto">
        <div class="display-1">Select Right</div>
      </v-col>
      <v-col class="pa-0" cols="auto">or</v-col>
      <v-col cols="auto">
        <ButtonCreateRoom top offset-x :login="login" @click="create" />
      </v-col>
    </v-row>

    <transition name="fade">
      <v-container v-if="!rooms.length && notFound" class="fill-height">
        <v-row justify="center" align="center" class="flex-column">
          <v-col cols="auto">
            <span class="display-1 grey--text">No Rooms</span>
          </v-col>
          <v-col cols="auto">
            <v-icon large>{{ mdiCommentQuestion }}</v-icon>
          </v-col>
        </v-row>
      </v-container>
    </transition>

    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.mdAndDown"
      max-width="600px"
      :hide-overlay="isOpenQrcode"
      :persistent="isOpenRoom"
      :transition="
        $vuetify.breakpoint.mdAndDown
          ? 'dialog-bottom-transition'
          : 'fab-transition'
      "
      @click:outside="isOpenQrcode ? onClickOutside() : ''"
    >
      <card-room-share v-if="isOpenQrcode" :url="text" @close="onClose" />
      <form-create-room v-if="isOpenRoom" @close="onClose" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { mdiCommentPlus, mdiCommentQuestion } from '@mdi/js'
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref
} from '@vue/composition-api'

import CardRoomShare from '@/components/molecules/CardRoomShare.vue'
import FormCreateRoom from '@/components/organisms/FormCreateRoom.vue'
import { wait } from '@/core/useTime'
import { publicRoom, user } from '@/store'
import { generateInviteURL } from '@/utils/firestore'
import { PublicRoom } from '~types/core'
export default defineComponent({
  head() {
    return {
      title: 'Public'
    }
  },

  layout: 'public',

  components: {
    TheRooms: () => import('@/components/organisms/TheRooms.vue'),
    ButtonCreateRoom: () =>
      import('@/components/molecules/ButtonCreateRoom.vue'),
    CardSigninPrompt: () =>
      import('@/components/molecules/CardSigninPrompt.vue'),
    CardRoomShare,
    FormCreateRoom
  },

  setup(_, { root }) {
    publicRoom.subscribe()
    const mobile = computed(() => {
      return (
        (root.$vuetify.breakpoint.mdAndDown && !!rooms.value.length) ||
        !notFound
      )
    })

    const TIMEOUT = 3000

    const notFound = ref(false)

    const dialog = ref(false)
    const isOpenQrcode = ref(false)
    const isOpenRoom = ref(false)

    const text = ref('')

    const rooms = computed(() => publicRoom.rooms)

    setTimeout(() => {
      if (!rooms.value.length) {
        notFound.value = true
      }
    }, TIMEOUT)

    const qrcode = (room: PublicRoom) => {
      text.value = generateInviteURL(room)
      isOpenQrcode.value = true
      dialog.value = true
    }

    const create = () => {
      dialog.value = true
      isOpenRoom.value = true
    }

    const onClickOutside = async () => {
      await wait(200)
      isOpenQrcode.value = false
      isOpenRoom.value = false
    }

    const onClose = async () => {
      dialog.value = false
      await wait(250)
      isOpenQrcode.value = false
      isOpenRoom.value = false
    }

    onMounted(() => {
      root.$nuxt.$on('close', create)
      root.$nuxt.$on('open:qrcode', qrcode)
    })

    onUnmounted(() => {
      root.$nuxt.$off(['close', 'open:qrcode'])
    })

    return {
      mdiCommentPlus,
      rooms,
      dialog,
      text,
      create,
      notFound,
      mdiCommentQuestion,
      qrcode,
      login: user.login,
      mobile,
      onClickOutside,
      isOpenQrcode,
      isOpenRoom,
      onClose
    }
  }
})
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s;
}
</style>
