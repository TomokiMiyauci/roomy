<template>
  <base-app-bar fixed app clipped-right clipped-left>
    <client-only>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        fab
        absolute
        left
        bottom
        color="primary"
        v-on="$listeners"
      >
        <v-icon>{{ mdiCommentPlus }}</v-icon></v-btn
      >
    </client-only>

    <v-spacer />
    <v-menu
      v-if="login"
      v-model="showMenu"
      transition="slide-x-transition"
      close-on-content-click
      offset-y
      :nudge-bottom="12"
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
            <img :src="photoURL" />
          </v-avatar>
        </v-hover>
      </template>
      <v-card>
        <v-btn @click="logout">Logout</v-btn>
      </v-card>
    </v-menu>

    <base-button v-else icon @click="$router.push('/login')">
      <base-icon>{{ mdiLogin }}</base-icon>
    </base-button>
  </base-app-bar>
</template>

<script lang="ts">
import { mdiCommentPlus, mdiLogin } from '@mdi/js'
import { computed, createComponent, ref } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseAppBar from '@/components/organisms/BaseAppBar.vue'
import { auth } from '@/plugins/firebase'
import { createRoom } from '@/repositories/room'
export default createComponent({
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
      await auth.signOut()
      root.$router.push('/login')
    }
    return { mdiLogin, showMenu, logout, mdiCommentPlus, hide, createRoom }
  }
})
</script>
