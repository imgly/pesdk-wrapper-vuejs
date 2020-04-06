import { mount } from '@vue/test-utils'
import PhotoEditor from '@/components/PhotoEditor'
import License from '@/components/license.json'

describe('PhotoEditor', () => {
  it('should render the DesktopUI', () => {
    const wrapper = mount(PhotoEditor, {
      propsData: {
        ui: 'desktop',
        license: JSON.stringify(License),
        imagePath: '/static/example.jpg'
      }
    })
    expect(wrapper.classes()).toContain('pesdk-desktop-editor')
    expect(wrapper.contains('.photoeditorsdk-editor')).toBe(true)
  })

  it('should save the editor as instance property', () => {
    const wrapper = mount(PhotoEditor, {
      propsData: {
        ui: 'desktop',
        license: JSON.stringify(License),
        imagePath: '/static/example.jpg'
      }
    })
    expect(typeof wrapper.vm.$pesdk).toBe('object')
  })
})
