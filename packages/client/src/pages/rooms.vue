<template>
  <div>
    <the-rooms :rooms="rooms" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TheRooms from '@/components/organisms/TheRooms.vue'
import { useFirestore } from '@/core/useFirestore'
import { firestore } from '@/plugins/firebase'
export default defineComponent({
  layout: 'app',

  components: {
    TheRooms
  },

  setup() {
    const { dataRef: rooms } = useFirestore(firestore.collection('rooms'))

    return { rooms }
  }
})
</script>
