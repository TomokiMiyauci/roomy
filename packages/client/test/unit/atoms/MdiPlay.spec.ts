import { mdiPlay } from '@mdi/js'
import { shallowMount } from '@vue/test-utils'

import MdiPlay from '@/components/atoms/MdiPlay.vue'

describe('MdiPlay.vue', () => {
  it('should have mdiPlay icon', () => {
    const wrapper = shallowMount(MdiPlay)

    expect(wrapper.text()).toMatch(mdiPlay)
  })
})
