<template>
  <v-card>
    <v-toolbar color="secondary">
      <button-close @click="$emit('close')" color="primary" />
      <v-toolbar-title class="white--text">
        <v-icon color="error" left>{{ mdiQrcodeScan }}</v-icon>
        Qrcode Scanner
      </v-toolbar-title>
      <v-spacer />
      <v-btn @click="reload" icon color="success">
        <v-icon>{{ mdiReload }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-snackbar :value="error" absolute>
      <v-icon color="warning" left>{{ mdiAlert }}</v-icon
      >{{ error }}</v-snackbar
    >

    <qrcode-reader ref="scanner" @error="onError" />
  </v-card>
</template>

<script lang="ts">
import { mdiAlert, mdiQrcodeScan, mdiReload } from '@mdi/js'
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'

export default defineComponent({
  components: {
    ButtonClose: () => import('@/components/molecules/ButtonClose.vue'),
    QrcodeReader: () => import('@/components/molecules/QrcodeReader.vue')
  },

  setup() {
    const scanner = ref<any>()
    const state = reactive({
      error: ''
    })

    const reload = (): void => {
      state.error = ''
      scanner.value.reload()
    }

    const onError = (message: string): void => {
      state.error = message
    }
    return {
      mdiQrcodeScan,
      mdiAlert,
      onError,
      ...toRefs(state),
      mdiReload,
      scanner,
      reload
    }
  }
})
</script>
