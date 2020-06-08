<template>
  <v-sheet v-show="rooms.length" class="mx-auto" elevation="8">
    <v-slide-group v-model="model" center-active class="pa-4" show-arrows>
      <v-slide-item
        v-for="room in rooms"
        :key="room.id"
        #default="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          @click="toggle"
          class="ma-4"
          height="200"
          width="200"
        >
          <v-img
            v-if="room.photoURL"
            :src="room.photoURL"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            class="align-end"
          />

          <mdi-new-box v-else color="white" size="200" />
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                style="position:absolute;top:0;z-index:100;"
                color="accent"
                size="48"
                >{{ mdiEye }}</v-icon
              >
            </v-scale-transition>
          </v-row>

          <v-chip
            style="position:absolute;bottom:10px;left:10px;"
            class="white--text align-end"
            color="rgba(128,128,128,0.9)"
            label
          >
            {{ room.name }}
          </v-chip>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" color="grey lighten-4" height="200" tile>
        <v-row class="fill-height" align="center" justify="center">
          <v-card dark color="primary" shaped width="300px">
            <v-overlay :value="overlay" absolute>
              <SvgQrcode :text="rooms[model].name" />
              <button-close @click="overlay = false" />
            </v-overlay>
            <v-card-title
              >{{ rooms[model].name }}
              <v-spacer />
              <v-btn :to="`/public/${rooms[model].id}`" icon
                ><v-icon>{{ mdiLinkVariant }}</v-icon></v-btn
              >
              <button-qrcode @click.prevent="overlay = true" />
            </v-card-title>
            <v-card-subtitle>
              <message-counter :messageCount="rooms[model].messageCount" />
            </v-card-subtitle>
            <v-card-text>
              <v-list dark two-line class="v-card--shaped">
                <v-list-item :key="rooms[model].recent.shortMessage">
                  <v-list-item-avatar>
                    <AvatarWrapper
                      :displayName="
                        rooms[model].recent.author.isAnonymous
                          ? ''
                          : rooms[model].recent.author.displayName
                      "
                      :photoURL="
                        rooms[model].recent.author.isAnonymous
                          ? ''
                          : rooms[model].recent.author.photoURL
                      "
                      :login="!rooms[model].recent.author.isAnonymous"
                    />
                    <!-- <v-im/g v-else :src="rooms[model].recent.author.photoURL" /> -->
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      rooms[model].recent.author.isAnonymous
                        ? ''
                        : rooms[model].recent.author.displayName
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      v-text="rooms[model].recent.shortMessage"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <chip-date
                    :unixtime="rooms[model].recent.updatedAt.seconds"
                    format="dddd"
                  />
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script lang="ts">
import { mdiEye, mdiLinkVariant } from '@mdi/js'
import { defineComponent, PropType, ref, watch } from '@vue/composition-api'

import MdiNewBox from '@/components/atoms/icons/MdiNewBox.vue'
import MessageCounter from '@/components/molecules/MessageCounter.vue'
import { PublicRoomMerged } from '~types/core'
export default defineComponent({
  props: {
    rooms: {
      type: Array as PropType<PublicRoomMerged[]>,
      default: () => []
    }
  },

  components: {
    MdiNewBox,
    MessageCounter,
    ChipDate: () => import('@/components/atoms/ChipDate.vue'),
    AvatarWrapper: () => import('@/components/molecules/AvatarWrapper.vue'),
    ButtonQrcode: () => import('@/components/molecules/ButtonQrcode.vue'),
    SvgQrcode: () => import('@/components/atoms/SvgQrcode.vue'),
    ButtonClose: () => import('@/components/molecules/ButtonClose.vue')
  },

  setup() {
    const model = ref<number | null>(null)
    console.log(model, 1111111111111)

    watch(model, (now) => {
      if (typeof now === 'number') {
        overlay.value = false
      }
    })
    const overlay = ref(false)

    return { model, mdiEye, overlay, mdiLinkVariant }
  }
})
</script>
