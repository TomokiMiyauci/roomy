<template>
  <div>
    <v-img
      height="calc(100vh - 64px )"
      gradient="to right, rgba(5, 11, 31, 0.8), rgba(5, 11, 31, 0.8)"
      style="background-position: center center"
      src="https://zero-theme-pro.johnleider.com/img/home-hero.e450f150.jpg"
    >
      <v-row class="fill-height flex-column" align="center" justify="center">
        <vue-typer
          :text="[
            'Welcome to Roomy',
            'Open Comunication Platform',
            'Roomy is in progress',
            'Let\'s try it !!'
          ]"
        ></vue-typer>
        <v-btn to="/public" class="ma-10" tile x-large color="secondary"
          >getting start</v-btn
        >

        <v-btn
          @click="$vuetify.goTo('#target')"
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

    <div style="height:500px;background-color:rgb(6,11,30);">
      <!-- <h1>isfofjo</h1> -->

      <v-container fill-height>
        <v-row justify="center" align="center">
          <v-col cols="auto">
            <v-card max-width="360px">
              <v-card-title>
                Title
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Distinctio vero dolor quae voluptatibus voluptas nam aperiam,
                ipsa magnam deleniti laboriosam voluptates, doloremque iure?
                Laboriosam amet soluta maxime delectus. Rerum, facilis?
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card max-width="360px">
              <v-card-title>
                Title
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Distinctio vero dolor quae voluptatibus voluptas nam aperiam,
                ipsa magnam deleniti laboriosam voluptates, doloremque iure?
                Laboriosam amet soluta maxime delectus. Rerum, facilis?
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card max-width="360px">
              <v-card-title>
                Title
              </v-card-title>
              <v-card-text>
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
    <div style="height:700px">
      <v-row class="flex-column mt-12" align="center" justify="center">
        <v-col cols="auto">
          <v-avatar color="primary">
            <v-icon>{{ mdiChatProcessing }}</v-icon>
          </v-avatar>
        </v-col>
        <v-col cols="auto">
          <h3 class="display-1">Recent Message</h3>
        </v-col>
      </v-row>
      <v-carousel v-model="model">
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet color="transparent" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { mdiChatProcessing, mdiChevronDown } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  layout: 'landing',

  setup() {
    const model = ref(0)
    const colors = ['primary', 'secondary', 'yellow darken-2', 'red', 'orange']
    return { mdiChatProcessing, colors, model, mdiChevronDown }
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

.vue-typer {
  font-size: 3.5rem;
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
