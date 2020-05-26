<template>
  <v-row class="flex-column fill-height" justify="center" align="center">
    <v-col cols="auto">
      <span class="title">
        <v-icon color="primary" left>{{ mdiInformation }}</v-icon>
        Require Signin
      </span>
    </v-col>
    <v-col cols="auto">
      <button-login />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mdiInformation } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import ButtonLogin from '@/components/molecules/ButtonLogin.vue'

export default defineComponent({
  components: {
    ButtonLogin
  },

  setup() {
    return { mdiInformation }
  }
})
</script>
