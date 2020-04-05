import { shallowMount } from '@vue/test-utils'

import ButtonFileDownload from '@/components/molecules/ButtonFileDownload.vue'

describe('ButtonFileDownload.vue', () => {
  it('should have props of blob', () => {
    const mock = jest.fn()
    const wrapper = shallowMount(ButtonFileDownload, {
      propsData: {
        blob: mock
      }
    })

    expect(wrapper.props('blob')).toEqual(mock)
  })
})
