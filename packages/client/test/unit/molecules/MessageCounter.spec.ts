import { shallowMount } from '@vue/test-utils'

import MessageCounter from '@/components/molecules/MessageCounter.vue'

describe('MessageCounter.vue', () => {
  it('should have props of messageCount', () => {
    const wrapper = shallowMount(MessageCounter)

    expect(wrapper.props().messageCount).toBe(0)
  })

  it('should be 1 if props of messageCount is 1', () => {
    const wrapper = shallowMount(MessageCounter, {
      propsData: {
        messageCount: 1
      }
    })

    expect(wrapper.props().messageCount).toBe(1)
  })

  it('should be 0 what internal text', () => {
    const wrapper = shallowMount(MessageCounter)
    const vm = wrapper.find('span')

    expect(vm.text()).toBe('0')
  })
})
