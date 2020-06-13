<template>
  <v-row align="center" dense>
    <v-col cols="9">
      <v-sheet v-show="rooms.length" class="mx-auto">
        <v-slide-group
          v-model="model"
          :prev-icon="mdiChevronLeftCircle"
          :next-icon="mdiChevronRightCircle"
          center-active
          class="pa-4"
          show-arrows
        >
          <v-slide-item
            v-for="room in rooms"
            :key="room.id"
            #default="{ active, toggle }"
          >
            <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              @click="toggle"
              @mouseenter="toggle"
              @focus="toggle"
              :elevation="active ? 10 : 1"
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
      </v-sheet>
    </v-col>
    <transition name="slide-x-transition">
      <v-col v-if="typeof model === 'number'" cols="3">
        <v-card
          :to="`/public/${selectingRoom.id}`"
          elevation="10"
          dark
          color="primary"
          shaped
        >
          <!-- <v-overlay :value="overlay" absolute>
            <button-close @click="overlay = false" absolute top right />
            <SvgQrcode :text="rooms[model].name" />
          </v-overlay> -->
          <v-card-title
            >{{ selectingRoom.name }}
            <v-spacer />
            <v-btn :to="`/public/${selectingRoom.id}`" icon
              ><v-icon>{{ mdiLinkVariant }}</v-icon></v-btn
            >
            <button-qrcode
              @click.prevent="$emit('open:qrcode', selectingRoom)"
            />
          </v-card-title>
          <v-card-subtitle>
            <message-counter :messageCount="selectingRoom.messageCount" />
          </v-card-subtitle>
          <v-card-text>
            <v-list dark two-line class="v-card--shaped">
              <v-list-item :key="selectingRoom.recent.shortMessage">
                <v-list-item-avatar>
                  <AvatarWrapper
                    :displayName="
                      selectingRoom.recent.author.isAnonymous
                        ? ''
                        : selectingRoom.recent.author.displayName
                    "
                    :photoURL="
                      selectingRoom.recent.author.isAnonymous
                        ? ''
                        : selectingRoom.recent.author.photoURL
                    "
                    :login="!selectingRoom.recent.author.isAnonymous"
                  />
                  <!-- <v-im/g v-else :src="rooms[model].recent.author.photoURL" /> -->
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{
                    selectingRoom.recent.author.isAnonymous
                      ? ''
                      : selectingRoom.recent.author.displayName
                  }}</v-list-item-title>
                  <v-list-item-subtitle
                    v-text="selectingRoom.recent.shortMessage"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <chip-date
                  :unixtime="selectingRoom.recent.updatedAt.seconds"
                  format="dddd"
                />
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </transition>
  </v-row>
</template>

<script lang="ts">
import {
  mdiChevronLeftCircle,
  mdiChevronRightCircle,
  mdiEye,
  mdiLinkVariant
} from '@mdi/js'
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch
} from '@vue/composition-api'

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

  setup(props) {
    const model = ref<number | null>(0)
    const overlay = ref(false)

    watch(model, (now) => {
      if (typeof now === 'number') {
        overlay.value = false
      }
    })

    const selectingRoom = computed(() => {
      if (typeof model.value !== 'number') return props.rooms[0]
      return props.rooms[model.value]
    })

    return {
      model,
      mdiEye,
      overlay,
      selectingRoom,
      mdiLinkVariant,
      mdiChevronLeftCircle,
      mdiChevronRightCircle
    }
  }
})
</script>
