<template>
  <v-card width="350px">
    <v-card-title
      style="background-color:#083b66 "
      class="flex-column"
      color="primary"
    >
      <img height="80px" src="@/assets/logo.png" alt="logo" />
      <h1 class="white--text headline">
        {{ anchor }}
      </h1>
    </v-card-title>
    <v-tabs v-model="name" fixed-tabs>
      <v-tab href="#signin">
        <v-icon left>{{ mdiKey }}</v-icon>
        Sign In
      </v-tab>
      <v-tab href="#signup">
        <v-icon left>{{ mdiAccountBadgeHorizontal }}</v-icon>
        Sign Up
      </v-tab>
    </v-tabs>
    <v-divider />

    <v-card-text class="flex-column" align="center">
      <v-tabs-items v-model="name">
        <v-tab-item value="signin">
          <v-btn @click="signin" block>
            <v-icon color="blue" left>{{ mdiGoogle }}</v-icon
            >sign in with google</v-btn
          >
          <div class="pa-5">or</div>
          <v-form v-model="valid">
            <ValidationProvider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :prepend-inner-icon="mdiEmail"
                :error-messages="errors"
                type="email"
                outlined
                dense
                label="Email"
              />
            </ValidationProvider>
            <v-text-field
              v-model="password"
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
        <v-tab-item value="signup">
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              :prepend-inner-icon="mdiEmail"
              :rules="[(v) => !!v || 'This filed is required']"
              outlined
              dense
              label="Email"
            />
            <v-text-field
              v-model="password"
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
      </v-tabs-items>
    </v-card-text>
    <v-card-text style="background-color:rgba(128,128,128,0.3)">
      By signing up, you agree to our terms of service and privacy policy.
    </v-card-text>

    <v-card-actions
      style="justify-content:center;height:70px;background-color:#083b66;"
      class="flex-column"
    >
      <v-btn @click="onClick" text dark>{{ anchor }}</v-btn>
    </v-card-actions>

    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs
} from '@vue/composition-api'
import { ValidationProvider } from 'vee-validate'

import firebase, { auth } from '@/plugins/firebase'

type Tab = 'signin' | 'signup'
export default defineComponent({
  components: {
    ValidationProvider
  },

  setup(_, { emit }) {
    const tab = reactive<{ name: Tab }>({
      name: 'signin'
    })

    const anchor = computed(() => {
      return tab.name === 'signup' ? 'Sign Up' : 'Sign In'
    })

    const show = ref(false)
    const loading = ref(false)
    const credential = reactive({
      email: '',
      password: '',
      valid: false
    })

    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

    const signin = async () => {
      loading.value = true
      const result = await auth.signInWithPopup(provider).catch((e) => {
        loading.value = false
        console.error(e)
        throw new Error('Error')
      })
      loading.value = false

      console.log(result)
      emit('signin')
      // root.$router.push('/public')
    }

    const onClick = () => {
      tab.name === 'signin'
        ? signinWithEmail()
        : createUserWithEmailAndPassword()
    }

    const createUserWithEmailAndPassword = async () => {
      loading.value = true
      const { email, password, valid } = credential

      if (!email || !password || !valid) {
        loading.value = false
        throw new Error('Fetal Error')
      }

      const result = await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((e) => {
          console.error(e)
          loading.value = false
          throw new Error('heool')
        })
      loading.value = false
      console.log(11, result)
      emit('signup')
    }

    const signinWithEmail = async () => {
      loading.value = true
      const { email, password, valid } = credential

      if (!email || !password || !valid) {
        loading.value = false
        throw new Error('Fetal Error')
      }

      const result = await auth.createUserWithEmailAndPassword(email, password)
      loading.value = false

      console.log(11, result)
      emit('signin')
    }

    // const onClick = () => {
    //   root.$router.back()
    // }

    return {
      ...toRefs(tab),
      anchor,
      show,
      mdiEye,
      mdiEyeOff,
      mdiShieldKey,
      mdiEmail,
      mdiGoogle,
      mdiAccountBadgeHorizontal,
      createUserWithEmailAndPassword,
      mdiKey,
      signin,
      onClick,
      loading,
      signinWithEmail,
      ...toRefs(credential)
    }
  }
})
</script>
