<template>
  <div
    ref="container"
    style="width: 100vw; height: 100vh;"
  />
</template>

<script>
import React from 'react'
import ReactDom from 'react-dom'
import Vue from 'vue'
import PhotoEditorSDK from 'photoeditorsdk'
import 'photoeditorsdk/desktop-ui' // eslint-disable-line no-unused-vars
import 'photoeditorsdk/react-ui' // eslint-disable-line no-unused-vars

window.React = window.React || React
window.ReactDom = window.ReactDom || ReactDom

const supportedUis = ['react', 'desktop']

export default {
  props: {
    ui: {
      type: String,
      default: 'react',
      validator: (value) => supportedUis.some((type) => type === value)
    },
    license: {
      type: String,
      required: true,
      default: ''
    },
    imagePath: {
      type: String,
      required: true,
      default: ''
    },
    options: {
      type: Object
    },
    editorOptions: {
      type: Object
    },
    assetPath: {
      type: String,
      default: 'static'
    },
    assetResolver: {
      type: Function
    }
  },
  data: () => ({
    editor: null,
    image: null
  }),
  watch: {
    ui () {
      this.renderUi()
    }
  },
  created () {
    this.image = new Image()
    if (this.imagePath) {
      this.image.src = this.imagePath
    }
  },
  mounted () {
    this.renderUi()
  },
  methods: {
    renderUi () {
      if (this.ui === 'desktop') {
        this.renderDesktopUi()
      } else {
        this.renderReactUi()
      }
      this.saveEditor()
    },
    renderDesktopUi () {
      this.editor = new PhotoEditorSDK.UI.DesktopUI({
        ...this.options,
        container: this.$refs.container,
        license: this.license,
        assets: {
          baseUrl: this.assetPath,
          resolver: this.assetResolver
        },
        editor: {
          image: this.image,
          ...this.editorOptions
        }
      })
    },
    renderReactUi () {
      this.editor = new PhotoEditorSDK.UI.ReactUI({
        ...this.options,
        container: this.$refs.container,
        license: this.license,
        assets: {
          baseUrl: this.assetPath,
          resolver: this.assetResolver
        },
        editor: {
          image: this.image,
          ...this.editorOptions
        }
      })
    },

    /**
     * Save the editor instance as a vue instance property
     * so you are able to access it from anywhere with
     * `this.$pesdk` and listen on events.
     */
    saveEditor () {
      Vue.prototype.$pesdk = this.editor
    }
  }
}
</script>
