<template>
  <v-navigation-drawer width="25%" right clipped app>
    <v-tabs v-model="tab" :class="fillHeight" centered>
      <v-tab href="#view-history">
        <v-icon left>{{ mdiHistory }}</v-icon>

        <v-badge
          :value="sumUnread"
          :content="sumUnread"
          color="primary"
          offset-y="-3"
        />
      </v-tab>

      <v-tab href="#favorite-rooms">
        <v-icon left>{{ mdiHeartFlash }}</v-icon>
      </v-tab>

      <v-tab href="#owner-rooms">
        <v-icon left>{{ mdiHomeHeart }}</v-icon>
      </v-tab>

      <v-tabs-items v-model="tab" :class="fillHeight">
        <v-divider />

        <v-tab-item :class="fillHeight" value="view-history">
          <TheRooms :rooms="viewHistories" v-on="$listeners" />
        </v-tab-item>
        <v-tab-item :class="fillHeight" value="favorite-rooms">
          <TheRooms v-if="login" :rooms="favoriteRooms" v-on="$listeners" />
          <prompt-login v-else />
        </v-tab-item>
        <v-tab-item :class="fillHeight" value="owner-rooms">
          <TheRooms v-if="login" :rooms="favoriteRooms" v-on="$listeners" />
          <prompt-login v-else />
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  mdiFire,
  mdiFlashRedEye,
  mdiHeartFlash,
  mdiHistory,
  mdiHomeHeart
} from '@mdi/js'
import { computed, defineComponent, ref } from '@vue/composition-api'

import TheRooms from '@/components/organisms/TheRooms.vue'
import { PublicRoom } from '~types/core'

type Props = {
  viewHistories: PublicRoom[]
  login: boolean
}

export default defineComponent({
  props: {
    login: {
      type: Boolean,
      default: false
    },

    rooms: {
      type: Array as () => PublicRoom[],
      default: () => []
    },

    viewHistories: {
      type: Array,
      default: () => []
    },

    favoriteRooms: {
      type: Array,
      default: () => []
    }
  },

  components: {
    TheRooms,
    PromptLogin: () => import('@/components/molecules/PromptLogin.vue')
  },

  setup(props: Props) {
    const tab = ref(0)

    const fillHeight = computed(() => {
      return { 'fill-height': !props.login }
    })
    const sumUnread = computed(() => {
      return props.viewHistories.reduce((acc, obj) => {
        return acc + obj.messageDiff!
      }, 0)
    })

    return {
      mdiHistory,
      mdiFire,
      mdiFlashRedEye,
      mdiHeartFlash,
      mdiHomeHeart,
      sumUnread,
      tab,
      fillHeight
    }
  }
})
</script>
