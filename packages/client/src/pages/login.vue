<template>
  <v-container class="fill-height">
    <client-only>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        @click="onClick"
        top
        style="top:10px;"
        left
        absolute
        fab
      >
        <v-icon>{{ mdiArrowLeft }}</v-icon>
      </v-btn>
    </client-only>
    <v-row justify="center" align="center">
      <form-sign @signin="onCreate" @signup="onSignUp" />
    </v-row>

    <v-dialog
      v-model="dialog"
      overlay-opacity="0.9"
      persistent
      max-width="600px"
    >
      <form-profile @close="onCreate" />
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { mdiArrowLeft, mdiGoogle, mdiWebpack } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

import FormProfile from '@/components/organisms/FormProfile.vue'
import { user } from '@/store'
export default defineComponent({
  layout: 'sign',

  components: {
    FormSign: () => import('@/components/organisms/FormSign.vue'),
    FormProfile
  },

  setup(_, { root }) {
    const dialog = ref(false)
    const onClick = () => {
      root.$router.back()
    }

    const onSignUp = () => {
      dialog.value = true
    }

    const onCreate = () => {
      root.$router.push('/public')
      user.succeedSignIn()
    }
    return {
      mdiGoogle,
      mdiWebpack,
      mdiArrowLeft,
      onClick,
      onCreate,
      onSignUp,
      dialog
    }
  }
})
</script>
