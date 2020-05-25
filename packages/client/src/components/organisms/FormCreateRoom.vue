<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn @click="$emit('close')" icon dark>
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
      <v-toolbar-title>
        <v-icon>{{ mdiCogs }}</v-icon>
        New Room Settings</v-toolbar-title
      >
    </v-toolbar>

    <div class="mx-auto">
      <v-card-title class="title font-weight-regular justify-space-between">
        <v-icon left>{{ stepSet.icon }}</v-icon
        >{{ stepSet.title }}
        <v-spacer></v-spacer>

        <v-avatar
          v-text="stepWindow"
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
        ></v-avatar>
      </v-card-title>
      <v-form v-model="valid">
        <v-window v-model="stepWindow">
          <v-window-item :value="1">
            <v-card-text>
              <input-text-room-name v-model="name" />
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
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <v-card-text>
              <input-textarea-description v-model="description" />

              <combobox-tabs v-model="tags" />
            </v-card-text>
          </v-window-item>

          <v-window-item :value="4">
            <div
              :style="{ height: $vuetify.breakpoint.mdAndDown ? '40vh' : '' }"
              class="pa-4 text-center"
            >
              <v-progress-circular
                v-if="isEqual(0)"
                :size="150"
                :width="9"
                color="primary"
                indeterminate
              ></v-progress-circular>

              <v-icon v-else-if="isEqual(1)" size="150" color="secondary">{{
                mdiCheckCircle
              }}</v-icon>

              <v-img
                v-else-if="isEqual(2)"
                class="mb-4"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              ></v-img>

              <svg-qrcode
                v-else-if="isEqual(3)"
                :text="url"
                style="width:150px;height:150px;margin:0 auto;"
              />

              <h3 class="title font-weight-light mb-2">
                {{ progressMessage }}
              </h3>
              <!-- <span class="caption grey-darken-1--text">Thanks for signing up!</span> -->
            </div>
          </v-window-item>
        </v-window>
      </v-form>

      <v-subheader>
        <v-icon left>{{ mdiFormatListText }}</v-icon>
        <span class="pr-3">Preview</span>
        <v-divider />
      </v-subheader>

      <v-list :max-width="$vuetify.breakpoint.mdAndDown ? '' : '360px'">
        <v-list-item>
          <v-list-item-avatar
            :style="{
              border:
                stepWindow === 2
                  ? `2px solid ${$vuetify.theme.themes.light.primary}`
                  : ''
            }"
            tile
          >
            <v-img v-if="photoURL" :src="photoURL" />
            <v-icon v-else-if="!photoURL && stepWindow === 2" color="primary">{{
              mdiNewBox
            }}</v-icon>
            <v-skeleton-loader v-else tile type="avatar" />
          </v-list-item-avatar>

          <v-list-item-content class="pt-1 pb-1">
            <v-list-item-title
              :style="{
                color:
                  stepWindow === 1 ? $vuetify.theme.themes.light.primary : ''
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

            <div class="grey-darken-1--text caption">
              <v-icon small left>{{ mdiChatProcessing }}</v-icon>
              0
            </div>
          </v-list-item-content>
          <v-list-item-action>
            <span
              class="grey-darken-1--text caption"
              style="position:absolute;bottom:0;"
              >Monday</span
            >
            <v-btn icon>
              <v-icon color="grey lighten-1">{{ mdiQrcode }}</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-card-actions>
        <v-btn
          :disabled="stepWindow === 1 || stepWindow === 4"
          @click="stepWindow--"
          text
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="stepWindow === 4 || !valid"
          @click="onNext"
          color="primary"
          depressed
        >
          Next
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts">
import {
  mdiAccountCircle,
  mdiChatProcessing,
  mdiCheckCircle,
  mdiClose,
  mdiCogs,
  mdiFormatListText,
  mdiImageEdit,
  mdiNewBox,
  mdiQrcode,
  mdiSquareEditOutline,
  mdiTagPlus
} from '@mdi/js'
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs
} from '@vue/composition-api'

import { blobToDataURL as b } from '@/core/useFileDialog'
import { useStep } from '@/core/useStep'
import { wait } from '@/core/useTime'
import { createRoom } from '@/repositories/publicRoom'
import { RoomOptions } from '~types/core'

export default defineComponent({
  components: {
    FileDropper: () => import('@/components/molecules/FileDropper.vue'),
    ImageCropper: () => import('@/components/molecules/ImageCropper.vue'),
    SvgQrcode: () => import('@/components/atoms/SvgQrcode.vue'),
    InputTextRoomName: () => import('@/components/atoms/InputTextRoomName.vue'),
    ComboboxTabs: () => import('@/components/molecules/ComboboxTabs.vue'),
    InputTextareaDescription: () =>
      import('@/components/atoms/InputTextareaDescription.vue')
  },
  setup() {
    const stepWindow = ref(0)
    const newRoom = reactive<RoomOptions>({
      name: 'New Room',
      photoURL: '',
      description: '',
      tags: []
    })

    const valid = ref(false)

    const img = ref('')
    const url = ref('')

    const { next, isEqual } = useStep()

    const onDrop = async (file: Blob) => {
      // newRoom.image = file
      console.log(newRoom)
      const aaa = await b(file)
      img.value = aaa
    }

    const progressMessage = computed(() => {
      if (isEqual(0)) return 'Creating room...'
      if (isEqual(1)) return 'Create Completed.'
      if (isEqual(2)) return 'Welcome to Roomy!'
      if (isEqual(3)) return 'Share room anyone now.'

      return 'Error has occured.'
    })

    const onCrop = (dataURL: string) => {
      newRoom.photoURL = dataURL
    }

    const stepper = [
      {
        title: 'Name',
        icon: mdiSquareEditOutline
      },
      {
        title: 'Image',
        icon: mdiImageEdit
      },
      {
        title: 'Tag',
        icon: mdiTagPlus
      },
      { title: 'Result', icon: '' }
    ]

    const stepSet = computed(() => {
      return stepper[stepWindow.value ? stepWindow.value - 1 : 0]
    })

    const onNext = async () => {
      if (stepWindow.value === 3) {
        stepWindow.value++
        // const photoURL = await blobToDataURL(newRoom.image!)
        const photoURL = newRoom.photoURL ? newRoom.photoURL : ''

        // const photoURL = newRoom.image ? URL.createObjectURL(newRoom.image) : ''
        // console.log(photoURL)

        const documentData = await createRoom({
          name: newRoom.name,
          photoURL,
          description: newRoom.description,
          tags: newRoom.tags
        })
        url.value = `${process.env.baseUrl}/public/${documentData.id}`
        await wait(2000)
        next()
        await wait(2000)
        next()
        await wait(2000)
        next()
        // emit('close')
      } else {
        stepWindow.value++
      }
    }

    return {
      mdiClose,
      ...toRefs(newRoom),
      onDrop,
      stepWindow,
      onNext,
      img,
      onCrop,
      mdiAccountCircle,
      mdiNewBox,
      stepSet,
      mdiCogs,
      mdiSquareEditOutline,
      mdiFormatListText,
      mdiChatProcessing,
      mdiImageEdit,
      valid,
      mdiQrcode,
      isEqual,
      progressMessage,
      mdiCheckCircle,
      url
    }
  }
})
</script>
