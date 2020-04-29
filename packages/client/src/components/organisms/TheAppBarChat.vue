<template>
  <base-app-bar fixed app clipped-right clipped-left color="primary">
    <client-only>
      <v-btn v-if="$vuetify.breakpoint.mdAndDown" icon @click="$router.back()">
        <v-icon>{{ mdiArrowLeft }}</v-icon>
      </v-btn>
    </client-only>

    <v-toolbar-title>{{ title }}</v-toolbar-title>

    <v-spacer />

    <base-button icon @click="$router.push('/host')">
      <base-icon>{{ mdiWifi }}</base-icon>
    </base-button>
  </base-app-bar>
</template>

<script lang="ts">
import { mdiArrowLeft, mdiWifi } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseAppBar from '@/components/organisms/BaseAppBar.vue'

export default defineComponent({
  components: {
    BaseAppBar,
    BaseButton,
    BaseIcon
  },

  props: {
    title: {
      type: String,
      default: ''
    }
  },

  setup() {
    return { mdiArrowLeft, mdiWifi }
  }
})
</script>
