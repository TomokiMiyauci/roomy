<template>
  <div>
    <v-img
      :height="`calc(100vh - ${$vuetify.application.top}px )`"
      gradient="to right, rgba(5, 11, 31, 0.8), rgba(5, 11, 31, 0.8)"
      style="background-position: center center"
      src="https://zero-theme-pro.johnleider.com/img/home-hero.e450f150.jpg"
    >
      <v-row class="fill-height flex-column" align="center" justify="center">
        <client-only>
          <vue-typer
            :text="[
              'Welcome to Roomy',
              'Open Comunication Platform',
              'Roomy is in progress',
              'Let\'s try it !!'
            ]"
          ></vue-typer>
        </client-only>

        <v-btn to="/public" class="ma-10" tile x-large color="secondary"
          >getting start</v-btn
        >

        <v-btn
          @click="$vuetify.goTo('#target')"
          aria-label="scroll"
          class="float"
          absolute
          style="bottom:60px;"
          icon
          x-large
          color="secondary"
        >
          <v-icon x-large>{{ mdiChevronDown }}</v-icon>
        </v-btn>
      </v-row></v-img
    >
    <div id="target" style="height:500px;">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia culpa non
      animi quia. Error est recusandae asperiores accusantium, qui laboriosam
      nobis aperiam labore ipsam harum. Delectus optio est provident libero!
    </div>

    <div style="min-height:500px;background-color:rgb(6,11,30);">
      <!-- <h1>isfofjo</h1> -->

      <v-container class="fill-height" style="min-height: 500px;" fill-height>
        <v-row justify="center" align="center">
          <v-col v-for="i in 3" :key="i" cols="auto">
            <v-card class="white--text" color="transparent" max-width="360px">
              <v-card-title class="flex-column">
                <v-icon color="secondary" size="60">{{
                  mdiChatProcessing
                }}</v-icon>
                <div class="mt-5">
                  Test
                  <hr style="border:1px solid #3bd1b3" />
                </div>
              </v-card-title>
              <v-card-text class="grey--text">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Distinctio vero dolor quae voluptatibus voluptas nam aperiam,
                ipsa magnam deleniti laboriosam voluptates, doloremque iure?
                Laboriosam amet soluta maxime delectus. Rerum, facilis?
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <v-row class="flex-column mt-12" align="center" justify="center">
        <v-col cols="auto">
          <v-avatar>
            <v-icon color="primary"> {{ mdiChatProcessing }}</v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto">
          <h3 style="border-bottom:5px solid #083b66;" class="display-1">
            RECENT MESSAGE
          </h3>
        </v-col>
      </v-row>
      <v-carousel v-model="model">
        <v-carousel-item v-for="color in colors" :key="color">
          <v-sheet color="transparent" height="100%" tile>
            <v-row
              class="fill-height flex-column"
              align="center"
              justify="center"
            >
              <div class="text--center mx-auto">
                <v-avatar size="100">
                  <v-img
                    src="https://zero-theme-pro.johnleider.com/img/home-hero.e450f150.jpg"
                  />
                </v-avatar>
              </div>

              <div class="ma-5 black--text display-1">Test</div>
              <div class="grey--text" style="position:relative;">
                <v-icon
                  style="position:absolute;top:-10px;left: -30px;"
                  color="grey"
                  >{{ mdiFormatQuoteOpen }}</v-icon
                >Message will update soon.
                <v-icon
                  color="grey"
                  style="position:absolute;right: -30px;bottom:-10px;"
                  >{{ mdiFormatQuoteClose }}</v-icon
                >
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import {
  mdiChatProcessing,
  mdiChevronDown,
  mdiFormatQuoteClose,
  mdiFormatQuoteOpen
} from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  layout: 'landing',

  head: {
    title: 'Home'
  },

  setup() {
    const model = ref(0)
    const colors = ['primary', 'secondary', 'yellow darken-2', 'red', 'orange']

    return {
      mdiChatProcessing,
      colors,
      model,
      mdiChevronDown,
      mdiFormatQuoteOpen,
      mdiFormatQuoteClose
    }
  }
})
</script>

<style lang="scss">
.float {
  animation: float 1s infinite alternate;
}

@keyframes float {
  100% {
    transform: translateY(20px);
  }
}

@keyframes rocking {
  0%,
  100% {
    transform: rotateZ(-10deg);
  }

  50% {
    transform: rotateZ(10deg);
  }
}

@media screen and (min-width: 0) {
  .vue-typer {
    font-size: 1.5rem;
  }
}

@media screen and (min-width: 480px) {
  .vue-typer {
    font-size: 2rem;
  }
}

@media screen and (min-width: 768px) {
  .vue-typer {
    font-size: 3.5rem;
  }
}

.vue-typer .custom.char.typed {
  color: white;
}
.vue-typer .custom.char.selected {
  color: #3bd1b3;
  background-color: #1e1e1e;
}

.vue-typer .custom.caret {
  animation: rocking 1s ease-in-out 0s infinite;
}
.vue-typer .custom.caret.typing {
  background-color: #3bd1b3;
}
.vue-typer .custom.caret.selecting {
  display: inline-block;
  background-color: #e91e63;
}
</style>
