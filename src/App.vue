<template>
  <div id="app">
    <button @click="react()">React UI</button>
    <button @click="desktop()">Desktop UI</button>
    <PhotoEditor
      :ui="ui"
      :image-path="path"
      :license="license"/>
  </div>
</template>

<script>
import PhotoEditor from './components/PhotoEditor'
import 'photoeditorsdk/css/PhotoEditorSDK.UI.DesktopUI.min.css'
import 'photoeditorsdk/css/PhotoEditorSDK.UI.ReactUI.min.css'
import * as myLicense from './components/license.json'

export default {
  name: 'App',
  components: {
    PhotoEditor
  },
  data: () => ({
    path: '/static/example.jpg',
    license: JSON.stringify(myLicense),
    editorInstance: null,
    ui: 'desktop'
  }),
  mounted () {
    this.$pesdk.on('export', (result) => {
      console.log(result)
    })
  },
  methods: {
    react () {
      this.ui = 'react'
    },
    desktop () {
      this.ui = 'desktop'
    }
  }
}
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
