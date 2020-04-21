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
      v-model="open"
      :fullscreen="$vuetify.breakpoint.mdAndDown"
      max-width="600px"
      hide-overlay
      :transition="
        $vuetify.breakpoint.mdAndDown
          ? 'dialog-bottom-transition'
          : 'fab-transition'
      "
    >
      <card-room-share :url="text" @close="open = false" />
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

import { useFirestore } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { createPublicRoom } from '@/repositories/room'
import { user } from '@/store'
import { generateInviteURL } from '@/utils/firestore'
import { PublicRoom } from '~types/core'
export default defineComponent({
  layout: 'public',

  components: {
    TheRooms: () => import('@/components/organisms/TheRooms.vue'),
    ButtonCreateRoom: () =>
      import('@/components/molecules/ButtonCreateRoom.vue'),
    CardSigninPrompt: () =>
      import('@/components/molecules/CardSigninPrompt.vue'),
    CardRoomShare: () => import('@/components/molecules/CardRoomShare.vue')
  },

  setup(_, { root }) {
    const mobile = computed(() => {
      return (
        (root.$vuetify.breakpoint.mdAndDown && !!rooms.value.length) ||
        !notFound
      )
    })
    const { collectionRef } = roomReference()

    const TIMEOUT = 3000

    const notFound = ref(false)

    const dialog = ref(false)
    const open = ref(false)

    const text = ref('')

    const rooms = useFirestore<PublicRoom>(
      collectionRef.value
        .where('isPrivate', '==', false)
        .orderBy('recent.updatedAt', 'desc')
    )

    setTimeout(() => {
      if (!rooms.value.length) {
        notFound.value = true
      }
    }, TIMEOUT)

    const qrcode = (room: PublicRoom) => {
      text.value = generateInviteURL(room)
      open.value = true
    }

    const create = async () => {
      dialog.value = true
      await createPublicRoom()
    }

    onMounted(() => {
      root.$nuxt.$on('close', create)
      root.$nuxt.$on('open:qrcode', qrcode)
    })

    onUnmounted(() => {
      root.$nuxt.$off(['close', 'open:qrcode'])
    })

    return {
      rooms,
      mdiCommentPlus,
      dialog,
      open,
      text,
      create,
      notFound,
      mdiCommentQuestion,
      qrcode,
      login: user.login,
      mobile
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
