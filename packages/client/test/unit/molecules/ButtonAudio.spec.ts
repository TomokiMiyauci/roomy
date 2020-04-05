import { shallowMount } from '@vue/test-utils'

import ButtonAudio from '@/components/molecules/ButtonAudio.vue'

describe('ButtonAudio.vue', () => {
  it('should have props of src', () => {
    const wrapper = shallowMount(ButtonAudio, {
      propsData: {
        src: 'audio'
      }
    })

    expect(wrapper.props('src')).toBe('audio')
  })
})
