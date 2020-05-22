<template>
  <v-combobox
    :items="items"
    :search="search"
    :prepend-inner-icon="tagIcon"
    :clear-icon="mdiCloseCircle"
    :value="value"
    v-on="$listeners"
    @update:search-input="onUpdate"
    hide-selected
    clearable
    hint="Maximum of 3 tags"
    label="Tags"
    placeholder="Enter or Select the tag"
    multiple
    persistent-hint
    outlined
  >
    <template #selection="{ attrs, item, parent, selected }">
      <v-chip
        @click:close="parent.selectItem(item)"
        v-bind="attrs"
        :input-value="selected"
        text-color="white"
        color="primary"
        close
        label
      >
        <v-icon left>{{ mdiTagText }}</v-icon>

        <span class="pr-2 title">
          {{ item }}
        </span>
      </v-chip>
    </template>

    <template #no-data>
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
import { mdiCloseCircle, mdiTag, mdiTagMultiple, mdiTagText } from '@mdi/js'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'

import { getTags } from '@/repositories/tag'
export default defineComponent({
  props: {
    value: {
      type: Array,
      defalut: () => []
    }
  },

  setup(props: { value: [] }) {
    const items = ref<string[]>([])
    const search = ref<string | null>(null)

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

    const onUpdate = async (keyword: string | null | undefined) => {
      if (!keyword || keyword.length < 2) return

      const result = await getTags(keyword)

      result.docs.forEach((doc) => {
        const data = doc.data()
        items.value.push(data.value)
      })
    }

    return {
      items,
      search,
      mdiTagMultiple,
      mdiTagText,
      tagIcon,
      mdiCloseCircle,
      onUpdate
    }
  }
})
</script>
