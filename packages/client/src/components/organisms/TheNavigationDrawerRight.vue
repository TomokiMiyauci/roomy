<template>
  <v-navigation-drawer :width="350" right clipped app>
    <TheRooms :rooms="rooms" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import TheRooms from '@/components/organisms/TheRooms.vue'
import { useFirestore } from '@/core/useFirestore'
import { firestore } from '@/plugins/firebase'
export default createComponent({
  components: {
    TheRooms
  },

  setup() {
    const rooms = useFirestore(
      firestore.collection('rooms').orderBy('recent.updatedAt', 'desc')
    )

    return { rooms }
  }
})
</script>
