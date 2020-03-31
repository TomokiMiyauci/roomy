<template>
  <v-list-item :to="`/public/${room.id}`">
    <v-list-item-avatar tile>
      <v-icon v-if="room.photoURL" color="primary">{{ room.photoURL }}</v-icon>
      <v-icon v-else color="primary">{{ mdiNewBox }}</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        {{ room.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <v-avatar color="grey" size="24">
          <v-icon v-if="room.recent.isAnonymous">{{ mdiAccountCircle }}</v-icon>
          <img
            v-else
            :src="room.recent.contributor.photoURL"
            alt="user image"
          />
        </v-avatar>
        {{ room.recent.message }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon>
        <v-icon color="grey lighten-1">mdi-information</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { mdiAccountCircle, mdiNewBox } from '@mdi/js'
import { createComponent } from '@vue/composition-api'

import { Room } from '@/types/core'
export default createComponent({
  layout: 'app',

  props: {
    room: {
      type: Object as () => Room,
      required: true
    }
  },

  setup() {
    return { mdiNewBox, mdiAccountCircle }
  }
})
</script>
