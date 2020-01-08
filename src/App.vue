<template>
  <div id="app">
    <PhotoEditor :layout="layout" :image-path="path" :license="license" />
  </div>
</template>

<script>
import PhotoEditor from './components/PhotoEditor.vue';
import { UIEvent } from 'photoeditorsdk';

const myLicense = ''; // replace this with the content of your license file

export default {
  name: 'App',
  components: {
    PhotoEditor
  },
  data: () => ({
    path: require('./static/example.jpg'),
    license: myLicense,
    layout: 'advanced'
  }),
  mounted() {
    this.$pesdk.on(UIEvent.EXPORT, result => {
      // eslint-disable-next-line
      console.log(result);
    });
    this.$pesdk.on(UIEvent.EDITOR_READY, () => {
      // You can also access the editor and call functions on it
      // directly if you need to.
      this.$pesdk.getEditor();
    });
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
