import FormProfile from '@/components/organisms/FormProfile.vue'

export default {
  title: `organisms|FormProfile`,
  parameters: {
    info: {
      summary: `organisms of FormProfile is great component.`
    }
  }
}

const template = `<form-profile />`

export const Default = () => ({
  components: { FormProfile },
  template
})
