<template>
  <div class="fill-height">
    <v-bottom-sheet v-model="sheet">
      <recording-studio @close="onClose" />
    </v-bottom-sheet>

    <v-container v-if="!messages.length" class="fill-height pa-10">
      <v-row class="flex-column">
        <transition-group name="fade">
          <template v-if="!isEmpty">
            <SkeletonLoaderMessageSet
              v-for="i in 10"
              :key="i"
              class="pb-4"
            ></SkeletonLoaderMessageSet>
          </template>

          <v-row key="suggest" v-else align="center" class="flex-column">
            <v-col cols="auto">
              <v-icon size="50">{{ mdiCommentProcessing }}</v-icon>
            </v-col>

            <v-col cols="auto">
              <span class="display-1 grey-darken-1--text">No message </span>
            </v-col>
          </v-row>
        </transition-group>
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
                    !dayjs(messages[index - 1].createdAt.seconds * 1000).isSame(
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
      <card-room-share :url="text" @close="dialog = false" />
    </v-dialog>

    <div
      :style="{
        width: $vuetify.breakpoint.mdAndDown ? '100%' : 'calc(100% - 406px)'
      }"
      style="position:fixed;bottom:0;background-color:rgb(255,255,255);"
    >
      <the-post @postend="onPostend" @audio="sheet = true" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  mdiAlertCircleOutline,
  mdiCheckboxBlank,
  mdiCheckBoxOutline,
  mdiCommentProcessing,
  mdiMicrophone,
  mdiMicrophoneSettings
} from '@mdi/js'
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref
} from '@vue/composition-api'
import dayjs from 'dayjs'
import { gsap } from 'gsap'

import { useFirestore } from '@/core/useFirestore'
import { messageReference } from '@/core/useFirestoreReference'
import { publicRoom, reference } from '@/store'
import { generateInviteURL, isOwn } from '@/utils/firestore'
import { Message, PublicRoom } from '~types/core'

export default defineComponent({
  head() {
    return {
      title: 'Public'
    }
  },

  layout: 'public-chat',

  components: {
    ButtonImage: () => import('@/components/molecules/ButtonImage.vue'),
    BoxCallout: () => import('@/components/atoms/SpeechBalloon.vue'),
    MessageSet: () => import('@/components/molecules/MessageSet.vue'),
    ThePost: () => import('@/components/organisms/ThePost.vue'),
    RecordingStudio: () => import('@/components/molecules/RecordingStudio.vue'),
    BaseChip: () => import('@/components/atoms/BaseChip.vue'),
    ChipDate: () => import('@/components/atoms/ChipDate.vue'),
    SkeletonLoaderMessageSet: () =>
      import('@/components/molecules/SkeletonLoaderMessageSet.vue'),
    CardRoomShare: () => import('@/components/molecules/CardRoomShare.vue')
  },

  setup(_, { root }) {
    publicRoom.subscribe()
    const sheet = ref(false)
    const dialog = ref(false)
    const text = ref('')
    const isEmpty = ref(false)

    reference.setRoomId(root.$route.params.id)

    const { collectionRef } = messageReference()

    const messages = useFirestore<Message>(
      collectionRef.value.orderBy('createdAt', 'asc')
    )

    setTimeout(() => {
      isEmpty.value = true
    }, 3000)

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

    return {
      mdiAlertCircleOutline,
      mdiCheckBoxOutline,
      mdiCheckboxBlank,
      onClose,
      messages,
      sheet,
      beforeEnter,
      enter,
      mdiMicrophone,
      mdiMicrophoneSettings,
      onPostend,
      dayjs,
      isOwn,
      dialog,
      text,
      mdiCommentProcessing,
      isEmpty
    }
  }
})
</script>

<style lang="scss">
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s;
}
</style>
