<template>
  <v-navigation-drawer :width="350" right clipped app>
    <TheRooms :rooms="rooms" />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import TheRooms from '@/components/organisms/TheRooms.vue'
import { useFirestore } from '@/core/useFirestore'
import { roomReference } from '@/core/useFirestoreReference'
import { user } from '@/store'

export default createComponent({
  components: {
    TheRooms
  },

  setup() {
    const { collectionRef } = roomReference()
    const rooms = useFirestore(
      collectionRef.value
        .where('isPrivate', '==', true)
        .where('members', 'array-contains', user.id)
        .orderBy('recent.updatedAt', 'desc')
    )

    return { rooms }
  }
})
</script>
