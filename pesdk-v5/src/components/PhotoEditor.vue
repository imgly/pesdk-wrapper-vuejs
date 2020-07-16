<template>
  <div ref="container" style="width: 100vw; height: 100vh;" />
</template>

<script>
import React from 'react';
import ReactDom from 'react-dom';
import Vue from 'vue';
import { deepmergeAll, PhotoEditorSDKUI, UIEvent } from 'photoeditorsdk';

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
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    editor: null,
    image: null
  }),
  watch: {
    layout() {
      this.initEditor();
    }
  },
  created() {
    // Make the value global for the Cypress E2E test
    window.initPesdk = this.initEditor.bind(this);

    this.image = new Image();
    if (this.imagePath) {
      this.image.onload = () => this.initEditor();
      this.image.src = this.imagePath;
    }
  },
  methods: {
    async initEditor(config = {}) {
      if (this.editor) {
        this.editor.dispose();
      }
      const editor = await new PhotoEditorSDKUI.init(
        deepmergeAll([
          this.options,
          {
            image: this.image,
            layout: this.layout,
            theme: this.theme,
            container: this.$refs.container,
            license: this.license,
            assetBaseUrl: this.assetPath
          },
          config
        ])
      );
      this.editor = editor;
      // Make the value global for the Cypress E2E test
      window.pesdkEditor = editor;

      /**
       * Save the editor instance as a vue instance property
       * so you are able to access it from anywhere with
       * `this.$pesdk` and listen on events.
       */
      Vue.prototype.$pesdk = this.editor;

      this.$pesdk.on(UIEvent.EXPORT, result => {
        // eslint-disable-next-line
        console.log(result);
      });
      this.$pesdk.on(UIEvent.EDITOR_READY, () => {});
    }
  }
};
</script>
