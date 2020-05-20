<template>
  <v-container style="background-color: grey;">
    <v-form v-model="isValid">
      <v-row no-gutters dense>
        <v-col class="pr-2" cols="auto">
          <button-image :login="login" @post:image="postImage" />
        </v-col>

        <v-col>
          <input-textarea-message v-model.trim="text" />
        </v-col>

        <v-col class="pl-2" cols="auto">
          <button-send ref="buttonSend" v-if="text" @send="postText" />
          <button-mic :login="login" v-else @audio="$emit('audio')" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {
  mdiChatProcessing,
  mdiCloseCircle,
  mdiMicrophone,
  mdiSend
} from '@mdi/js'
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'

import InputTextareaMessage from '@/components/atoms/InputTextareaMessage.vue'
import ButtonImage from '@/components/molecules/ButtonImage.vue'
import ButtonMic from '@/components/molecules/ButtonMic.vue'
import ButtonSend from '@/components/molecules/ButtonSend.vue'
import { storage } from '@/plugins/firebase'
import { createMessage } from '@/repositories/publicRoom'
import { user } from '@/store'

export default defineComponent({
  components: {
    ButtonImage,
    ButtonMic,
    ButtonSend,
    InputTextareaMessage
  },

  setup(_, context) {
    const state = reactive({
      isValid: false,
      text: ''
    })

    const postImage = async (e: File) => {
      console.log(e)
      const firstPath = 'test'
      const filePath = firstPath + '/' + e.size
      const storageRef = storage.ref('test')
      const fileSnapshot = await storageRef.child(filePath).put(e)
      const imageURL = await fileSnapshot.ref.getDownloadURL()

      await createMessage({
        kind: 'IMAGE',
        imageURL,
        size: fileSnapshot.totalBytes
      })

      context.emit('postend')
    }

    const buttonSend = ref<InstanceType<typeof ButtonSend>>()

    const postText = async () => {
      buttonSend.value!.$children[0].$children[0].$el.animate(
        { transform: ['translateX(0px)', 'translateX(140px)'] },
        1000
      )

      setTimeout(() => {
        state.text = ''
      }, 1000)

      await createMessage({ kind: 'TEXT', text: state.text })

      context.emit('postend')
    }

    return {
      ...toRefs(state),
      state,
      postImage,
      postText,
      mdiSend,
      mdiMicrophone,
      login: user.login,
      mdiChatProcessing,
      mdiCloseCircle,
      buttonSend
    }
  }
})
</script>
