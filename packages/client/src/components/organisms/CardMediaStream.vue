<template>
  <v-card min-height="400">
    <v-toolbar collapse>
      <button-close @click="$emit('close')" />
      <v-toolbar-title>
        New
      </v-toolbar-title>
    </v-toolbar>
    <v-row
      v-if="!a"
      no-gutters
      justify="space-around"
      style="min-height:336px;"
      align="center"
      align-items="center"
    >
      <v-col cols="auto">
        <v-btn @click="onCall" fab color="success"
          ><v-icon>{{ mdiPhone }}</v-icon></v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn @click="onCall" fab color="success"
          ><v-icon>{{ mdiVideo }}</v-icon></v-btn
        >
      </v-col>
    </v-row>

    <Promised :promise="a" tag="div">
      <template #pending>
        <v-card-text class="fill-height">
          <v-row class="fill-height" justify="center" align="center">
            <v-col cols="auto">
              <v-progress-circular indeterminate />
            </v-col>
          </v-row>
        </v-card-text>
      </template>
      <template #default="he">
        <video-player
          @hangup="$emit('close')"
          @switch="$emit('close')"
          :stream="he"
          scope="LOCAL"
        />

        <!-- <v-btn @click="onClick" absolute top style="z-index:1;" icon
          ><v-icon>{{ mdiArrowBottomRightBoldOutline }}</v-icon></v-btn
        >

        <v-row
          class="pa-3"
          style="position:absolute;bottom:0;z-index:1;width: 100%;"
          justify="center"
          align="center"
        >
          <v-btn @click="onStop" fab color="red"
            ><v-icon>{{ mdiPhoneHangup }}</v-icon></v-btn
          >
        </v-row>
        <ttt :stream="he" width="100%" /> -->
      </template>

      <template #rejected="error">
        {{ error }}
      </template>
    </Promised>
  </v-card>
</template>

<script lang="ts">
import {
  mdiArrowBottomRightBoldOutline,
  mdiPhone,
  mdiPhoneHangup,
  mdiVideo
} from '@mdi/js'
import {
  computed,
  defineComponent,
  onUnmounted,
  ref
} from '@vue/composition-api'
import { Promised } from 'vue-promised'

import VideoPlayer from '@/components/organisms/VideoPlayer.vue'
import { useMediaStream } from '@/core/useMediaStream'
import { userMedia } from '@/store'
export default defineComponent({
  components: {
    ButtonClose: () => import('@/components/molecules/ButtonClose.vue'),
    VideoPlayer,
    Promised
  },

  setup(_, { emit }) {
    const video = ref<HTMLVideoElement>()
    const v = ref<HTMLVideoElement>()
    const a = ref<any>()
    const onCall = () => {
      a.value = useMediaStream({
        video: true
      }).then((s) => {
        userMedia.setUserMedia(s)
        return s
      })
    }

    onUnmounted(() => {})

    const onStop = () => {
      userMedia.stop()

      emit('close')
    }

    return {
      video,
      v,
      onCall,
      a,
      mdiPhoneHangup,
      mdiPhone,
      mdiArrowBottomRightBoldOutline,
      onStop,
      mdiVideo,
      stream: computed(() => userMedia.userMedia)
    }
  }
})
</script>
