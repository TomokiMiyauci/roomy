<template>
  <v-app-bar fixed app clipped-right clipped-left color="primary">
    <template #default>
      <client-only>
        <v-btn
          v-if="$vuetify.breakpoint.mdAndDown"
          @click="$router.back()"
          icon
        >
          <v-icon>{{ mdiArrowLeft }}</v-icon>
        </v-btn>
      </client-only>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />

      <base-button @click="extension = !extension" icon>
        <base-icon>{{ mdiChevronDown }}</base-icon>
      </base-button>
    </template>
    <template :v-if="extension" #extension>
      <v-tabs @change="onChange" centered>
        <v-tab href="#message">Message</v-tab>
        <v-tab href="#stream">Stream</v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { mdiArrowLeft, mdiChevronDown, mdiWifi } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

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

  setup(_, { emit }) {
    const extension = ref(false)
    const onChange = (a: any) => {
      console.log(a)
      emit('tabchange', a)
    }

    return { mdiArrowLeft, mdiWifi, mdiChevronDown, extension, onChange }
  }
})
</script>
