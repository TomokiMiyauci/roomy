<template>
  <v-container :class="{ 'fill-height': !isLoad }">
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
    </client-only>

    <client-only>
      <ButtonCreateRoom
        v-if="!mobile"
        :login="login"
        @click="create"
        fixed
        bottom
        right
      />
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

    <client-only>
      <v-subheader v-if="!mobile" inset>
        <v-icon left>{{ mdiChatAlert }}</v-icon
        >Recent</v-subheader
      >
    </client-only>

    <client-only>
      <carousel-rooms
        :rooms="rooms"
        v-if="!mobile && rooms.length"
        @open:qrcode="qrcode"
      />
    </client-only>
  </v-container>
</template>

<script lang="ts">
import {
  mdiChatAlert,
  mdiCheckCircle,
  mdiCommentPlus,
  mdiCommentQuestion
} from '@mdi/js'
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch
} from '@vue/composition-api'

import CardRoomShare from '@/components/molecules/CardRoomShare.vue'
import CardPublicRoom from '@/components/organisms/CardPublicRoom.vue'
import FormCreateRoom from '@/components/organisms/FormCreateRoom.vue'
import { wait } from '@/core/useTime'
import { getPublicRoomsLatest } from '@/repositories/publicRoom'
import { favoriteRoom, user, viewHistory } from '@/store'
import { generateInviteURL } from '@/utils/firestore'
import { PublicRoomMerged } from '~types/core'

export default defineComponent({
  head() {
    return {
      title: 'Public'
    }
  },

  layout({ isMobile }: any) {
    return isMobile ? 'mobile/publicRooms' : 'publicRooms'
  },

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
    FormUserProfile: () => import('@/components/organisms/FormUserProfile.vue'),
    CardPublicRoom,
    CarouselRooms: () => import('@/components/organisms/CarouselRooms.vue')
  },

  setup(_, { root }) {
    const rooms = ref<PublicRoomMerged[]>([])
    const isLoad = ref(false)

    onBeforeMount(async () => {
      const result = await getPublicRoomsLatest()
      isLoad.value = true
      result.docs.forEach(async (doc) => {
        rooms.value.push(await doc.data())
      })
    })

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

    // const rooms = computed(() => publicRoom.rooms)

    setTimeout(() => {
      if (!rooms.value.length) {
        notFound.value = true
      }
    }, TIMEOUT)

    const qrcode = (room: PublicRoomMerged) => {
      text.value = generateInviteURL(room.id!)
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
      onDecode,
      mdiChatAlert,
      isLoad
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
