<template>
  <base-app-bar app hide-on-scroll clipped-left clipped-right>
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
import { mdiLogin } from '@mdi/js'
import { createComponent, ref } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseAppBar from '@/components/organisms/BaseAppBar.vue'
import { auth } from '@/plugins/firebase'
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
    const showMenu = ref(false)

    const logout = async () => {
      await auth.signOut()
      root.$router.push('/login')
    }
    return { mdiLogin, showMenu, logout }
  }
})
</script>
