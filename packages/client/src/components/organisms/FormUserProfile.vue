<template>
  <v-card>
    <v-toolbar color="secondary">
      <button-close />
      <v-toolbar-title>User Profile</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col cols="9">
          <v-card class="pa-2" outlined tile>
            Level 1: .col-sm-9
          </v-card>
          <v-row no-gutters>
            <v-col cols="8" sm="6">
              <v-card
                class="pa-2"
                outlined
                style="background-color: lightgrey;"
                tile
              >
                Level 2: .col-8 .col-sm-6
              </v-card>
            </v-col>
            <v-col cols="4" sm="6">
              <v-card
                class="pa-2"
                outlined
                style="background-color: lightgrey;"
                tile
              >
                Level 3: .col-4 .col-sm-6
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <span></span>

          <avatar-large v-bind="$props" />
        </v-col>
      </v-row>
      <v-avatar size="avatarSize" color="red">
        <img src="src" alt="alt" />
      </v-avatar>
      <v-text-field
        v-model.trim="state.displayName"
        name="name"
        label="Name"
      ></v-text-field>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="updateProfile" color="secondary">update</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs
} from '@vue/composition-api'
import isEmpty from 'lodash/isEmpty'
import omitby from 'lodash/omitBy'

import AvatarLarge from '@/components/molecules/AvatarLarge.vue'
import ButtonClose from '@/components/molecules/ButtonClose.vue'
import { auth } from '@/plugins/firebase'

type Props = {
  [key: string]: string
}

export default defineComponent({
  components: {
    ButtonClose,
    AvatarLarge
  },

  props: {
    displayName: {
      type: String,
      default: ''
    },

    photoURL: {
      type: String,
      default: ''
    },

    login: {
      type: Boolean,
      default: false
    }
  },

  setup(props: Props) {
    const state = reactive({
      displayName: props.displayName,
      photoURL: props.photoURL
    })

    const diff = computed<{} | { displayName?: string }>(() => {
      return omitby(state, (v, k) => props[k] === v)
    })

    const updateProfile = async () => {
      if (isEmpty(diff.value)) return
      console.log(222, auth.currentUser)
      await auth
        .currentUser!.updateProfile(diff.value)
        .catch((e) => console.log(111, e))

      console.log(111)
    }

    return { ...toRefs(state), state, diff, updateProfile }
  }
})
</script>
