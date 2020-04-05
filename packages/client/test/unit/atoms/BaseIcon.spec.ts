import { shallowMount } from '@vue/test-utils'

import BaseIcon from '@/components/atoms/BaseIcon.vue'

describe('BaseIcon.vue', () => {
  it('should have default slots', () => {
    const wrapper = shallowMount(BaseIcon, {
      slots: { default: '<div data-test="slotContent">slot content</div>' }
    })

    const slotContent = wrapper.find('[data-test="slotContent"]')

    expect(slotContent.exists()).toBe(true)
    expect(slotContent.text()).toBe('slot content')
  })
})
