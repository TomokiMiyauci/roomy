<template>
  <div
    class="headline"
    :class="[$style.base, { [$style.hover]: isHover }]"
    @dragenter.prevent.stop.self="onDragover"
    @dragover.prevent
    @dragleave.prevent.self="onDragleave"
    @drop.prevent.stop="onDrop"
  >
    <v-icon style="position:absolute;z-index:0;" size="250">{{
      mdiPlusThick
    }}</v-icon>
    <v-col cols="auto" class="heading">
      <v-icon left>{{ mdiArrowCollapseDown }}</v-icon
      >Drop Image</v-col
    >
    <v-col class="grey--text" cols="auto">or</v-col>
    <v-col cols="auto">
      <v-btn color="primary" @click="onClick"
        ><v-icon left>{{ mdiImageSearch }}</v-icon
        >Choose</v-btn
      >
    </v-col>
  </div>
</template>

<script lang="ts">
import { mdiArrowCollapseDown, mdiImageSearch, mdiPlusThick } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

import { compress, useFileDialog } from '@/core/useFileDialog'

export default defineComponent({
  setup(_, { emit }) {
    const isHover = ref(false)
    const onDrop = async (event: DragEvent) => {
      isHover.value = false
      const file = event.dataTransfer!.files[0]

      const compressedFile = await compress(file)
      console.log(compressedFile)

      emit('drop:file', compressedFile)
    }

    const onDragover = () => {
      isHover.value = true
    }

    const onDragleave = () => {
      isHover.value = false
    }

    const onClick = async () => {
      const { getFile } = useFileDialog()
      const file = await getFile('image/*')

      const newFile = await compress(file)
      emit('input:file', newFile)
    }

    return {
      onDrop,
      onDragover,
      onDragleave,
      isHover,
      onClick,
      mdiPlusThick,
      mdiArrowCollapseDown,
      mdiImageSearch
    }
  }
})
</script>

<style lang="scss" module>
.base {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  background-color: rgba(128, 128, 128, 0.3);
  border: 3px dotted grey;
  border-radius: 10px;
  transition: all 0.5s;
}

.hover {
  color: white;
  background-color: rgba(67, 156, 67, 0.622);
  border: 3px dotted rgba(67, 156, 67, 0.822);
  border-radius: 10px;
  transition: all 0.5s;
}
</style>
