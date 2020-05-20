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
            <input-text-email v-model.trim="email" />
            <input-password v-model="password" />
          </v-form>
        </v-tab-item>
        <v-tab-item value="signup">
          <v-form v-model="valid">
            <input-text-email v-model.trim="email" />
            <input-password-progress v-model="password" />
          </v-form>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-text style="background-color:rgba(128,128,128,0.3)">
      By signing up, you agree to our terms of service and
      <nuxt-link target="_blank" to="/privacy">privacy policy.</nuxt-link>
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
  mdiGoogle,
  mdiKey
} from '@mdi/js'
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  watch
} from '@vue/composition-api'

import InputTextEmail from '@/components/atoms/InputTextEmail.vue'
import InputPassword from '@/components/molecules/InputPassword.vue'
import InputPasswordProgress from '@/components/molecules/InputPasswordProgress.vue'
import { wait } from '@/core/useTime'
import firebase, { auth, firestore } from '@/plugins/firebase'
const sub = (): Promise<void> => {
  return new Promise((resolve) => {
    const uid = auth.currentUser!.uid
    console.log(uid)

    const unsubscribe = firestore
      .collection('profiles')
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
    InputTextEmail,
    InputPassword,
    InputPasswordProgress
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

    return {
      ...toRefs(tab),
      anchor,
      show,
      mdiGoogle,
      mdiAccountBadgeHorizontal,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      mdiKey,
      signin,
      onClick,
      ...toRefs(credential),
      credential,
      mdiAlert,
      mdiCheckCircle,
      ...toRefs(overlay)
    }
  }
})
</script>
