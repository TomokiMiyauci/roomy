<template>
  <v-row no-gutters align="center" class="flex-column">
    <v-col cols="auto" style="position:relative;">
      <AvatarLarge v-bind="$props" />
      <v-btn
        v-if="disableEdit ? false : login"
        @click="$emit('edit')"
        fab
        small
        style="position:absolute;top:-10px;right:-20px;"
        color="primary"
      >
        <v-icon>{{ mdiPencil }} </v-icon>
      </v-btn>
    </v-col>
    <v-col class="pt-2 title" cols="auto">
      <span>{{ userName }}</span>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { mdiPencil } from '@mdi/js'
import { computed, defineComponent } from '@vue/composition-api'

import AvatarLarge from '@/components/molecules/AvatarLarge.vue'

type Props = {
  displayName: string
  photoURL: string
  login: boolean
  disableEdit: boolean
}
export default defineComponent({
  components: {
    AvatarLarge
  },

  props: {
    displayName: {
      type: String,
      default: ''
    },

    photoURL: {
      type: String,
      default: ''
    },

    login: {
      type: Boolean,
      default: false
    },

    disableEdit: {
      type: Boolean,
      default: false
    }
  },

  setup({ displayName, login }: Props) {
    const userName = computed(() => {
      return login && displayName ? displayName : 'Anonymous'
    })
    return { userName, mdiPencil }
  }
})
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s;
}
</style>
