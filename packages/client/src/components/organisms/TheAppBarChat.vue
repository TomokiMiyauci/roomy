<template>
  <base-app-bar app hide-on-scroll src="https://picsum.photos/1920/1080?random">
    <v-btn icon to="/public">
      <v-icon>{{ mdiArrowLeft }}</v-icon>
    </v-btn>
    <v-spacer />

    <base-button icon @click="$router.push('/host')">
      <base-icon>{{ mdiWifi }}</base-icon>
    </base-button>
  </base-app-bar>
</template>

<script lang="ts">
import { mdiArrowLeft, mdiWifi } from '@mdi/js'
import { createComponent } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import BaseAppBar from '@/components/organisms/BaseAppBar.vue'

export default createComponent({
  components: {
    BaseAppBar,
    BaseButton,
    BaseIcon
  },

  setup() {
    return { mdiArrowLeft, mdiWifi }
  }
})
</script>
