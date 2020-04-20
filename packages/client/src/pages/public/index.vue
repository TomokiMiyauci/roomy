<template>
  <div class="fill-height">
    <client-only>
      <template v-if="$vuetify.breakpoint.mdAndDown">
        <the-rooms
          v-if="rooms.length || !notFound"
          :rooms="rooms"
          @open:qrcode="qrcode"
        />
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
      </template>
    </client-only>

    <client-only>
      <template v-if="!$vuetify.breakpoint.mdAndDown">
        <v-row
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
            <!-- <v-menu>
              <template #activator="{ on }">
                <v-btn color="success" @click="on.click">text</v-btn>
              </template>
              <p>heljo</p>
            </v-menu> -->
          </v-col>
        </v-row>
      </template>
    </client-only>

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

    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="create">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card class="mx-auto" max-width="600">
          <v-card-title class="title font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar
              color="primary lighten-2"
              class="subheading white--text"
              size="24"
              v-text="step"
            ></v-avatar>
          </v-card-title>

          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <v-text-field
                  label="Email"
                  value="john@vuetifyjs.com"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  This is the email you will use to login to your Vuetify
                  account
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field label="Password" type="password"></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  type="password"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  Please enter a password for your account
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                ></v-img>
                <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
                <span class="caption grey--text">Thanks for signing up!</span>
              </div>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn :disabled="step === 1" text @click="step--">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="step === 3"
              color="primary"
              depressed
              @click="step++"
            >
              Next
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
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
  reactive,
  ref
} from '@vue/composition-api'

import ButtonCreateRoom from '@/components/molecules/ButtonCreateRoom.vue'
import TheRooms from '@/components/organisms/TheRooms.vue'
import { useFirestore } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { createPublicRoom } from '@/repositories/room'
import { user } from '@/store'
import { generateInviteURL } from '@/utils/firestore'
export default defineComponent({
  layout: 'public',

  components: {
    TheRooms,
    ButtonCreateRoom,
    CardSigninPrompt: () =>
      import('@/components/molecules/CardSigninPrompt.vue'),
    CardRoomShare: () => import('@/components/molecules/CardRoomShare.vue')
  },

  setup(_, { root }) {
    const { collectionRef } = roomReference()

    const TIMEOUT = 3000

    const step = ref(1)

    const currentTitle = computed(() => {
      switch (step.value) {
        case 1:
          return 'Sign-up'
        case 2:
          return 'Create a password'
        default:
          return 'Account created'
      }
    })

    const notFound = ref(false)

    const dialog = ref(false)
    const open = ref(false)

    const text = ref('')

    const rooms = useFirestore(
      collectionRef.value
        .where('isPrivate', '==', false)
        .orderBy('recent.updatedAt', 'desc')
    )

    setTimeout(() => {
      if (!rooms.value.length) {
        notFound.value = true
      }
    }, TIMEOUT)

    const newRoom = reactive({
      id: '',
      key: '1'
    })

    const qrcode = (room: any) => {
      text.value = generateInviteURL(room)
      console.log(room)

      open.value = true
    }

    onMounted(() => {
      root.$nuxt.$on('close', () => {
        dialog.value = true
        create()
      })

      root.$nuxt.$on('open:qrcode', (room: any) => {
        qrcode(room)
      })
    })

    onUnmounted(() => {
      root.$nuxt.$off(['close', 'open:qrcode'])
    })

    const create = async () => {
      await createPublicRoom()
    }

    const onClick = () => {
      alert()
    }

    return {
      rooms,
      mdiCommentPlus,
      dialog,
      open,
      text,
      create,
      newRoom,
      notFound,
      mdiCommentQuestion,
      currentTitle,
      step,
      qrcode,
      onClick,
      login: user.login
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
