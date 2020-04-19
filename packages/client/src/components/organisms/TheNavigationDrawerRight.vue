<template>
  <v-navigation-drawer :width="350" right clipped app>
    <TheRooms :rooms="rooms" v-on="$listeners" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TheRooms from '@/components/organisms/TheRooms.vue'
import { PrivateRoom, PublicRoom } from '@/types/core'

export default defineComponent({
  props: {
    rooms: {
      type: Array as () => (PrivateRoom | PublicRoom)[],
      default: () => []
    }
  },

  components: {
    TheRooms
  }
})
</script>
