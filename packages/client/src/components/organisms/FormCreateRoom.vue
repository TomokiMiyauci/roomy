<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="$emit('close')">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
      <v-toolbar-title>
        <v-icon>{{ mdiCogs }}</v-icon>
        New Room Settings</v-toolbar-title
      >
    </v-toolbar>

    <v-card class="mx-auto">
      <v-card-title class="title font-weight-regular justify-space-between">
        <v-icon left>{{ mdiSquareEditOutline }}</v-icon
        >{{ title }}

        <v-spacer></v-spacer>

        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>
      <v-form v-model="valid">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                v-model="name"
                clearable
                hint="Ex. Roomy Official"
                :clear-icon="mdiCloseCircle"
                :prepend-inner-icon="mdiSemanticWeb"
                label="Room Name"
                :rules="[(v) => !!v || 'This field is required']"
              ></v-text-field>
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
      </v-form>

      <v-card-text>
        <v-subheader>
          <v-icon left>{{ mdiFormatListText }}</v-icon>
          Preview
        </v-subheader>
        <v-list :max-width="$vuetify.breakpoint.mdAndDown ? '' : '360px'">
          <v-list-item>
            <v-list-item-avatar
              :style="{
                border:
                  step === 2
                    ? `1px solid ${$vuetify.theme.themes.light.primary}`
                    : ''
              }"
              tile
            >
              <v-img v-if="image" :src="image" />
              <v-icon v-else-if="!image && step === 2" color="primary">{{
                mdiNewBox
              }}</v-icon>
              <v-skeleton-loader v-else tile type="avatar" />
            </v-list-item-avatar>

            <v-list-item-content class="pt-1 pb-1">
              <v-list-item-title
                :style="{
                  color: step === 1 ? $vuetify.theme.themes.light.primary : ''
                }"
              >
                <span v-show="name">{{ name }}</span>
                <v-skeleton-loader v-show="!name" type="text" />
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-avatar color="grey" size="24">
                  <v-icon>{{ mdiAccountCircle }}</v-icon>
                </v-avatar>
              </v-list-item-subtitle>

              <div class="grey--text caption">
                <v-icon small left>{{ mdiChatProcessing }}</v-icon>
                0
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <span
                class="grey--text caption"
                style="position:absolute;bottom:0;"
                >Monday</span
              >
              <v-btn icon>
                <v-icon color="grey lighten-1">{{ mdiQrcode }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step--">
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="step === 3 || !valid"
          color="primary"
          depressed
          @click="onNext"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import {
  mdiAccountCircle,
  mdiChatProcessing,
  mdiClose,
  mdiCloseCircle,
  mdiCogs,
  mdiFormatListText,
  mdiNewBox,
  mdiQrcode,
  mdiSemanticWeb,
  mdiSquareEditOutline
} from '@mdi/js'
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

    const valid = ref(false)

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
          text = 'Name'
          break
        }

        case 2: {
          text = 'Room Image'
          break
        }
      }

      return text
    })

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
      title,
      mdiCogs,
      mdiSquareEditOutline,
      mdiSemanticWeb,
      mdiCloseCircle,
      mdiFormatListText,
      mdiChatProcessing,
      valid,
      mdiQrcode
    }
  }
})
</script>
