<template>
  <v-card width="350px">
    <v-card-title
      style="background-color:#083b66 "
      class="flex-column"
      color="primary"
    >
      <img height="80px" src="@/assets/logo.png" alt="logo" />
      <h1 class="white--text headline">Sign Up</h1>
    </v-card-title>
    <v-tabs v-model="tab" fixed-tabs>
      <v-tab>
        <v-icon left>{{ mdiKey }}</v-icon>
        Sign In
      </v-tab>
      <v-tab>
        <v-icon left>{{ mdiAccountBadgeHorizontal }}</v-icon>
        Sign Up
      </v-tab>
    </v-tabs>
    <v-divider />

    <v-card-text class="flex-column" align="center">
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-btn @click="signin" block>
            <v-icon color="blue" left>{{ mdiGoogle }}</v-icon
            >sign in with google</v-btn
          >
          <div class="pa-5">or</div>
          <v-form>
            <v-text-field
              :prepend-inner-icon="mdiEmail"
              :rules="[(v) => !!v || 'This filed is required']"
              outlined
              dense
              label="Email"
            />
            <v-text-field
              :append-icon="show ? mdiEye : mdiEyeOff"
              :type="show ? 'text' : 'password'"
              :prepend-inner-icon="mdiShieldKey"
              @click:append="show = !show"
              :rules="[(v) => !!v || 'This filed is required']"
              outlined
              dense
              counter
              hint="At least 8 characters"
              label="Password"
            />
          </v-form>
        </v-tab-item>
        <v-tab-item></v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-text style="background-color:rgba(128,128,128,0.3)">
      By signing up, you agree to our terms of service and privacy policy.
    </v-card-text>

    <v-card-actions
      style="justify-content:center;height:70px;background-color:#083b66;"
      class="flex-column"
    >
      <v-btn text dark>Sign up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  mdiAccountBadgeHorizontal,
  mdiEmail,
  mdiEye,
  mdiEyeOff,
  mdiGoogle,
  mdiKey,
  mdiShieldKey
} from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

import firebase, { auth } from '@/plugins/firebase'
export default defineComponent({
  setup(_, { root }) {
    const tab = ref(0)
    const show = ref(false)

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

    // const check = () => {
    //   auth.onAuthStateChanged((user) => {
    //     if (user) {
    //       console.log(user)
    //     }
    //   })
    // }

    const onClick = () => {
      root.$router.back()
    }

    return {
      tab,
      show,
      mdiEye,
      mdiEyeOff,
      mdiShieldKey,
      mdiEmail,
      mdiGoogle,
      mdiAccountBadgeHorizontal,
      mdiKey,
      signin,
      onClick
    }
  }
})
</script>
