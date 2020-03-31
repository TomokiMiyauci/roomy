<template>
  <v-card max-width="450" class="mx-auto">
    <v-list two-two>
      <v-btn fab color="success" @click="createRoom">
        <v-icon>{{ mdiHomePlus }}</v-icon>
      </v-btn>
      <transition-group class="list" name="vue-anime-list">
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

        <room-set v-for="room in rooms" :key="room.id" :room="room" />
      </transition-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { mdiAccountCircle, mdiHomePlus, mdiNewBox } from '@mdi/js'
import { createComponent } from '@vue/composition-api'

import RoomSet from '@/components/molecules/RoomSet.vue'
import { createRoom } from '@/repositories/room'
import { Room } from '@/types/core'
export default createComponent({
  layout: 'app',

  components: {
    RoomSet
  },

  props: {
    rooms: {
      type: Array as () => Room[],
      default: []
    }
  },

  setup() {
    return { mdiNewBox, mdiAccountCircle, mdiHomePlus, createRoom }
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
