<template>
  <v-bottom-navigation
    class="d-lg-none d-md-flex"
    app
    :value="activeBtn"
    grow
    color="teal"
  >
    <v-btn to="/public">
      <span>Public</span>
      <v-icon>{{ mdiWeb }}</v-icon>
    </v-btn>

    <v-btn to="/private">
      <span>Private</span>
      <v-icon>{{ mdiHomeLock }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { mdiHomeLock, mdiWeb } from '@mdi/js'
import { createComponent, ref } from '@vue/composition-api'
export default createComponent({
  setup() {
    const activeBtn = ref(0)
    return { activeBtn, mdiWeb, mdiHomeLock }
  }
})
</script>
