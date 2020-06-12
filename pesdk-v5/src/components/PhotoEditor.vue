<template>
  <div ref="container" style="width: 100vw; height: 100vh;" />
</template>

<script>
import React from 'react';
import ReactDom from 'react-dom';
import Vue from 'vue';
import { PhotoEditorSDKUI } from 'photoeditorsdk';

window.React = window.React || React;
window.ReactDom = window.ReactDom || ReactDom;

const supportedUis = ['advanced', 'basic'];
const supportedThemes = ['dark', 'light'];

export default {
  name: 'PhotoEditor',
  props: {
    layout: {
      type: String,
      default: 'advanced',
      validator: value => supportedUis.some(type => type === value)
    },
    theme: {
      type: String,
      default: 'dark',
      validator: value => supportedThemes.some(type => type === value)
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
    assetPath: {
      type: String,
      default: 'assets'
    },
    options: {
      type: Object
    }
  },
  data: () => ({
    editor: null,
    image: null
  }),
  watch: {
    layout() {
      this.renderUi();
    }
  },
  created() {
    this.image = new Image();
    if (this.imagePath) {
      this.image.onload = this.renderUi.bind(this);
      this.image.src = this.imagePath;
    }
  },
  methods: {
    async renderUi() {
      this.editor = await new PhotoEditorSDKUI.init({
        ...this.options,
        image: this.image,
        layout: this.layout,
        theme: this.theme,
        container: this.$refs.container,
        license: this.license,
        assetBaseUrl: this.assetPath
      });
      /**
       * Save the editor instance as a vue instance property
       * so you are able to access it from anywhere with
       * `this.$pesdk` and listen on events.
       */
      Vue.prototype.$pesdk = this.editor;
    }
  }
};
</script>
