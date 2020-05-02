<template>
  <v-bottom-navigation
    color="secondary"
    app
    fixed
    grow
    background-color="primary"
  >
    <v-btn to="/public">
      <span>Public</span>
      <v-icon>{{ mdiWeb }}</v-icon>
    </v-btn>

    <v-menu
      v-model="menu"
      close-on-click
      close-on-content-click
      open-on-click
      top
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn :to="login ? '/private' : ''" v-on="on" nuxt>
          <span>Private</span>
          <v-icon>{{ mdiHomeLock }}</v-icon>
        </v-btn>
      </template>
      <card-signin-prompt @close="menu = false" />
    </v-menu>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { mdiHomeLock, mdiWeb } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  components: {
    CardSigninPrompt: () =>
      import('@/components/molecules/CardSigninPrompt.vue')
  },

  props: {
    login: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    const menu = ref(false)
    return { mdiWeb, mdiHomeLock, menu }
  }
})
</script>
