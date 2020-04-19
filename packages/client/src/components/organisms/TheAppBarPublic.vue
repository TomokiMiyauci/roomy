<template>
  <v-app-bar fixed app clipped-right clipped-left>
    <template #default>
      <client-only>
        <ButtonCreateRoom
          v-if="$vuetify.breakpoint.mdAndDown"
          absolute
          left
          bottom
          :login="login"
          @click="$nuxt.$emit('close')"
        ></ButtonCreateRoom>
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
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { mdiCommentPlus, mdiFire, mdiLogin, mdiTagHeart } from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import ButtonCreateRoom from '@/components/molecules/ButtonCreateRoom.vue'
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
    BaseIcon,
    ButtonCreateRoom
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