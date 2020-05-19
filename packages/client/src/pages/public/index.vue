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
                <span class="display-1 grey-darken-1--text">No Rooms</span>
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
        class="fill-height flex-column grey-darken-1--text"
      >
        <v-col cols="auto">
          <div class="display-1">
            <client-only>
              <vue-typer
                :text="['Welcome to Public Room', 'Select Right']"
                erase-style="backspace"
              />
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
      @click:outside="isOpenQrcode || isOpenScan ? onClickOutside() : ''"
      max-width="600px"
    >
      <card-room-share v-if="isOpenQrcode" :url="text" @close="onClose" />
      <form-create-room v-else-if="isOpenRoom" @close="onClose" />
      <CardQrcodeScanner
        @close="onClose"
        @decode="onDecode"
        v-else-if="isOpenScan"
      />
      <form-user-profile :displayName="displayName" v-else-if="isOpenEdit" />
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
import { favoriteRoom, publicRoom, user, viewHistory } from '@/store'
import { generateInviteURL } from '@/utils/firestore'
import { PublicRoom } from '~types/core'
export default defineComponent({
  head() {
    return {
      title: 'Public'
    }
  },

  layout: 'publicRooms',

  components: {
    TheRooms: () => import('@/components/organisms/TheRooms.vue'),
    ButtonCreateRoom: () =>
      import('@/components/molecules/ButtonCreateRoom.vue'),
    CardSigninPrompt: () =>
      import('@/components/molecules/CardSigninPrompt.vue'),
    CardRoomShare,
    FormCreateRoom,
    CardQrcodeScanner: () =>
      import('@/components/organisms/CardQrcodeScanner.vue'),
    FormUserProfile: () => import('@/components/organisms/FormUserProfile.vue')
  },

  setup(_, { root }) {
    publicRoom.subscribe()
    console.log(user.login)

    if (user.login) {
      viewHistory.subscribe()
      favoriteRoom.subscribe()
    }
    const mobile = computed(() => {
      return root.$vuetify.breakpoint.mdAndDown && notFound
    })

    const TIMEOUT = 3000

    const notFound = ref(false)

    const dialog = ref(false)
    const isOpenQrcode = ref(false)
    const isOpenRoom = ref(false)
    const isOpenScan = ref(false)
    const isOpenEdit = ref(false)

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

    const qrcode = (room: PublicRoom & { id: string }) => {
      text.value = generateInviteURL(room.id)
      isOpenQrcode.value = true
      dialog.value = true
    }

    const create = () => {
      isOpenRoom.value = true
      dialog.value = true
    }

    const scan = () => {
      isOpenScan.value = true
      dialog.value = true
    }

    const edit = () => {
      isOpenEdit.value = true
      dialog.value = true
    }

    const onClickOutside = async () => {
      await wait(300)
      isOpenQrcode.value = false
      isOpenRoom.value = false
      isOpenScan.value = false
      isOpenEdit.value = false
    }

    const onClose = async () => {
      dialog.value = false
      await wait(300)
      isOpenQrcode.value = false
      isOpenRoom.value = false
      isOpenScan.value = false
      isOpenEdit.value = false
    }

    const onDecode = async (url: string): Promise<void> => {
      console.log(url)

      dialog.value = false
      await wait(300)
      isOpenScan.value = false

      root.$router.push(`public/${url.split('/').slice(-1)[0]}`)
    }

    onMounted(() => {
      root.$nuxt.$on('close', create)
      root.$nuxt.$on('open:qrcode', qrcode)
      root.$nuxt.$on('scan', scan)
      root.$nuxt.$on('edit', edit)
    })

    onUnmounted(() => {
      root.$nuxt.$off(['close', 'open:qrcode', 'scan', 'edit'])
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
      displayName: user.displayName,
      mobile,
      onClickOutside,
      isOpenQrcode,
      isOpenRoom,
      isOpenScan,
      isOpenEdit,
      onClose,
      snackbar,
      reset: user.resetSuccessfulSignIn,
      mdiCheckCircle,
      onDecode
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

<style>
@keyframes rocking {
  0%,
  100% {
    transform: rotateZ(-10deg);
  }
  50% {
    transform: rotateZ(10deg);
  }
}

.vue-typer {
  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
}
.vue-typer .custom.char.typed {
  color: #009688;
}
.vue-typer .custom.char.selected {
  color: #e91e63;
}

.vue-typer .custom.caret {
  animation: rocking 1s ease-in-out 0s infinite;
}
.vue-typer .custom.caret.typing {
  background-color: #009688;
}
.vue-typer .custom.caret.selecting {
  display: inline-block;
  background-color: #e91e63;
}
</style>
