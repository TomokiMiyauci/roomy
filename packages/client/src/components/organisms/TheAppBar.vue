<template>
  <base-app-bar color="primary" fixed app>
    <v-btn
      @click="createRoom"
      fab
      absolute
      left
      bottom
      color="primary"
      aria-label="create room"
    >
      <v-icon>{{ mdiCommentPlus }}</v-icon></v-btn
    >

    <v-spacer />
    <v-menu
      v-if="login"
      v-model="showMenu"
      :nudge-bottom="12"
      transition="slide-x-transition"
      close-on-content-click
      offset-y
      style="max-width: 600px"
    >
      <template #activator="{ on: click }">
        <v-hover #default="{ hover }">
          <v-avatar
            :class="{ 'elevation-5': hover }"
            :style="{ cursor: hover ? 'pointer' : 'default' }"
            :elevation="hover ? 12 : 2"
            v-on="click"
          >
            <img :src="photoURL" alt="avatar" />
          </v-avatar>
        </v-hover>
      </template>
      <v-card>
        <v-btn @click="logout">Logout</v-btn>
      </v-card>
    </v-menu>

    <base-button v-else @click="$router.push('/login')" aria-label="login" icon>
      <base-icon>{{ mdiLogin }}</base-icon>
    </base-button>
  </base-app-bar>
</template>

<script lang="ts">
import { mdiCommentPlus, mdiLogin } from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseAppBar from '@/components/organisms/BaseAppBar.vue'
import { signOut } from '@/repositories/auth'
import { createRoom } from '@/repositories/publicRoom'
export default defineComponent({
  props: {
    photoURL: {
      type: String,
      default: ''
    },

    login: {
      type: Boolean,
      default: false
    }
  },

  components: {
    BaseAppBar,
    BaseButton,
    BaseIcon
  },

  setup(_, { root }) {
    const hide = computed(() => root.$vuetify.breakpoint.mdAndDown)
    const showMenu = ref(false)

    const logout = async () => {
      await signOut()
      root.$router.push('/login')
    }
    return { mdiLogin, showMenu, logout, mdiCommentPlus, hide, createRoom }
  }
})
</script>
