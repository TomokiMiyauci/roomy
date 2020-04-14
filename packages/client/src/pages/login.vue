<template>
  <v-container class="fill-height">
    <client-only>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        top
        style="top:10px;"
        left
        absolute
        fab
        @click="onClick"
      >
        <v-icon>{{ mdiArrowLeft }}</v-icon>
      </v-btn>
    </client-only>
    <v-row justify="center" align="center">
      <v-card min-width="320px" max-width="320px">
        <v-card-title class="display-1" style="justify-content:center;">
          Login
        </v-card-title>
        <v-card-text>
          Welcome to roomy
        </v-card-text>

        <v-card-title style="justify-content:center;">
          <v-icon color="purple" :size="250">{{ mdiWebpack }}</v-icon>
        </v-card-title>
        <v-card-text>
          Signed in with
        </v-card-text>
        <v-card-actions>
          <v-btn block class="white--text" color="blue" @click="signin">
            <v-icon color="red" left>{{ mdiGoogle }}</v-icon
            >oogle</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { mdiArrowLeft, mdiGoogle, mdiWebpack } from '@mdi/js'
import { createComponent } from '@vue/composition-api'

import firebase, { auth } from '@/plugins/firebase'

export default createComponent({
  layout: 'plain',

  setup(_, { root }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

    const signin = async () => {
      const result = await auth.signInWithPopup(provider).catch((e) => {
        const errorCode = e.code
        console.log(errorCode)
      })

      console.log(result)
      root.$router.push('/public')
    }

    const check = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
        }
      })
    }

    const onClick = () => {
      root.$router.back()
    }
    return { signin, check, mdiGoogle, mdiWebpack, mdiArrowLeft, onClick }
  }
})
</script>
