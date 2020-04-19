<template>
  <div>
    <v-bottom-sheet v-model="sheet">
      <recording-studio @close="onClose" />
    </v-bottom-sheet>

    <div ref="hello" class="date">
      <chip-date v-if="data" :unixtime="data * 1000" format="YYYY-MM-DD" />
    </div>

    <v-container>
      <v-row class="flex-column">
        <!-- <v-col
          style="position:sticky;top:70px;text-align:center;background-color:red;"
          cols="auto"
          align-self="center"
        >
          <base-chip>helo</base-chip>
        </v-col> -->
        <v-col>
          <transition-group
            name="list"
            appear
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter"
          >
            <template v-for="(i, index) in a">
              <v-row
                v-if="
                  index !== 0 &&
                    'createdAt' in i &&
                    !dayjs(a[index - 1].createdAt * 1000).isSame(
                      i.createdAt * 1000,
                      'day'
                    )
                "
                :key="i.id + 4"
                style="border-top:1px solid grey;"
                justify="center"
              >
                <v-col cols="auto" align-self="center">
                  <chip-date
                    v-if="i.createdAt"
                    :unixtime="i.createdAt.seconds * 1000"
                    format="YYYY-MM-DD"
                  />
                </v-col>
              </v-row>

              <message-set
                :id="index"
                :key="i.id"
                class="i"
                :message="i"
                :is-own="isOwn(i)"
              />
            </template>
          </transition-group>
        </v-col>
      </v-row>
    </v-container>

    <!-- <div
      style="position:absolute;right:0;bottom:0;left:0;display:flex;background-color:red;"
    >
      hello
    </div> -->

    <!-- <v-footer absolute padless>
      <the-post
        style="padding:8px;"
        @postend="onPostend"
        @audio="sheet = true"
      />
    </v-footer> -->
    <div
      style="position:fixed;bottom:0;"
      :style="{
        width: $vuetify.breakpoint.mdAndDown ? '100%' : 'calc(100% - 406px)'
      }"
    >
      <the-post
        style="padding:8px;"
        @postend="onPostend"
        @audio="sheet = true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  mdiAlertCircleOutline,
  mdiCheckboxBlank,
  mdiCheckBoxOutline,
  mdiMicrophone,
  mdiMicrophoneSettings
} from '@mdi/js'
import {
  defineComponent,
  onMounted,
  onUpdated,
  ref,
  watch
} from '@vue/composition-api'
import dayjs from 'dayjs'
import gsap from 'gsap'

import BaseChip from '@/components/atoms/BaseChip.vue'
import ChipDate from '@/components/atoms/ChipDate.vue'
import BoxCallout from '@/components/atoms/SpeechBalloon.vue'
import ButtonImage from '@/components/molecules/ButtonImage.vue'
import MessageSet from '@/components/molecules/MessageSet.vue'
import RecordingStudio from '@/components/molecules/RecordingStudio.vue'
import ThePost from '@/components/organisms/ThePost.vue'
import { useFirestore } from '@/core/useFirestore'
import { messageReference } from '@/core/useFirestoreReference'
import { reference, user } from '@/store'
import { Message } from '@/types/core'
export default defineComponent({
  layout: 'chat',

  components: {
    ButtonImage,
    BoxCallout,
    MessageSet,
    ThePost,
    RecordingStudio,
    BaseChip,
    ChipDate
  },

  // beforeRouteEnter: (_: any, __: any, ___: any) => {
  //   console.log(13333)
  //   ___()
  // },

  setup(_, { root }) {
    const isOwn = (message: Message): boolean => {
      return (
        !!user.id &&
        !message.author.isAnonymous &&
        message.author.name === user.displayName
      )
    }

    const div = ref<any>()

    watch(div, (con) => {
      if (!con) return
      console.log(1111, con.$vnode.elm.offsetTop, con.$vnode)
    })

    const sheet = ref(false)

    const hello = ref<HTMLDivElement>()

    const btn = ref<HTMLButtonElement>()

    console.log(root.$route.params.id)
    reference.setRoomId(root.$route.params.id)

    const { collectionRef } = messageReference()
    console.log(111, collectionRef)
    reference.setRoomId(root.$route.params.id)

    const a = useFirestore(collectionRef.value.orderBy('createdAt', 'asc'))

    const beforeEnter = (el: any) => {
      el.style.opacity = 0
      el.style.transform = 'scale(0,0)'
    }

    const onClose = async () => {
      sheet.value = false
      await onPostend()
    }

    const data = ref(0)

    onMounted(() => {
      gsap.from('.card', {
        duration: 0.5,
        opacity: 0,
        scale: 0,
        x: -200,
        ease: 'power1',
        stagger: 0.1
      })

      obs.value = new IntersectionObserver(handler, {
        threshold: 1
      })
    })

    const handler = (ent: any, aa: any) => {
      console.log(ent, aa, ent[0].target.id)
      console.log(a)

      data.value = a.value[ent[0].target.id].createdAt.seconds
    }

    const onInter = (obj: any, aa: any, is: any) => {
      console.log(obj, aa, is)
    }

    const obs = ref<any>()

    onUpdated(() => {
      const pp = document.querySelectorAll('.i')
      console.log(1, pp)

      pp.forEach((img) => obs.value.observe(img))
    })

    const enter = (el: any, done: any) => {
      gsap.to(el, {
        duration: 1,
        opacity: 1,
        scale: 1,
        onComplete: done,
        stagger: 0.5
      })
    }

    const onPostend = async () => {
      await root.$nextTick()
      scrollTo(0, document.body.clientHeight)
    }
    // const unsubsribe = firestore
    //   .collection('public')
    //   .onSnapshot((snapshots) => {
    //     snapshots.docChanges().forEach((change) => {
    //       switch (change.type) {
    //         case 'added': {
    //           store.value.push(change.doc.data())
    //         }
    //       }
    //       console.log(change.type)

    //       // store.value.push(snapshot.data())
    //       // console.log(snapshot.data())
    //     })
    //   })

    return {
      mdiAlertCircleOutline,
      mdiCheckBoxOutline,
      mdiCheckboxBlank,
      onClose,
      a,
      btn,
      sheet,
      beforeEnter,
      enter,
      mdiMicrophone,
      mdiMicrophoneSettings,
      onPostend,
      dayjs,
      isOwn,
      hello,
      data,
      onInter,
      div
    }
  }
})
</script>

<style lang="scss" scoped>
.demo_svg {
  animation: SVG-anim01 2s 1s ease 1;
  stroke-width: 0.5;
}
@-webkit-keyframes SVG-anim01 {
  0% {
    stroke-dashoffset: 2000;
  }
  80% {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
  }
  100% {
    fill-opacity: 1;
  }
}
@keyframes SVG-anim01 {
  0% {
    stroke-dashoffset: 2000;
  }
  80% {
    stroke-dashoffset: 0;
    stroke-dashoffset: 100;
  }
  100% {
    fill-opacity: 1;
    stroke-width: 1;
  }
}
.date {
  position: sticky;
  top: 64px;
  text-align: center;
}
// .list-enter-active,
// .list-leave-active {
//   transition: all 1s;
// }

// @for $i from 1 through 30 {
//   .list-enter-active:nth-child(#{$i}),
//   .list-leave-active:nth-child(#{$i}) {
//     transition: all 1s $i * 0.1 + s;
//   }
// }

// .list-enter, .list-leave-to /* .list-leave-active for below version 2.1.8 */ {
//   transform: translateX(100px);
//   opacity: 0;
// }
</style>
