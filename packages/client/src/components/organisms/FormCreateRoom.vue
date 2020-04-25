<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark>
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
      <v-toolbar-title>New Room Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text>Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-card class="mx-auto">
      <v-card-title class="title font-weight-regular justify-space-between">
        {{ title }}
        <span></span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field v-model="name" label="Room Name"></v-text-field>
            <span class="caption grey--text text--darken-1">
              This is the email you will use to login to your Vuetify account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text align="center">
            <ImageCropper
              v-if="img"
              :img="img"
              @change="onCrop"
              @crop="onCrop"
            />

            <file-dropper v-else @input:file="onDrop" @drop:file="onDrop" />

            <span class="caption grey--text text--darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-card-text>
        <v-subheader>Preview</v-subheader>
        <v-list>
          <v-list-item>
            <v-list-item-avatar tile>
              <v-img v-if="image" :src="image"></v-img>
              <v-icon v-else color="primary">{{ mdiNewBox }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content class="pt-1 pb-1">
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-avatar color="grey" size="24">
                  <v-icon>{{ mdiAccountCircle }}</v-icon>
                </v-avatar>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step--">
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 3" color="primary" depressed @click="onNext">
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { mdiAccountCircle, mdiClose, mdiNewBox } from '@mdi/js'
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs
} from '@vue/composition-api'

import FileDropper from '@/components/molecules/FileDropper.vue'
import ImageCropper from '@/components/molecules/ImageCropper.vue'
import { blobToDataURL as b } from '@/core/useFileDialog'
import { createPublicRoom } from '@/repositories/room'
import { RoomOptions } from '~types/core'

export default defineComponent({
  components: {
    FileDropper,
    ImageCropper
  },
  setup() {
    const step = ref(0)
    const newRoom = reactive<RoomOptions>({
      name: 'New Room',
      image: ''
    })

    const img = ref('')

    const onDrop = async (file: Blob) => {
      // newRoom.image = file
      console.log(newRoom)
      const aaa = await b(file)
      img.value = aaa
    }

    const onCrop = (dataURL: string) => {
      newRoom.image = dataURL
    }

    const title = computed(() => {
      let text = ''
      switch (step.value) {
        case 1: {
          text = 'Room Name'
          break
        }

        case 2: {
          text = 'Room Image'
          break
        }
      }

      return text
    })

    // const blobToDataURL = (blob: Blob) => {
    //   return new Promise<string>((resolve, reject) => {
    //     const reader = new FileReader()
    //     reader.onerror = reject
    //     reader.onload = () =>
    //       resolve(typeof reader.result === 'string' ? reader.result : '')

    //     reader.readAsDataURL(blob)
    //   })
    // }

    const onNext = async () => {
      if (step.value === 2) {
        // const photoURL = await blobToDataURL(newRoom.image!)
        const photoURL = newRoom.image ? newRoom.image : ''

        // const photoURL = newRoom.image ? URL.createObjectURL(newRoom.image) : ''
        // console.log(photoURL)

        await createPublicRoom({ name: newRoom.name, photoURL })
      } else {
        step.value++
      }
    }
    return {
      mdiClose,
      ...toRefs(newRoom),
      onDrop,
      step,
      onNext,
      img,
      onCrop,
      mdiAccountCircle,
      mdiNewBox,
      title
    }
  }
})
</script>
