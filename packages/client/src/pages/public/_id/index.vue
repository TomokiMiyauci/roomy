<template>
  <div class="fill-height">
    <v-bottom-sheet v-model="sheet">
      <recording-studio @close="onClose" />
    </v-bottom-sheet>
    <v-row class="fill-height" no-gutters>
      <v-col :cols="streams.length && !$vuetify.breakpoint.mdAndDown ? 9 : 12">
        <Promised :promise="asyncState">
          <template #pending>
            <SkeletonLoaderMessageSet
              v-for="i in 10"
              :key="i"
              class="pb-4"
            ></SkeletonLoaderMessageSet>
          </template>
          <template #default>
            <v-container v-if="!messages.length" class="fill-height pa-10">
              <v-row key="suggest" align="center" class="flex-column">
                <v-col cols="auto">
                  <v-icon size="50">{{ mdiCommentProcessing }}</v-icon>
                </v-col>

                <v-col cols="auto">
                  <span class="display-1 grey-darken-1--text">No message </span>
                </v-col>
              </v-row>
            </v-container>

            <v-container v-else style="padding-bottom:62px;">
              <v-row class="flex-column">
                <v-col>
                  <transition-group
                    :css="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    name="list"
                    appear
                  >
                    <template v-for="(message, index) in messages">
                      <v-row
                        v-if="
                          index !== 0 &&
                            message.createdAt &&
                            !dayjs(
                              messages[index - 1].createdAt.seconds * 1000
                            ).isSame(message.createdAt.seconds * 1000, 'day')
                        "
                        :key="message.id + 4"
                        style="border-top:1px solid grey;"
                        justify="center"
                      >
                        <v-col cols="auto" align-self="center">
                          <chip-date
                            :unixtime="message.createdAt.seconds * 1000"
                            format="YYYY-MM-DD"
                          />
                        </v-col>
                      </v-row>

                      <message-set
                        :key="message.id"
                        :message="message"
                        :is-own="isOwn(message)"
                      />
                      <v-divider
                        v-show="!$vuetify.breakpoint.mdAndDown"
                        :key="`${index}divider`"
                      />
                    </template>
                  </transition-group>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </Promised>
      </v-col>
      <Promised v-if="!$vuetify.breakpoint.mdAndDown" :promise="asyncStream">
        <template #pending> </template>
        <template #default>
          <v-col
            v-if="streams.length"
            style="height:calc(100vh - 126px);overflow-y:scroll;border-right:1px solid grey;border-left:1px solid grey;border-radius: 5px;"
            cols="3"
          >
            <v-subheader
              style="position:sticky;top:0;z-index:5;background-color:grey;"
            >
              <v-icon left>{{ mdiMessageVideo }}</v-icon>
              Video Chat
              <v-spacer />
              <v-btn color="secondary" raised><mdi-eye left />View All</v-btn>
            </v-subheader>
            <v-card
              v-for="i in streams"
              :to="`${$route.params.id}/${i.id}`"
              :key="i.id"
              min-width="200"
              min-height="200"
              class="ma-5"
            >
              <v-card-title>
                {{ i.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </template>
      </Promised>
    </v-row>

    <v-dialog
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.mdAndDown"
      :transition="
        $vuetify.breakpoint.mdAndDown
          ? 'dialog-bottom-transition'
          : 'fab-transition'
      "
      max-width="600px"
      hide-overlay
    >
      <card-create-stream
        v-if="dialogState === 'video'"
        @close="onCloseDialog"
      />
      <card-room-share
        v-else-if="dialogState === 'create'"
        :url="text"
        @close="dialog = false"
      />
    </v-dialog>

    <div
      :style="{
        width: $vuetify.breakpoint.mdAndDown ? '100%' : 'calc(75% - 56px)'
      }"
      style="position:fixed;bottom:0;background-color:rgb(255,255,255);"
    >
      <the-post @postend="onPostend" @audio="sheet = true" />
      <v-dialog
        v-if="login"
        v-model="d"
        max-width="600px"
        transition="slide-x-transition"
      >
        <template #activator="{on}">
          <v-btn
            v-on="on"
            color="primary"
            dark
            absolute
            fab
            small
            style="bottom:160px"
            right
            ><v-icon>{{ mdiPhoneRing }}</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-toolbar color="primary">
            <button-close @click="d = false" color="secondary" />
            <v-toolbar-title class="white--text"
              >New Stream Room</v-toolbar-title
            >
          </v-toolbar>
          <v-card-title>
            Stream Room Name
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="roomName"
              outlined
              value="Room1"
              label="Stream Room Name"
            />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn @click="create" color="primary">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn
        @click="onFavor"
        v-if="login"
        color="pink"
        dark
        absolute
        fab
        small
        style="bottom:95px"
        right
        ><v-icon>{{ mdiHeart }}</v-icon></v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import {
  mdiAlertCircleOutline,
  mdiCheckboxBlank,
  mdiCheckBoxOutline,
  mdiCommentProcessing,
  mdiHeart,
  mdiMessageVideo,
  mdiMicrophone,
  mdiMicrophoneSettings,
  mdiPhoneRing
} from '@mdi/js'
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  watch
} from '@vue/composition-api'
import dayjs from 'dayjs'
import { gsap } from 'gsap'
import { Promised } from 'vue-promised'

import CardCreateStream from '@/components/organisms/CardCreateStream.vue'
import { useFirestore } from '@/core/useFirestore'
import { messageReference } from '@/core/useFirestoreReference'
import { firestore } from '@/plugins/firebase'
import { enterRoom, favor } from '@/repositories/users'
import { publicRoom, reference, user, viewHistory } from '@/store'
import { generateInviteURL, isOwn } from '@/utils/firestore'
import { Message, PublicRoom } from '~types/core'
export default defineComponent({
  head() {
    return {
      title: 'Public'
    }
  },

  layout: 'public-chat',

  transition: 'slide-in',

  components: {
    ButtonImage: () => import('@/components/molecules/ButtonImage.vue'),
    ButtonClose: () => import('@/components/molecules/ButtonClose.vue'),
    BoxCallout: () => import('@/components/atoms/SpeechBalloon.vue'),
    MessageSet: () => import('@/components/molecules/MessageSet.vue'),
    ThePost: () => import('@/components/organisms/ThePost.vue'),
    RecordingStudio: () => import('@/components/molecules/RecordingStudio.vue'),
    BaseChip: () => import('@/components/atoms/BaseChip.vue'),
    ChipDate: () => import('@/components/atoms/ChipDate.vue'),
    SkeletonLoaderMessageSet: () =>
      import('@/components/molecules/SkeletonLoaderMessageSet.vue'),
    CardRoomShare: () => import('@/components/molecules/CardRoomShare.vue'),
    MdiEye: () => import('@/components/atoms/icons/MdiEye.vue'),
    CardCreateStream,
    Promised
  },

  setup(_, { root }) {
    reference.setRoomId(root.$route.params.id)
    publicRoom.subscribe()
    if (user.login) {
      viewHistory.subscribe()
      enterRoom(root.$route.params.id)
    }

    const sheet = ref(false)
    const dialog = ref(false)
    const text = ref('')
    const dialogState = ref<'video' | 'create' | ''>('')

    const { collectionRef } = messageReference()

    const { dataRef: messages, asyncState } = useFirestore<Message>(
      collectionRef.value.orderBy('createdAt', 'asc')
    )

    const { dataRef: streams, asyncState: asyncStream } = useFirestore(
      firestore
        .collection('public-rooms')
        .doc(root.$route.params.id)
        .collection('streams')
    )

    const videos = ref(100)
    const roomName = ref('Room1')

    const beforeEnter = (el: HTMLLIElement) => {
      el.style.opacity = '0'
      el.style.transform = 'translateX(50px)'
    }

    const onClose = async () => {
      sheet.value = false
      await onPostend()
    }

    const enter = (el: HTMLLIElement, done: () => {}) => {
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        translateX: 0,
        scale: 1,
        onComplete: done,
        stagger: 0.5
      })
    }

    const qrcode = (room: PublicRoom & { id: string }) => {
      text.value = generateInviteURL(room.id)
      dialog.value = true
    }

    const onFavor = async () => {
      await favor()
    }

    const onCloseDialog = (): void => {
      dialog.value = false
    }

    const create = () => {
      return firestore
        .collection('public-rooms')
        .doc(root.$route.params.id)
        .collection('streams')
        .add({ name: roomName.value })
    }

    watch(dialog, (now) => {
      if (!now) {
        setTimeout(() => {
          dialogState.value = ''
        }, 300)
      }
    })

    const onCreateVideo = () => {
      // dialogState.value = 'video'
      // dialog.value = true
      root.$router.push(`${root.$route.params.id}/stream`)
    }

    const onPostend = async () => {
      await root.$nextTick()
      scrollTo(0, document.body.clientHeight)
    }

    onMounted(() => {
      root.$nuxt.$on('open:qrcode', qrcode)
    })

    onUnmounted(() => {
      root.$nuxt.$off(['open:qrcode'])
    })

    const d = ref(false)

    return {
      onCloseDialog,
      dialogState,
      onCreateVideo,
      mdiAlertCircleOutline,
      mdiCheckBoxOutline,
      mdiCheckboxBlank,
      mdiPhoneRing,
      onClose,
      messages,
      sheet,
      beforeEnter,
      enter,
      mdiMicrophone,
      mdiMicrophoneSettings,
      mdiMessageVideo,
      onPostend,
      dayjs,
      isOwn,
      dialog,
      text,
      mdiCommentProcessing,
      mdiHeart,
      login: user.login,
      onFavor,
      asyncState,
      videos,
      create,
      streams,
      asyncStream,
      roomName,
      d
    }
  }
})
</script>
