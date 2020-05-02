<template>
  <base-button @click="onClick" icon>
    <v-icon>{{ mdiImage }}</v-icon>
  </base-button>
</template>

<script lang="ts">
import { mdiImage } from '@mdi/js'
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import Compressor from 'compressorjs'

export default defineComponent({
  components: {
    BaseButton: () => import('@/components/atoms/BaseButton.vue')
  },

  setup(_, { emit }) {
    const input = ref<HTMLInputElement>()

    onBeforeMount(() => {
      input.value = document.createElement('input')
      input.value.type = 'file'
    })

    const onClick = () => {
      if (!input.value) return
      input.value.click()

      input.value.onchange = (e) => {
        if (e.target instanceof HTMLInputElement && e.target.files) {
          const file = e.target.files[0]

          // eslint-disable-next-line no-new
          new Compressor(file, {
            quality: 0.6,
            success: (result) => {
              emit('post:image', result)
            }
          })
          input.value!.value = ''
        }
      }
    }
    return { onClick, mdiImage }
  }
})
</script>
