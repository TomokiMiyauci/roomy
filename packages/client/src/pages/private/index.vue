<template>
  <div class="fill-height">
    <client-only>
      <the-rooms v-if="$vuetify.breakpoint.mdAndDown" :rooms="rooms" />
      <v-row
        v-else
        justify="center"
        align="center"
        class="fill-height flex-column grey--text"
      >
        <v-col cols="auto">
          <div class="display-1">Select Right</div>
        </v-col>
        <v-col class="pa-0" cols="auto">or</v-col>
        <v-col cols="auto">
          <v-btn fab color="primary" @click="dialog = true">
            <v-icon>{{ mdiCommentPlus }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </client-only>

    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="create">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <svg-qrcode v-if="key" :text="roomURL" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <template>
      <v-row
        class="fill-height flex-column"
        justify="center"
        align-content="center"
      >
        <v-col cols="auto">
          <div style="color:grey;" class="display-1 text--grey">
            Select room
          </div>
        </v-col>
        <v-col class="pa-0" align-self="center" cols="auto">
          <div style="color:grey;" class="headline text--grey">or</div>
        </v-col>

        <v-col align-self="center" cols="auto">
          <v-btn fab x-large color="primary"
            ><v-icon size="48px">{{ mdiCommentPlus }}</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </template> -->
  </div>
</template>

<script lang="ts">
import { mdiCommentPlus } from '@mdi/js'
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs
} from '@vue/composition-api'

import TheRooms from '@/components/organisms/TheRooms.vue'
import { useFirestore } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { createPrivateRoom, getRoomKey } from '@/repositories/room'
import { user } from '@/store'
export default defineComponent({
  layout: 'private',

  components: {
    TheRooms,
    SvgQrcode: () => import('@/components/atoms/SvgQrcode.vue')
  },

  setup(_, { root }) {
    const dialog = ref(false)
    const newRoom = reactive({
      id: '',
      key: ''
    })

    onMounted(() => {
      root.$nuxt.$on('close', () => {
        dialog.value = true
      })
    })

    onUnmounted(() => {
      root.$nuxt.$off('close')
    })

    const roomURL = computed(() => {
      const url = `https://${process.env.AUTH_DOMAIN}/private/invite?roomId=${newRoom.id}&key=${newRoom.key}`
      return url
    })

    const { collectionRef } = roomReference()
    const rooms = useFirestore(
      collectionRef.value
        .where('isPrivate', '==', true)
        .where('members', 'array-contains', user.id)
        .orderBy('recent.updatedAt', 'desc')
    )

    const create = async () => {
      const { id } = await createPrivateRoom()
      const key = await getRoomKey(id)
      newRoom.key = key
      newRoom.id = id
    }

    return {
      ...toRefs(newRoom),
      rooms,
      mdiCommentPlus,
      dialog,
      create,
      roomURL
    }
  }
})
</script>
