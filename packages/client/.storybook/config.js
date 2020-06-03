import VueCompositionApi from '@vue/composition-api'
import Vue from 'vue'
import { configure, addDecorator,addParameters } from '@storybook/vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import { create } from '@storybook/theming';
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y';
import vuetifyConfig from '../vuetify.options'
import options from "../vuetify.options";

const vuetify = new Vuetify(vuetifyConfig)

const theme = create({
  base: 'dark',
  colorPrimary: 'blue',
  colorSecondary: options.theme.themes.light.secondary,
  brandTitle: 'Roomy',
  appContentBg: 'rgba(0,0,0,0.7)',
  fontCode: 'monospace',
  appBg: options.theme.themes.light.primary,
  barBg: '#011c2e',
  textColor: 'white',
  textInverseColor: 'rgba(255,2,5,0.9)',
  barTextColor: 'silver',
  barSelectedColor: 'black',
  barSelectedColor: options.theme.themes.light.secondary,
});

addParameters({
  options: {
    theme,
  },

  backgrounds: [
  { name: 'default', value: 'white', default: true },
  { name: 'twitter', value: '#00aced' },
  { name: 'facebook', value: '#3b5998' },
  { name: 'grey', value: '#808080' }
]
});

addDecorator(withKnobs)
addDecorator(withA11y)

addDecorator(() => ({
  vuetify,
  template: '<v-app style="background-color: transparent;"><v-content><v-container fluid><story /></v-container></v-content></v-app>',
  style: '.theme--light.application { background-color: transparent; }'
}))

if (typeof jest === "undefined") {
  // TODO: Dirty workaround
  const { withInfo } = require('storybook-addon-vue-info');
  addDecorator(withInfo({ info: true }));
}

Vue.use(VueCompositionApi)
Vue.use(Vuetify)

// automatically import all files ending in *.stories.js
const atoms = require.context('../stories/atoms', true, /stories.ts$/)
const molecules = require.context('../stories/molecules', true, /stories.ts$/)
// function loadStories() {
//   req.keys().forEach((filename) => req(filename))
// }

// configure(loadStories, module)
// automatically import all files ending in *.stories.js
configure([atoms, molecules], module)
