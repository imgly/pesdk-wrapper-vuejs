import { mount } from '@vue/test-utils';
import PhotoEditor from '@/components/PhotoEditor';

describe('PhotoEditor', () => {
  it('should render the DesktopUI', () => {
    const wrapper = mount(PhotoEditor, {
      propsData: {
        layout: 'advanced',
        license: '',
        imagePath: 'example.jpg'
      }
    });
    expect(wrapper.classes()).toContain('pesdk-desktop-editor');
  });

  it('should save the editor as instance property', () => {
    const wrapper = mount(PhotoEditor, {
      propsData: {
        layout: 'advanced',
        license: '',
        imagePath: 'example.jpg'
      }
    });
    expect(typeof wrapper.vm.$pesdk).toBe('object');
  });
});
