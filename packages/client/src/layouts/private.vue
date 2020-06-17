<template>
  <v-app>
    <the-navigation-drawer-left />
    <the-navigation-drawer-right :rooms="rooms" />
    <the-app-bar-private
      :login="login"
      :photo-u-r-l="photoURL"
      @click="$nuxt.$emit('close')"
      @change="a"
    />

    <v-content>
      <nuxt />
    </v-content>
    <client-only>
      <the-bottom-navigation v-if="$vuetify.breakpoint.mdAndDown" />
    </client-only>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useFirestore } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { user } from '@/store'

export default defineComponent({
  middleware: ['gateKeeper'],

  components: {
    TheAppBarPrivate: () =>
      import('@/components/organisms/TheAppBarPrivate.vue'),
    TheNavigationDrawerLeft: () =>
      import('@/components/organisms/TheNavigationDrawerLeft.vue'),
    TheNavigationDrawerRight: () =>
      import('@/components/organisms/TheNavigationDrawerRight.vue'),
    TheBottomNavigation: () =>
      import('@/components/organisms/TheBottomNavigation.vue')
  },

  setup(_, { root }) {
    const { collectionRef } = roomReference()
    const { dataRef: rooms } = useFirestore(
      collectionRef.value
        .where('isPrivate', '==', true)
        .where('members', 'array-contains', user.id)
        .orderBy('recent.updatedAt', 'desc')
    )

    const a = (b: any) => {
      root.$nuxt.$emit('tab', b)
    }

    return { photoURL: user.photoURL, login: user.login, rooms, a }
  }
})
</script>
