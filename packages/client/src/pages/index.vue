<template>
  <div>
    <v-bottom-sheet v-model="sheet">
      <recording-studio @close="onClose" />
    </v-bottom-sheet>

    <v-container>
      <transition-group
        name="list"
        appear
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <v-row
          v-for="i in a"
          :key="i.id"
          :align-content="i.user ? 'start' : 'end'"
          class="flex-column"
        >
          <v-col cols="auto">
            <message-set class="card" :message="i" :is-own="i.user" />
          </v-col>
        </v-row>
      </transition-group>
    </v-container>

    <footer
      ref="r"
      style="position: fixed; right: 0;bottom: 0;left: 0;margin:auto;"
    >
      <the-post @postend="onPostend" @audio="sheet = true" />
    </footer>
  </div>
</template>

<script lang="ts">
import {
  mdiAlertCircleOutline,
  mdiCheckBoxOutline,
  mdiCheckboxBlank,
  mdiMicrophone,
  mdiMicrophoneSettings
} from '@mdi/js'
import gsap from 'gsap'
import {
  createComponent,
  reactive,
  toRefs,
  ref,
  onMounted
} from '@vue/composition-api'
import { useFirestore } from '@/core/useFirestore'
import { firestore } from '@/plugins/firebase'
import BoxCallout from '@/components/atoms/SpeechBalloon.vue'
import MessageSet from '@/components/molecules/MessageSet.vue'
import RecordingStudio from '@/components/molecules/RecordingStudio.vue'
import ButtonImage from '@/components/molecules/ButtonImage.vue'
import ThePost from '@/components/organisms/ThePost.vue'

export default createComponent({
  components: {
    ButtonImage,
    BoxCallout,
    MessageSet,
    ThePost,
    RecordingStudio
  },

  beforeRouteEnter: (_: any, __: any, ___: any) => {
    console.log(13333)
    ___()
  },

  setup(_, { root }) {
    const state = reactive({
      isValid: false,
      text: ''
    })

    const sheet = ref(false)

    const r = ref<HTMLInputElement>()

    const store = ref<any>([])

    const btn = ref<HTMLButtonElement>(undefined)

    const a = useFirestore(firestore.collection('public').orderBy('createdAt'))

    const beforeEnter = (el: any) => {
      el.style.opacity = 0
      el.style.transform = 'scale(0,0)'
    }

    const onClose = async () => {
      sheet.value = false
      await onPostend()
    }

    onMounted(() => {
      gsap.from('.card', {
        duration: 0.5,
        opacity: 0,
        scale: 0,
        x: -200,
        ease: 'power1',
        stagger: 0.1
      })
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
      ...toRefs(state),
      state,
      store,
      mdiAlertCircleOutline,
      mdiCheckBoxOutline,
      mdiCheckboxBlank,
      onClose,
      a,
      r,
      btn,
      sheet,
      beforeEnter,
      enter,
      mdiMicrophone,
      mdiMicrophoneSettings,
      onPostend
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
