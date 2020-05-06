<template>
  <div
    ref="div"
    :class="{ fullscreen: fullscreen }"
    @fullscreenchange="onFullscreenChange"
    class="cropper-wrapper"
  >
    <div
      :style="{ backgroundImage: 'url(' + img + ')' }"
      class="cropper-background"
    ></div>
    <Cropper
      ref="cropper"
      @ready="onReady"
      :stencil-props="{
        aspectRatio: 1 / 1
      }"
      :src="img"
      @change="onChange"
      classname="cropper"
    >
    </Cropper>
    <v-row
      v-if="loading"
      style="position:absolute;top:calc(50% - 25px);left:calc(50% - 25px);"
    >
      <v-col>
        <v-progress-circular :size="50" color="primary" indeterminate />
      </v-col>
    </v-row>

    <div class="aaa">
      <v-row class="flex-column">
        <!-- <v-col>
          <v-btn role="rotate" icon color="primary">
            <v-icon>{{ mdiCropRotate }}</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="onRisize" role="rotate" icon color="primary">
            <v-icon>{{ mdiCropRotate }}</v-icon>
          </v-btn>
        </v-col> -->
        <v-col>
          <v-btn @click="requestFullscreen" tile icon color="primary"
            ><v-icon>{{
              fullscreen ? mdiFullscreenExit : mdiFullscreen
            }}</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </div>
    <!-- <v-img :src="aaa" width="100px" /> -->
  </div>
</template>

<script lang="ts">
// import { blobToDataURL, compress } from '@/core/useFileDialog'
// type Props = {
//   img: string
// }
import {
  mdiCropFree,
  mdiCropRotate,
  mdiFullscreen,
  mdiFullscreenExit
} from '@mdi/js'
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'
import { CircleStencil, Cropper } from 'vue-advanced-cropper'

import { resize } from '@/core/useImage'
export default defineComponent({
  props: {
    img: {
      type: String,
      default:
        'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      required: true
    }
  },

  components: {
    Cropper,
    CircleStencil
  },

  setup(_, { emit }) {
    const cropper = ref<any>()
    const state = reactive({
      loading: true,
      fullscreen: false,
      aaa: ''
    })

    const onCrop = async () => {
      const {
        canvas
      }: { canvas: HTMLCanvasElement } = cropper.value!.getResult()
      const dataURL = canvas.toDataURL('image/jpeg')

      const res = await resize(dataURL, { width: 100, height: 100 })
      console.log(111, res)

      state.aaa = res

      emit('crop', dataURL)
    }

    const onFullscreenChange = () => {
      state.fullscreen = document.fullscreen
    }

    const onRisize = () => {
      cropper.value!.setCoordinates((_: any, imageSize: any) => ({
        width: imageSize.width,
        height: imageSize.height
      }))
    }

    const onChange = async () => {
      const {
        canvas
      }: { canvas: HTMLCanvasElement } = cropper.value!.getResult()
      const dataURL = canvas.toDataURL('image/jpeg')

      const resizedURL = await resize(dataURL, { width: 100, height: 100 })
      state.aaa = resizedURL

      console.log(resizedURL)

      emit('crop', resizedURL)
    }

    const onReady = () => {
      state.loading = false
      // alert()
    }

    const div = ref<HTMLDivElement>()

    const requestFullscreen = () => {
      const elem = div.value!

      if (document.fullscreen) {
        document.exitFullscreen()
      } else {
        elem.requestFullscreen()
      }
    }

    // JPEG形式のほうが良い圧縮率が得られると思われます。
    // 第2引数は品質レベルで、0.0~1.0の間の数値です。高いほど高品質。
    // return canvas.toDataURL("image/jpeg", 0.5);

    return {
      cropper,
      mdiCropFree,
      mdiCropRotate,
      onCrop,
      onChange,
      onReady,
      requestFullscreen,
      onFullscreenChange,
      div,
      ...toRefs(state),
      onRisize,
      mdiFullscreen,
      mdiFullscreenExit
    }
  }
})
</script>

<style scoped>
.fullscreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.cropper-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: 50%;
  background-size: cover;
  opacity: 0.25;
  filter: blur(5px);
}

.cropper-wrapper {
  position: relative;
  height: 300px;
  background: black;
}

.aaa {
  position: absolute;
  bottom: 0;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3%;
}
</style>
