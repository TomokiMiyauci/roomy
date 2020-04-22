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
            <file-dropper @drop:file="onDrop" />

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
import { mdiClose } from '@mdi/js'
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'

import FileDropper from '@/components/molecules/FileDropper.vue'
import { createPublicRoom } from '@/repositories/room'
import { RoomOptions } from '~types/core'

export default defineComponent({
  components: {
    FileDropper
  },
  setup() {
    const step = ref(0)
    const newRoom = reactive<RoomOptions>({
      name: 'New Room',
      image: undefined
    })

    const onDrop = (file: Blob) => {
      newRoom.image = file
      console.log(newRoom)
    }

    const onNext = async () => {
      if (step.value === 2) {
        const photoURL = newRoom.image ? URL.createObjectURL(newRoom.image) : ''
        console.log(photoURL)

        await createPublicRoom({ name: newRoom.name, photoURL })
      } else {
        step.value++
      }
    }
    return { mdiClose, ...toRefs(newRoom), onDrop, step, onNext }
  }
})
</script>
