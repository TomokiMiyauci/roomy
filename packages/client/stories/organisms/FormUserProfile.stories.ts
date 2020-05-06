import FormUserProfile from '@/components/organisms/FormUserProfile.vue'

export default {
  title: `organisms|FormUserProfile`,
  parameters: {
    info: {
      summary: `organisms of FormUserProfile is great component.`
    }
  }
}

const template = `<form-user-profile />`

export const Default = () => ({
  components: { FormUserProfile },
  template
})
