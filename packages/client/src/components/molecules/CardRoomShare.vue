<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="$emit('close')">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
      <v-toolbar-title
        ><v-icon left>{{ mdiShareVariant }}</v-icon
        >Room Share</v-toolbar-title
      >
    </v-toolbar>
    <v-card-title>
      Share room to anysome.
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row no-gutters class="flex-column" align="center" justify="center">
          <v-col align-self="start" cols="auto">
            <v-icon left>{{ mdiQrcode }}</v-icon>
            QRcode
          </v-col>

          <v-col class="pa-0" style="max-width:500px">
            <svg-qrcode :text="url" />
          </v-col>

          <v-col cols="auto" class="pb-10 grey--text display-1">
            or
          </v-col>
        </v-row>
        <v-icon left>{{ mdiEarth }}</v-icon
        >URL
        <v-row>
          <v-col>
            <v-text-field
              :prepend-inner-icon="mdiLinkVariant"
              disabled
              dense
              :value="url"
            />
          </v-col>
          <v-col cols="auto">
            <v-btn icon>
              <v-icon>{{ mdiContentCopy }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {
  mdiClose,
  mdiContentCopy,
  mdiEarth,
  mdiLinkVariant,
  mdiQrcode,
  mdiShareVariant
} from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    SvgQrcode: () => import('@/components/atoms/SvgQrcode.vue')
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      mdiClose,
      mdiContentCopy,
      mdiEarth,
      mdiLinkVariant,
      mdiQrcode,
      mdiShareVariant
    }
  }
})
</script>
