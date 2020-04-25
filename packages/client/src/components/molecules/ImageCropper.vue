<template>
  <div class="cropper-wrapper">
    <div
      :style="{ backgroundImage: 'url(' + img + ')' }"
      class="cropper-background"
    ></div>
    <Cropper
      ref="cropper"
      classname="cropper"
      :stencil-props="{
        aspectRatio: 1 / 1
      }"
      :src="img"
      @change="onChange"
    />

    <div class="aaa">
      <v-row class="flex-column">
        <v-col>
          <v-btn role="crop" icon color="primary" @click="onCrop">
            <v-icon>{{ mdiCropFree }}</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn role="rotate" icon color="primary">
            <v-icon>{{ mdiCropRotate }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
// import { blobToDataURL, compress } from '@/core/useFileDialog'
// type Props = {
//   img: string
// }
import { mdiCropFree, mdiCropRotate } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'
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
    const src = ref('')

    const onCrop = async () => {
      const {
        canvas
      }: { canvas: HTMLCanvasElement } = cropper.value!.getResult()
      const dataURL = canvas.toDataURL('image/jpeg')

      const res = await resize(dataURL, { width: 100, height: 100 })
      console.log(111, res)

      emit('crop', dataURL)
    }

    const onChange = async () => {
      const {
        canvas
      }: { canvas: HTMLCanvasElement } = cropper.value!.getResult()
      const dataURL = canvas.toDataURL('image/jpeg')

      const res = await resize(dataURL, { width: 100, height: 100 })

      emit('crop', res)
    }

    // JPEG形式のほうが良い圧縮率が得られると思われます。
    // 第2引数は品質レベルで、0.0~1.0の間の数値です。高いほど高品質。
    // return canvas.toDataURL("image/jpeg", 0.5);

    return { cropper, src, mdiCropFree, mdiCropRotate, onCrop, onChange }
  }
})
</script>

<style scoped>
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
}
</style>
