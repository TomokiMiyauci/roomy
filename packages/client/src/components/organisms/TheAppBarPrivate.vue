<template>
  <v-app-bar fixed app clipped-right clipped-left>
    <template #default>
      <client-only>
        <v-btn
          v-if="$vuetify.breakpoint.mdAndDown"
          v-on="$listeners"
          fab
          absolute
          left
          bottom
          style="z-index:1000;"
          color="primary"
        >
          <v-icon>{{ mdiCommentPlus }}</v-icon></v-btn
        >
      </client-only>

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

      <base-button v-else @click="$router.push('/login')" icon>
        <base-icon>{{ mdiLogin }}</base-icon>
      </base-button>
    </template>

    <template
      v-if="$vuetify.breakpoint.mdAndDown"
      #extension
      style="z-index:-100;"
    >
      <v-tabs
        v-model="tabs"
        v-on="$listeners"
        style="z-index:-100;"
        grow
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>
        <span style="z-index:-100;width:80px;height:1px;"></span>
        <v-tab class="primary--text">
          favorite
          <v-icon>{{ mdiTagHeart }}</v-icon>
        </v-tab>

        <v-tab class="primary--text">
          hot
          <v-icon>{{ mdiFire }}</v-icon>
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { mdiCommentPlus, mdiFire, mdiLogin, mdiTagHeart } from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseAppBar from '@/components/organisms/BaseAppBar.vue'
import { auth } from '@/plugins/firebase'
import { createRoom } from '@/repositories/room'
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
    const tabs = ref(null)

    const logout = async () => {
      await auth.signOut()
      root.$router.push('/login')
    }

    return {
      mdiLogin,
      showMenu,
      logout,
      mdiCommentPlus,
      hide,
      createRoom,
      tabs,
      mdiTagHeart,
      mdiFire
    }
  }
})
</script>
