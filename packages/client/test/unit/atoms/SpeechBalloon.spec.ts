import { shallowMount } from '@vue/test-utils'

import SpeechBalloon from '@/components/atoms/SpeechBalloon.vue'

describe('SpeechBalloon.vue', () => {
  it('should have props of left', () => {
    const wrapper = shallowMount(SpeechBalloon, {
      propsData: {
        left: false
      }
    })

    expect(wrapper.props('left')).toBeFalsy()
  })
})
