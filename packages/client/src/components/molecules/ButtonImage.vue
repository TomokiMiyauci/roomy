<template>
  <v-tooltip :color="login ? 'secondary' : undefined" top>
    <template v-slot:activator="{ on }">
      <base-button
        v-on="on"
        @click="login ? onClick() : undefined"
        :color="login ? 'primary' : 'grey'"
        tile
        icon
      >
        <v-icon>{{ mdiImage }}</v-icon>
      </base-button>
    </template>
    <span v-if="login">Image </span>
    <span v-else
      ><v-icon left color="green">{{ mdiInformation }}</v-icon> Require
      Signin</span
    >
  </v-tooltip>
</template>

<script lang="ts">
import { mdiImage, mdiInformation } from '@mdi/js'
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import Compressor from 'compressorjs'

import BaseButton from '@/components/atoms/BaseButton.vue'
export default defineComponent({
  components: {
    BaseButton
  },

  props: {
    login: {
      type: Boolean,
      default: false
    }
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
    return { onClick, mdiImage, mdiInformation }
  }
})
</script>
