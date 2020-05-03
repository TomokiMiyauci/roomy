<template>
  <div class="fill-height">
    <v-snackbar
      @input="reset"
      v-model="snackbar"
      color="secondary"
      absolute
      top
    >
      <v-icon color="green">{{ mdiCheckCircle }}</v-icon
      >Success!Signed In
      <v-btn @click="snackbar = false" text>
        Close
      </v-btn>
    </v-snackbar>

    <client-only>
      <template v-if="$vuetify.breakpoint.mdAndDown">
        <transition v-if="notFound && !rooms.length" name="fade">
          <v-container v-if="notFound && !rooms.length" class="fill-height">
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

        <the-rooms v-else :rooms="rooms" @open:qrcode="qrcode" />
      </template>

      <v-row
        v-else
        justify="center"
        align="center"
        class="fill-height flex-column grey--text"
      >
        <v-col cols="auto">
          <div class="display-1">
            <client-only>
              <vue-typer :text="['Welcome to Public Room', 'Select Right']" />
            </client-only>
          </div>
        </v-col>
        <v-col class="pa-0" cols="auto">or</v-col>
        <v-col cols="auto">
          <ButtonCreateRoom :login="login" @click="create" top offset-x />
        </v-col>
      </v-row>
    </client-only>

    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.mdAndDown"
      :hide-overlay="isOpenQrcode"
      :persistent="isOpenRoom"
      :transition="
        $vuetify.breakpoint.mdAndDown
          ? 'dialog-bottom-transition'
          : 'fab-transition'
      "
      @click:outside="isOpenQrcode ? onClickOutside() : ''"
      max-width="600px"
    >
      <card-room-share v-if="isOpenQrcode" :url="text" @close="onClose" />
      <form-create-room v-if="isOpenRoom" @close="onClose" />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { mdiCheckCircle, mdiCommentPlus, mdiCommentQuestion } from '@mdi/js'
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch
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
      return root.$vuetify.breakpoint.mdAndDown && notFound
    })

    const TIMEOUT = 3000

    const notFound = ref(false)

    const dialog = ref(false)
    const isOpenQrcode = ref(false)
    const isOpenRoom = ref(false)

    const snackbar = ref(false)

    watch(
      () => user.successfulSignIn,
      (now) => {
        if (now) {
          console.log(now)
          snackbar.value = true
        }
      }
    )

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
      await wait(300)
      isOpenQrcode.value = false
      isOpenRoom.value = false
    }

    const onClose = async () => {
      dialog.value = false
      await wait(300)
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
      onClose,
      snackbar,
      reset: user.resetSuccessfulSignIn,
      mdiCheckCircle
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
