<template>
  <div>
    <the-rooms :rooms="rooms" />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

import TheRooms from '@/components/organisms/TheRooms.vue'
import { useFirestore } from '@/core/useFirestore'
import { firestore } from '@/plugins/firebase'
export default createComponent({
  layout: 'app',

  components: {
    TheRooms
  },

  setup() {
    const rooms = useFirestore(firestore.collection('rooms'))

    return { rooms }
  }
})
</script>
