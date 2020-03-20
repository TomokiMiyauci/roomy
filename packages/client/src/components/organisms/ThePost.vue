<template>
  <v-container>
    <v-form v-model="isValid">
      <v-row no-gutters dense md xl lg>
        <v-col cols="auto">
          <button-image @post:image="postImage" />
        </v-col>

        <v-col>
          <v-textarea
            v-model="text"
            :rules="[(v) => !!v || 'required']"
            auto-grow
            solo
            dense
            rows="1"
            hide-details
            label="fill message"
            solo-inverted
            light
            auto-focus
          ></v-textarea>
        </v-col>

        <v-col cols="auto">
          <v-btn
            v-if="text"
            id="xx"
            ref="btn"
            icon
            color="success"
            @click="postText"
            ><v-icon class="demo_svg">{{ mdiSend }}</v-icon></v-btn
          >
          <v-btn
            v-else
            id="xx"
            ref="btn"
            icon
            color="success"
            @click="$emit('audio')"
            ><v-icon class="demo_svg">{{ mdiMicrophone }}</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { mdiSend, mdiMicrophone } from '@mdi/js'
import { reactive, createComponent, toRefs } from '@vue/composition-api'

import { createMessage } from '@/repositories/public'

import ButtonImage from '@/components/molecules/ButtonImage.vue'

export default createComponent({
  components: {
    ButtonImage
  },

  setup(_, context) {
    const state = reactive({
      isValid: false,
      text: ''
    })

    const postImage = async (e: File) => {
      console.log(e)
      await createMessage({ kind: 'TEXT', text: 'image' })
      await context.root.$nextTick()
      context.emit('postend')
    }

    const onAudio = () => {}

    const postText = async () => {
      const wrapper = document.getElementById('xx')
      wrapper!.animate(
        { transform: ['translateX(0px)', 'translateX(140px)'] },
        1000
      )
      setTimeout(() => {
        state.text = ''
      }, 1000)

      await createMessage({ kind: 'TEXT', text: state.text })

      await context.root.$nextTick()

      context.emit('postend')

      // btn.value!.animate({ backgroundColor: ['red', 'blue'] }, 3000)
    }

    return {
      ...toRefs(state),
      postImage,
      postText,
      mdiSend,
      mdiMicrophone,
      onAudio
    }
  }
})
</script>
