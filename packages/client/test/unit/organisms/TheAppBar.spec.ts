import { shallowMount } from '@vue/test-utils'
import TheAppBar from '@/components/organisms/TheAppBar.vue'

describe('TheAppBar.vue', () => {
  it('should contain v-app-var', () => {
    const wrapper = shallowMount(TheAppBar)

    expect(wrapper.contains('v-app-bar-stub')).toBeTruthy()
  })
})
