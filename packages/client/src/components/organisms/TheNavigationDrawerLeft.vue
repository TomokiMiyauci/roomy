<template>
  <v-navigation-drawer
    ref="navigation"
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
        <v-container v-if="isMouseover">
          <v-row align="center" justify="center" class="flex-column">
            <v-col cols="auto">
              <v-avatar :size="100">
                <img v-if="login" :src="lo" alt="avatar" />
                <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
              </v-avatar>
            </v-col>
            <v-col class="pa-0 pb-5" cols="auto">
              {{ login ? username : 'Anonymous' }}
            </v-col>
          </v-row>
          <v-row class="pt-5">
            <v-btn v-if="login" @click="signout" block>logout</v-btn>
            <v-btn v-else @click="$router.push('/login')" block>login</v-btn>
          </v-row>
        </v-container>

        <template v-else>
          <v-list-item-avatar>
            <img v-if="login" :src="lo" alt="avatar" />

            <v-icon v-else>{{ mdiAccountCircle }}</v-icon>
          </v-list-item-avatar>
        </template>
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
          <v-list-item-group v-model="item" color="teal">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :to="login ? item.to : ''"
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
import { mdiAccountCircle, mdiHomeLock, mdiWeb } from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import { signOut } from '@/repositories/auth'
import { user } from '@/store'
export default defineComponent({
  components: {
    CardSigninPrompt: () =>
      import('@/components/molecules/CardSigninPrompt.vue')
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
