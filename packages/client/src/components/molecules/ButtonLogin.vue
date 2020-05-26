<template>
  <base-button
    v-bind="$attrs"
    @click="$router.push(location)"
    color="secondary"
    icon
  >
    <base-icon>{{ mdiLogin }}</base-icon>
  </base-button>
</template>

<script lang="ts">
import { mdiLogin } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseIcon from '@/components/atoms/BaseIcon.vue'

export default defineComponent({
  components: {
    BaseButton,
    BaseIcon
  },

  props: {
    location: {
      type: String,
      default: '/login'
    }
  },

  setup() {
    return { mdiLogin }
  }
})
</script>
