<template>
  <v-container class="fill-height">
    <client-only>
      <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        @click="onClick"
        top
        style="top:10px;"
        left
        absolute
        fab
      >
        <v-icon>{{ mdiArrowLeft }}</v-icon>
      </v-btn>
    </client-only>
    <v-row justify="center" align="center">
      <form-sign @signin="onCreate" @signup="onCreate" />
    </v-row>
    <!-- <v-row justify="center" align="center">
      <v-card min-width="320px" max-width="320px">
        <v-card-title class="display-1" style="justify-content:center;">
          Login
        </v-card-title>
        <v-card-text>
          Welcome to roomy
        </v-card-text>

        <v-card-title style="justify-content:center;">
          <v-icon :size="250" color="purple">{{ mdiWebpack }}</v-icon>
        </v-card-title>
        <v-card-text>
          Signed in with
        </v-card-text>
        <v-card-actions>
          <v-btn @click="signin" block class="white--text" color="blue">
            <v-icon color="red" left>{{ mdiGoogle }}</v-icon
            >oogle</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-row> -->
  </v-container>
</template>

<script lang="ts">
import { mdiArrowLeft, mdiGoogle, mdiWebpack } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  layout: 'plain',

  components: {
    FormSign: () => import('@/components/organisms/FormSign.vue')
  },

  setup(_, { root }) {
    const onClick = () => {
      root.$router.back()
    }

    const onCreate = () => {
      root.$router.push('/public')
    }
    return { mdiGoogle, mdiWebpack, mdiArrowLeft, onClick, onCreate }
  }
})
</script>
