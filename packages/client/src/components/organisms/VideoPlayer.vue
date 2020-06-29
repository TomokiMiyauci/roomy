<template>
  <div
    @mouseenter="isShow = true"
    @focus="isShow = true"
    @mouseleave="isShow = false"
    @blur="isShow = false"
  >
    <v-fade-transition>
      <v-btn
        @click="onSwitch"
        v-show="isShow"
        icon
        absolute
        top
        left
        style="z-index:1;"
        color="grey"
        ><v-icon>{{ switchIcon }}</v-icon></v-btn
      >
    </v-fade-transition>

    <video-autoplayer
      v-bind="$attrs"
      :stream="stream"
      :width="width"
      :height="height"
      style="background-color:black;"
    />
    <v-slide-y-reverse-transition>
      <v-row
        v-show="isShow"
        no-gutters
        class="pa-1"
        style="position:absolute;bottom:0;width:100%;background-color:rgba(0,0,0,0.4)"
        justify="center"
        align="center"
      >
        <v-btn @click="onHandUp" fab color="red"
          ><v-icon color="white">{{ mdiPhoneHangup }}</v-icon></v-btn
        >
      </v-row>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script lang="ts">
import {
  mdiArrowBottomRightThick,
  mdiArrowTopLeftThick,
  mdiPhoneHangup
} from '@mdi/js'
import { computed, defineComponent, PropType, ref } from '@vue/composition-api'

import { userMedia } from '@/store'
export default defineComponent({
  props: {
    stream: {
      required: true
    },

    scope: {
      type: String as PropType<'GLOBAL' | 'LOCAL'>,
      required: true
    },

    width: {
      type: [String, Number],
      default: '100%'
    },

    height: {
      type: [String, Number],
      default: '100%'
    }
  },

  components: {
    VideoAutoplayer: () => import('@/components/molecules/VideoAutoplayer.vue')
  },

  setup(props, { emit }) {
    const isShow = ref(false)
    const onSwitch = () => {
      userMedia.switch(props.scope === 'GLOBAL' ? 'LOCAL' : 'GLOBAL')
      emit('switch')
    }

    const switchIcon = computed(() => {
      return props.scope === 'GLOBAL'
        ? mdiArrowTopLeftThick
        : mdiArrowBottomRightThick
    })

    const onHandUp = () => {
      userMedia.stop()
      emit('hangup')
    }

    return {
      onSwitch,
      onHandUp,
      switchIcon,
      mdiPhoneHangup,
      isShow
    }
  }
})
</script>
