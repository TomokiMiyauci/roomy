<template>
  <the-invitation :displayName="displayName" :photoURL="photoURL" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import TheInvitation from '@/components/organisms/TheInvitation.vue'
import { firestore } from '@/plugins/firebase'
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

  setup(_, { root }) {
    const state = reactive({
      displayName: '',
      photoURL: ''
    })

    const get = async () => {
      const { roomId } = root.$route.query

      const doc = await firestore
        .collection('rooms')
        .doc(roomId as string)
        .collection('members')
        .where('isHost', '==', true)
        .limit(1)
        .get()

      doc.forEach((doc1) => {
        const { displayName, photoURL } = doc1.data()
        state.displayName = displayName
        state.photoURL = photoURL
      })
    }

    get()

    return { ...toRefs(state), get }
  }
})
</script>
