<template>
  <v-navigation-drawer expand-on-hover mini-variant left app>
    <v-list class="py-0">
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mdiHomeLock, mdiWeb } from '@mdi/js'
import { createComponent } from '@vue/composition-api'
export default createComponent({
  data() {
    return {
      items: [
        { title: 'Public', icon: mdiWeb, to: '/public' },
        { title: 'Private', icon: mdiHomeLock, to: '/private' }
      ]
    }
  },
  computed: {
    bg() {
      return this.background
        ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
        : undefined
    }
  }
})
</script>
