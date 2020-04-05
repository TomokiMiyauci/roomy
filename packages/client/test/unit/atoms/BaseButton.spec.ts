import { shallowMount } from '@vue/test-utils'

import BaseButton from '@/components/atoms/BaseButton.vue'

describe('BaseButton.vue', () => {
  it('should have default slots', () => {
    const wrapper = shallowMount(BaseButton, {
      slots: { default: '<div data-test="slotContent">slot content</div>' }
    })

    const slotContent = wrapper.find('[data-test="slotContent"]')

    expect(slotContent.exists()).toBe(true)
    expect(slotContent.text()).toBe('slot content')
  })

  // it('should have emit event', () => {
  //   const wrapper = mount(BaseButton)

  //   wrapper.trigger('click')

  //   expect(wrapper.emitted('click')).toBeTruthy()
  // })
})
