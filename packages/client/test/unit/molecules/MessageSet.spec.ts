import { shallowMount } from '@vue/test-utils'

import MessageSet from '@/components/molecules/MessageSet.vue'

describe('MessageSet.vue', () => {
  it('should have props of message', () => {
    const message = {
      text: 'test',
      createdAt: { seconds: 10000000 }
    }
    const wrapper = shallowMount(MessageSet, {
      propsData: {
        message,
        isOwn: true
      }
    })
    expect(wrapper.props('message')).toEqual(message)
  })

  it('should have props of isOwn', () => {
    const message = {
      text: 'test',
      createdAt: { seconds: 10000000 }
    }
    const wrapper = shallowMount(MessageSet, {
      propsData: {
        message,
        isOwn: true
      }
    })
    expect(wrapper.props('isOwn')).toBeTruthy()
  })
})
