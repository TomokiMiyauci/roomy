<template>
  <v-combobox
    :items="items"
    :search-input.sync="search"
    :prepend-inner-icon="tagIcon"
    :clear-icon="mdiCloseCircle"
    v-on="$listeners"
    hide-selected
    clearable
    hint="Maximum of 3 tags"
    label="Tags"
    placeholder="Enter or Select the tag"
    multiple
    persistent-hint
    small-chips
    deletable-chips
    outlined
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            No results matching
            <v-chip v-if="!!search" small>{{ search }}</v-chip
            >.Press <kbd>enter</kbd> to create tag
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-combobox>
</template>

<script lang="ts">
import { mdiCloseCircle, mdiTag, mdiTagMultiple } from '@mdi/js'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
export default defineComponent({
  props: {
    value: {
      type: Array,
      defalut: () => []
    }
  },

  setup(props: { value: [] }) {
    const items = ['Gaming', 'Programming', 'Vue', 'Vuetify']
    const search = ref(null)

    const tagIcon = computed(() => {
      return !!props.value && props.value.length > 1 ? mdiTagMultiple : mdiTag
    })

    watch(
      () => props.value,
      (now) => {
        if (!!now && now.length > 3) {
        }
      }
    )

    return { items, search, mdiTagMultiple, tagIcon, mdiCloseCircle }
  }
})
</script>
