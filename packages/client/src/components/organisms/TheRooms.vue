<template>
  <v-list two-two>
    <v-subheader inset>Recent</v-subheader>
    <transition-group name="vue-anime-list">
      <!-- <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider> -->

      <room-set
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        @click:qrcode="$emit('open:qrcode', room)"
      />
    </transition-group>
    <template v-if="!rooms.length">
      <v-skeleton-loader
        v-for="i in 12"
        :key="i"
        tile
        type="list-item-avatar-three-line"
      ></v-skeleton-loader>
    </template>
  </v-list>
</template>

<script lang="ts">
import { mdiAccountCircle, mdiHomePlus, mdiNewBox } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import RoomSet from '@/components/molecules/RoomSet.vue'
import { createRoom } from '@/repositories/room'
import { PrivateRoom, PublicRoom } from '@/types/core'
export default defineComponent({
  layout: 'app',

  components: {
    RoomSet
  },

  props: {
    rooms: {
      type: Array as () => PrivateRoom[] | PublicRoom[],
      default: []
    }
  },

  setup() {
    return {
      mdiNewBox,
      mdiAccountCircle,
      mdiHomePlus,
      createRoom
    }
  }
})
</script>

<style lang="scss">
.vue-anime-list {
  &-enter-active {
    transform: translateX(50px);
    opacity: 0;
    transition: {
      property: transform, opacity;
      duration: 0.6s;
      timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      delay: 0s;
    }
  }
  &-enter-to {
    transform: translateX(0);
    opacity: 1;
  }
  &-leave-active {
    transform: translateX(0);
    opacity: 1;
    transition: {
      property: transform, opacity;
      duration: 0.6s;
      timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      delay: 0s;
    }
  }
  &-leave-to {
    transform: translateX(50px);
    opacity: 0;
  }
  &-move {
    transition: {
      property: transform;
      duration: 0.6s;
      timing-function: cubic-bezier(0.77, 0, 0.175, 1);
      delay: 0s;
    }
  }
}
</style>
