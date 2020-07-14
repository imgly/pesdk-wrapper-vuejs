<template>
  <div id="app">
    <PhotoEditor :layout="layout" :license="license" :image-path="path" />
  </div>
</template>

<script>
import PhotoEditor from './components/PhotoEditor.vue';

const myLicense = ''; // replace this with the content of your license file

export default {
  name: 'App',
  components: {
    PhotoEditor
  },
  data: () => ({
    layout: 'advanced',
    license: myLicense,
    path: 'example.jpg'
  })
};
</script>

<style>
body {
  margin: 0;
}
</style>
