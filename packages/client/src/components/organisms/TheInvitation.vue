<template>
  <v-container class="fill-height">
    <v-row class="fill-height" justify="center" align="center">
      <v-col cols="auto">
        <v-card width="500px" max-width="300px">
          <v-toolbar dark dense color="primary">
            <v-toolbar-title>
              INVITATION
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row class="flex-column" align="center" justify="center">
              <v-col cols="auto">
                <v-avatar size="80px">
                  <img :src="photoURL" alt="avatar" />
                </v-avatar>
              </v-col>
              <v-col class="pa-0" cols="auto">
                <span class="display-1">{{ displayName }}</span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <!-- <v-card-title>
            Invite from hello
          </v-card-title> -->
          <v-card-actions>
            <v-btn @click="join" block>
              join
            </v-btn>
          </v-card-actions>
          <div v-if="!isLogin">
            <v-card-text class="pa-0 pl-2">
              You can login
            </v-card-text>
            <v-card-actions>
              <v-btn @click="login" block>login</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import firebase, { auth } from '@/plugins/firebase'
import { existsDoc, joinRoom } from '@/repositories/room'
import { user } from '@/store'
export default defineComponent({
  props: {
    displayName: {
      type: String,
      default: ''
    },

    photoURL: {
      type: String,
      default: ''
    }
  },

  setup(_, { root }) {
    const join = async () => {
      console.log(root.$route.query)

      const roomId = root.$route.query.roomId as string

      if (!(await existsDoc(`rooms/${roomId}/members/${user.id}`))) {
        await joinRoom(roomId, false)
      }

      root.$router.push(`/private/${root.$route.query.roomId}`)
    }

    const login = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

      const result = await auth.signInWithRedirect(provider).catch((e) => {
        const errorCode = e.code
        console.log(errorCode)
      })
      console.log(1111, result)
    }

    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        console.log(111, result)

        if (result.credential) {
          if (!result.user || !result.user.providerData.length) return
          console.log(121212)

          user.setUser(result.user)
          user.setId(user.id)
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          // ...
        }
      })
      .catch(function(error) {
        console.log(222, error)
      })

    const u = computed(() => user.login)

    return { join, login, isLogin: u }
  }
})
</script>
