<template>
  <v-card>
    <v-toolbar dense flat>
      <v-btn @click="$emit('close')" icon>
        <v-icon>{{ mdiClose }}</v-icon></v-btn
      >
    </v-toolbar>
    <v-banner>
      <v-avatar slot="icon" color="deep-purple accent-4">
        <v-icon small color="white">
          {{ mdiLock }}
        </v-icon>
      </v-avatar>

      This feature needs signin

      <template #actions>
        <v-btn nuxt to="/login" text color="deep-purple accent-4">
          <v-icon left>{{ mdiLogin }}</v-icon>
          signin
        </v-btn>
      </template>
    </v-banner>
    <!-- <v-card-text> This need signin. </v-card-text>
    <v-card-actions>
      <v-btn nuxt to="/login" block>
        <v-icon left>{{ mdiLogin }}</v-icon
        >Signin</v-btn
      >
    </v-card-actions> -->
  </v-card>
</template>

<script lang="ts">
import { mdiClose, mdiLock, mdiLogin } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return {
      mdiClose,
      mdiLogin,
      mdiLock
    }
  }
})
</script>
