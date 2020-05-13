<template>
  <v-navigation-drawer
    ref="navigation"
    aria-label="nav-left"
    color="rgba(200,200,200)"
    expand-on-hover
    mini-variant
    clipped
    left
    app
  >
    <v-list dense nav class="py-0">
      <v-list-item
        :style="{ margin: isMouseover ? '0 0 0 0' : '0 0 176px 0' }"
        two-line
        class="px-0"
      >
        <transition name="fade-quick">
          <v-container v-if="isMouseover">
            <avatar-name-large
              :login="login"
              :displayName="username"
              :photoURL="lo"
              @edit="$emit('edit')"
            />

            <v-row class="pt-5">
              <v-btn v-if="login" @click="signout" block>logout</v-btn>
              <v-btn v-else @click="$router.push('/login')" block>login</v-btn>
            </v-row>
          </v-container>

          <template v-else>
            <v-list-item-avatar :color="username ? 'secondary' : ''">
              <client-only>
                <img v-if="login && lo" :src="lo" alt="avatar" />

                <span
                  v-else-if="login && username"
                  class="white--text headline"
                  >{{ username }}</span
                >

                <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
              </client-only>
            </v-list-item-avatar>
          </template>
        </transition>
      </v-list-item>

      <v-divider class="pb-1"></v-divider>
      <v-menu
        offset-x
        open-on-hover
        open-on-click
        close-on-click
        close-on-content-click
        open-delay="200"
        close-delay="200"
      >
        <template #activator="{on}">
          <v-list-item-group v-model="item" color="teal" aria-label="nav">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="item.to"
              v-on="!login && item.auth ? on : ''"
              link
              nuxt
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </template>

        <card-signin-prompt :login="login" />
      </v-menu>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import '@/assets/variables.scss'

import { mdiAccountCircle, mdiHomeLock, mdiPencil, mdiWeb } from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import AvatarNameLarge from '@/components/molecules/AvatarNameLarge.vue'
import { signOut } from '@/repositories/auth'
import { user } from '@/store'
export default defineComponent({
  components: {
    CardSigninPrompt: () =>
      import('@/components/molecules/CardSigninPrompt.vue'),
    AvatarNameLarge
  },
  setup(_, { root }) {
    const navigation = ref<any>()
    const item = ref(0)
    const items = [
      { title: 'Public', icon: mdiWeb, to: '/public' },
      { title: 'Private', icon: mdiHomeLock, to: '/private', auth: true }
    ]

    const isMouseover = computed(() => {
      return navigation.value ? navigation.value.isMouseover : false
    })

    const signout = async () => {
      await signOut()
      root.$router.push('/login')
    }

    return {
      mdiPencil,
      items,
      mdiAccountCircle,
      lo: user.photoURL,
      login: user.login,
      username: user.displayName,
      isMouseover,
      navigation,
      signout,
      item
    }
  }
})
</script>
