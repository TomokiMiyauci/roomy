<template>
  <div class="fill-height">
    <v-tabs-items v-model="tabRef">
      <v-tab-item value="message">
        <v-bottom-sheet v-model="sheet">
          <recording-studio @close="onCloseSheet" />
        </v-bottom-sheet>
        <v-row class="fill-height" no-gutters>
          <v-col
            :cols="streams.length && !$vuetify.breakpoint.mdAndDown ? 9 : 12"
          >
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
                      <span class="display-1 grey-darken-1--text"
                        >No message
                      </span>
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
                                ).isSame(
                                  message.createdAt.seconds * 1000,
                                  'day'
                                )
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
          <Promised
            v-if="!$vuetify.breakpoint.mdAndDown"
            :promise="asyncStream"
          >
            <template #pending>
              <v-progress-circular
                :width="3"
                color="red"
                indeterminate
              ></v-progress-circular>
            </template>
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
                  <v-btn color="secondary" raised
                    ><mdi-eye left />View All</v-btn
                  >
                </v-subheader>
                <v-card
                  v-for="i in streams"
                  @click="onJoin"
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
          <card-create-stream v-if="dialogState === 'video'" @close="onClose" />
          <card-room-share
            v-else-if="dialogState === 'create'"
            :url="text"
            @close="onClose"
          />

          <card-media-stream
            v-else-if="dialogState === 'stream'"
            @close="onClose"
            :minHeight="$vuetify.breakpoint.mdAndDown ? '100%' : '400px'"
          />
        </v-dialog>
        <v-dialog
          v-model="isShowLocal"
          transition="scale-transition"
          origin="bottom right"
          max-width="600px"
        >
          <v-card>
            <video-player :stream="stream" scope="LOCAL" />
          </v-card>
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
            fullscreen
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
        <transition name="fa">
          <div
            v-if="isShowGlobal"
            class="ma-3"
            style="position:fixed;right:0;bottom:0;z-index:10;min-width:300px;min-height:200px;background-color:black;border:1px solid grey;border-radius:5px;"
          >
            <video-player :stream="stream" scope="GLOBAL" />
          </div>
        </transition>
      </v-tab-item>
      <v-tab-item value="stream">
        <Promised v-if="$vuetify.breakpoint.mdAndDown" :promise="asyncStream">
          <template #pending>
            <v-progress-circular
              :width="3"
              color="red"
              indeterminate
            ></v-progress-circular>
          </template>
          <template #default>
            <v-col cols="3">
              <v-card
                v-for="i in streams"
                @click="onJoin"
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
      </v-tab-item>
    </v-tabs-items>
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
  computed,
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
import { wait } from '@/core/useTime'
import { firestore } from '@/plugins/firebase'
import { enterRoom, favor } from '@/repositories/users'
import { publicRoom, reference, user, userMedia, viewHistory } from '@/store'
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
    CardMediaStream: () => import('@/components/organisms/CardMediaStream.vue'),
    MdiEye: () => import('@/components/atoms/icons/MdiEye.vue'),
    CardCreateStream,
    Promised,
    VideoPlayer: () => import('@/components/organisms/VideoPlayer.vue')
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
    const dialogState = ref<'video' | 'create' | 'stream' | ''>('')

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

    const onCloseSheet = async () => {
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

    const onClose = (): void => {
      dialog.value = false
    }

    const create = () => {
      return firestore
        .collection('public-rooms')
        .doc(root.$route.params.id)
        .collection('streams')
        .add({ name: roomName.value })
    }

    const onCreateVideo = () => {
      root.$router.push(`${root.$route.params.id}/stream`)
    }

    const onPostend = async () => {
      await root.$nextTick()
      scrollTo(0, document.body.clientHeight)
    }

    const tabRef = ref('message')

    onMounted(() => {
      root.$nuxt.$on('open:qrcode', qrcode)
      root.$nuxt.$on('tabchange', (tab: 'message' | 'stream') => {
        tabRef.value = tab
      })
    })

    onUnmounted(() => {
      root.$nuxt.$off(['open:qrcode', 'tabchange'])
    })

    const d = ref(false)
    const onJoin = () => {
      dialogState.value = 'stream'
    }

    watch(dialogState, (now) => {
      if (now) {
        dialog.value = true
      }
    })

    watch(dialog, async (now) => {
      if (!now) {
        await wait(300)
        dialogState.value = ''
      }
    })

    return {
      onClose,
      dialogState,
      onCreateVideo,
      mdiAlertCircleOutline,
      mdiCheckBoxOutline,
      mdiCheckboxBlank,
      mdiPhoneRing,
      onCloseSheet,
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
      d,
      onJoin,
      stream: computed(() => userMedia.userMedia),
      isShowLocal: computed(() => userMedia.isShowLocal),
      isShowGlobal: computed(() => userMedia.isShowGlobal),
      switch: userMedia.switch,
      tabRef
    }
  }
})
</script>

<style scoped>
.fa-enter,
.fa-leave-to {
  transform: translate(-50px, -50px);
  opacity: 0;
}

.fa-enter-active,
.fa-leave-active {
  transition: all 0.3s ease;
}

.fa-enter-to {
  transform: translate(0, 0);
}
</style>
