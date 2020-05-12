<template>
  <v-card>
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="7">
            <v-row>
              <v-col cols="12">
                Name Image

                <v-text-field
                  v-model="name"
                  outlined
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                Preview

                <file-dropper />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="5">
            <avatar-name-large
              :login="true"
              :disableEdit="true"
              :displayName="name"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="onClick" color="blue darken-1" text>Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import AvatarNameLarge from '@/components/molecules/AvatarNameLarge.vue'
import FileDropper from '@/components/molecules/FileDropper.vue'
import { auth, firestore } from '@/plugins/firebase'
export default defineComponent({
  components: {
    AvatarNameLarge,
    FileDropper
  },

  setup(_, { emit }) {
    const profile = reactive({
      name: ''
    })

    const onClick = async () => {
      await auth.currentUser!.updateProfile({
        displayName: profile.name
      })

      await firestore
        .collection('profiles')
        .doc(auth.currentUser!.uid)
        .update({
          displayName: profile.name
        })

      emit('close')
    }

    return { ...toRefs(profile), onClick }
  }
})
</script>
