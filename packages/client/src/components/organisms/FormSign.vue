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
            <v-text-field
              v-model="email"
              :prepend-inner-icon="mdiEmail"
              :rules="[required, isEmail]"
              type="email"
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
              :rules="[required]"
              outlined
              dense
              label="Password"
            />
          </v-form>
        </v-tab-item>
        <v-tab-item value="signup">
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              :prepend-inner-icon="mdiEmail"
              :rules="[required, isEmail]"
              outlined
              dense
              label="Email"
            >
            </v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? mdiEye : mdiEyeOff"
              :type="show ? 'text' : 'password'"
              :prepend-inner-icon="mdiShieldKey"
              @click:append="show = !show"
              :rules="[
                required,
                (v) => v.length >= 8 || 'At least 8 characters'
              ]"
              outlined
              dense
              counter
              hint="At least 8 characters"
              label="Password"
              loading
            >
              <template v-slot:progress>
                <v-progress-linear
                  :value="progress"
                  :color="color"
                  absolute
                  height="7"
                ></v-progress-linear> </template
            ></v-text-field>
          </v-form>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-text style="background-color:rgba(128,128,128,0.3)">
      By signing up, you agree to our terms of service and privacy policy.
    </v-card-text>

    <v-overlay :value="loading" absolute>
      <div v-if="fail">
        <v-icon color="warning" size="70">{{ mdiAlert }}</v-icon>
        <div>Fail sign in</div>
      </div>

      <div v-else-if="success">
        <v-icon color="green" size="70">{{ mdiCheckCircle }}</v-icon>
        <div>Success</div>
      </div>

      <div v-else>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
        <div>Signing in...</div>
      </div>
    </v-overlay>

    <v-card-actions
      :style="{ backgroundColor: valid ? '#083b66' : 'grey' }"
      style="justify-content:center;height:70px;"
      class="flex-column"
    >
      <v-btn @click="onClick" :disabled="!valid" block text dark>{{
        anchor
      }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  mdiAccountBadgeHorizontal,
  mdiAlert,
  mdiCheckCircle,
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
  toRefs,
  watch
} from '@vue/composition-api'
import { ValidationProvider } from 'vee-validate'

import { wait } from '@/core/useTime'
import firebase, { auth, firestore } from '@/plugins/firebase'

const sub = (): Promise<void> => {
  return new Promise((resolve) => {
    const uid = auth.currentUser!.uid
    console.log(uid)

    const unsubscribe = firestore
      .collection('profile')
      .doc(uid)
      .onSnapshot(async (snapshot) => {
        if (!snapshot.exists) return

        await auth.currentUser!.reload()
        unsubscribe()
        resolve()
      })
  })
}
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

    const overlay = reactive({
      loading: false,
      fail: false,
      success: false
    })

    const credential = reactive({
      email: '',
      password: '',
      valid: false
    })

    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

    watch(
      () => overlay.fail,
      async (now) => {
        if (now) {
          await wait(800)
          overlay.loading = false
          overlay.fail = false
        }
      }
    )

    watch(
      () => overlay.success,
      async (now) => {
        if (now) {
          await wait(800)
          overlay.loading = false
          overlay.success = false
          emit('signin')
        }
      }
    )

    const signin = async () => {
      overlay.loading = true
      const result = await auth.signInWithPopup(provider).catch((e) => {
        overlay.loading = false
        console.error(e)
        throw new Error('Error')
      })
      overlay.loading = false

      console.log(result)
      emit('signin')
      // root.$router.push('/public')
    }

    const onClick = () => {
      tab.name === 'signin'
        ? signInWithEmailAndPassword()
        : createUserWithEmailAndPassword()
    }

    const signInWithEmailAndPassword = async () => {
      overlay.loading = true
      const { email, password, valid } = credential

      if (!email || !password || !valid) {
        overlay.loading = false
        throw new Error('Fetal Error')
      }
      const result = await auth
        .signInWithEmailAndPassword(email, password)
        .catch((e) => {
          overlay.fail = true

          console.error(e)
        })

      if (!result) throw new Error('Fatal Error')
      overlay.success = true
    }
    const createUserWithEmailAndPassword = async () => {
      overlay.loading = true
      const { email, password, valid } = credential

      if (!email || !password || !valid) {
        overlay.loading = false
        throw new Error('Fetal Error')
      }

      await auth.createUserWithEmailAndPassword(email, password).catch((e) => {
        console.error(e)
        overlay.loading = false
        throw new Error('heool')
      })

      await sub()

      // const firstLetter = result.user!.email!.charAt(0).toUpperCase()

      // await result.user!.updateProfile({
      //   displayName: firstLetter
      // })

      overlay.loading = false
      // console.log(11, result)
      emit('signup')
    }

    const required = (text: string | number) => {
      return !!text || 'This filed is required'
    }

    const isEmail = (text: string | number) => {
      return (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          text.toString()
        ) || 'Invalid Email format'
      )
    }

    const progress = computed(() => {
      return Math.min(100, credential.password.length * 10)
    })

    const color = computed(() => {
      return ['error', 'warning', 'success'][Math.floor(progress.value / 40)]
    })

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
      signInWithEmailAndPassword,
      mdiKey,
      signin,
      onClick,
      ...toRefs(credential),
      required,
      isEmail,
      progress,
      color,
      mdiAlert,
      mdiCheckCircle,
      ...toRefs(overlay)
    }
  }
})
</script>
