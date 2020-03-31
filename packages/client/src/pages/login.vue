<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-card min-width="200px" max-width="300px">
        <v-card-title>Login</v-card-title>
        <v-card-actions>
          <v-btn block color="success" @click="signin">text</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
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
      root.$router.push('/rooms')
    }

    const check = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
        }
      })
    }
    return { signin, check }
  }
})
</script>
