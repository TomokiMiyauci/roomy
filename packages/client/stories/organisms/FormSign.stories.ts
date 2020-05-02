import FormSign from '@/components/organisms/FormSign.vue'

export default {
  title: `organisms|FormSign`,
  parameters: {
    info: {
      summary: `organisms of FormSign is great component.`
    }
  }
}

const template = `<form-sign />`

export const Default = () => ({
  components: { FormSign },
  template
})
