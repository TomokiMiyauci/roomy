<template>
  <v-tooltip v-model="show" top>
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        @mouseenter="onMouseleave(on.mouseenter)"
        @mouseleave="on.mouseleave"
        @click="onClick"
      >
        <v-icon>{{ mdiContentCopy }}</v-icon>
      </v-btn>
    </template>

    <span v-if="!copy">Copy</span>
    <span v-else
      ><v-icon color="green" left>{{ mdiCheckCircle }}</v-icon
      >Copied</span
    >
  </v-tooltip>
</template>

<script lang="ts">
import { mdiCheckCircle, mdiContentCopy } from '@mdi/js'
import { defineComponent, ref, watch } from '@vue/composition-api'

type Props = {
  text: string
}

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup(props: Props) {
    const copy = ref(false)
    const show = ref(false)

    watch(copy, (now) => {
      if (now) {
        setTimeout(() => {
          show.value = false
          copy.value = false
        }, 2000)
      }
    })

    const onClick = async () => {
      await navigator.clipboard.writeText(props.text)
      copy.value = true
    }

    const onMouseleave = (mouseleave: () => {}) => {
      mouseleave()
      copy.value = false
    }

    const onMouseenter = (mouseenter: () => {}) => {
      mouseenter()
    }
    return {
      mdiContentCopy,
      onClick,
      show,
      onMouseleave,
      onMouseenter,
      mdiCheckCircle,
      copy
    }
  }
})
</script>
