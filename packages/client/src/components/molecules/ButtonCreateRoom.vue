<template>
  <v-menu v-bind="$attrs" open-on-hover open-on-click>
    <template #activator="{ on: menu }">
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            v-bind="$attrs"
            :color="login ? 'secondary' : 'grey'"
            v-on="menu"
            @click="login ? $emit('click') : ''"
            @mouseenter="on.mouseenter"
            @focus="on.mouseenter"
            @mouseleave="on.mouseleave"
            @blur="on.mouseleave"
            fab
          >
            <v-icon>{{ mdiCommentPlus }}</v-icon></v-btn
          >
        </template>
        <span>Create Room</span>
      </v-tooltip>
    </template>
    <card-signin-prompt v-if="!login"></card-signin-prompt>
  </v-menu>
</template>

<script lang="ts">
import { mdiCommentPlus } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

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
    return { mdiCommentPlus }
  }
})
</script>
