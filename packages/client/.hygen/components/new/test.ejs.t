---
to: test/unit/<%= category %>/<%= componentName || 'unnamed'%>.spec.ts
---
import { shallowMount } from '@vue/test-utils'
import <%= componentName %> from '@/components/<%= category %>/<%= componentName || 'unnamed'%>.vue'

describe('<%= componentName || 'unnamed'%>.vue', () => {
  it('should be ', () => {
    const wrapper = shallowMount(<%= componentName %>)
    expect(wrapper)
  })
})
