<template>
  <the-invitation />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import TheInvitation from '@/components/organisms/TheInvitation.vue'

export default defineComponent({
  layout: 'plain',

  components: {
    TheInvitation
  },

  middleware: ['roomKeeper'],

  // validate({ query }: { query: any }) {
  //   console.log(query.key)

  //   return !!query.key
  // },

  setup() {}
})
</script>
