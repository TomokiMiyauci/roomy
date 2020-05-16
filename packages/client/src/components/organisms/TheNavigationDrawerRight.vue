<template>
  <v-navigation-drawer :width="350" right clipped app>
    <!-- <TheRooms :rooms="rooms" v-on="$listeners" /> -->
    <v-tabs v-model="tab">
      <v-tab>
        <v-icon left>{{ mdiFire }}</v-icon>
        Hot
      </v-tab>
      <v-tab>
        <v-icon left>{{ mdiHistory }}</v-icon>

        History
        <v-badge
          :value="sumUnread"
          :content="sumUnread"
          color="primary"
          offset-y="-3"
        />
      </v-tab>
    </v-tabs>
    <v-divider />
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <TheRooms :rooms="rooms" v-on="$listeners" />
      </v-tab-item>

      <v-tab-item>
        <TheRooms :rooms="viewHistories" v-on="$listeners" />
      </v-tab-item>
    </v-tabs-items>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { mdiFire, mdiHistory } from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import TheRooms from '@/components/organisms/TheRooms.vue'
import { PublicRoom } from '~types/core'

type Props = {
  viewHistories: PublicRoom[]
}

export default defineComponent({
  props: {
    rooms: {
      type: Array as () => PublicRoom[],
      default: () => []
    },

    viewHistories: {
      type: Array,
      default: () => []
    }
  },

  components: {
    TheRooms
  },

  setup(props: Props) {
    const tab = ref(0)
    const sumUnread = computed(() => {
      return props.viewHistories.reduce((acc, obj) => {
        return acc + obj.messageDiff!
      }, 0)
    })

    return { mdiHistory, mdiFire, sumUnread, tab }
  }
})
</script>
