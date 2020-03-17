import { shallowMount } from '@vue/test-utils'
import { mdiMicrophoneSettings } from '@mdi/js'
import MdiMicrophoneSettings from '@/components/atoms/MdiMicrophoneSettings.vue'

describe('MdiMicrophoneSettings.vue', () => {
  it('should have mdiMicrophoneSettings icon', () => {
    const wrapper = shallowMount(MdiMicrophoneSettings)

    expect(wrapper.text()).toMatch(mdiMicrophoneSettings)
  })
})
