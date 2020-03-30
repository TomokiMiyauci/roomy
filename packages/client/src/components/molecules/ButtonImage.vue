<template>
  <base-button icon @click="onClick">
    <v-icon>{{ mdiImage }}</v-icon>
  </base-button>
</template>

<script lang="ts">
import { mdiImage } from '@mdi/js'
import { createComponent } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'

export default createComponent({
  components: {
    BaseButton
  },

  setup(_, { emit }) {
    const onClick = () => {
      const a = document.createElement('input')
      a.type = 'file'
      a.click()

      a.onchange = (e) => {
        if (e.target instanceof HTMLInputElement && e.target.files) {
          emit('post:image', e.target.files[0])
        }
      }
    }
    return { onClick, mdiImage }
  }
})
</script>
