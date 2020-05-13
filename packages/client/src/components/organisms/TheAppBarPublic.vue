<template>
  <v-app-bar color="primary" fixed app clipped-right clipped-left>
    <template #default>
      <client-only>
        <h1
          v-if="!$vuetify.breakpoint.mdAndDown"
          style="color:#212121;text-shadow:1px 1px 3px #FBC02D;"
        >
          Roo<span
            style=" margin-left:4px;padding:0 5px;color:white;text-shadow:1px 1px 0 #000;background-color:#FFAB00;border-radius:5px;box-shadow:1px 1px 3px #000;"
            >my</span
          >
        </h1>
        <ButtonCreateRoom
          v-if="$vuetify.breakpoint.mdAndDown"
          :login="login"
          @click="$nuxt.$emit('close')"
          absolute
          left
          bottom
        ></ButtonCreateRoom>

        <v-spacer />

        <ButtonQrcodeReader @click="$emit('scan')" />

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
                color="secondary"
              >
                <img v-if="photoURL" :src="photoURL" alt="avatar" />
                <span v-else class="white--text headline">{{
                  displayName
                }}</span>
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
      </client-only>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { mdiCommentPlus, mdiFire, mdiLogin, mdiTagHeart } from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import ButtonCreateRoom from '@/components/molecules/ButtonCreateRoom.vue'
import ButtonQrcodeReader from '@/components/molecules/ButtonQrcodeReader.vue'
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
    },

    displayName: {
      type: String,
      default: ''
    }
  },

  components: {
    BaseAppBar,
    BaseButton,
    BaseIcon,
    ButtonCreateRoom,
    ButtonQrcodeReader
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
