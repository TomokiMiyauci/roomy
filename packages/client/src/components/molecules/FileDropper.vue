<template>
  <div
    class="amc display-1"
    :class="{ hover: isHover }"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
    @drop.prevent="onDrop"
  >
    <v-icon
      style="position:absolute;z-index:-1"
      color="grey lighten-2"
      size="200"
      >{{ mdiPlusThick }}</v-icon
    >
    <v-col cols="auto" class="heading">Drop files here</v-col>
    <v-col class="grey--text" cols="auto">or</v-col>
    <v-col cols="auto">
      <v-btn color="success" @click="onClick">text</v-btn>
    </v-col>
  </div>
</template>

<script lang="ts">
import { mdiPlusThick } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'
import Compressor from 'compressorjs'

export default defineComponent({
  setup(_, { emit }) {
    const isHover = ref(false)
    const onDrop = (event: DragEvent) => {
      isHover.value = false
      const file = event.dataTransfer!.files[0]

      // eslint-disable-next-line no-new
      new Compressor(file, {
        quality: 0.6,
        success: (result) => {
          emit('drop:file', result)
        }
      })
    }

    const onDragover = () => {
      isHover.value = true
    }

    const onDragleave = () => {
      isHover.value = false
    }

    const onClick = () => {}

    return { onDrop, onDragover, onDragleave, isHover, onClick, mdiPlusThick }
  }
})
</script>

<style>
.amc {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border: 5px solid grey;
  border-radius: 10px;
  transition: all 0.5s;
}

.hover {
  color: white;
  background-color: rgba(67, 156, 67, 0.622);
  border: 5px dotted rgba(67, 156, 67, 0.822);
  border-radius: 10px;
  transition: all 0.5s;
}
</style>
