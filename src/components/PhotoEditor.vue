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

export default {
  name: 'PhotoEditor',
  props: {
    layout: {
      type: String,
      default: 'advanced',
      validator: value => supportedUis.some(type => type === value)
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
    library: {
      type: Object
    },
    custom: {
      type: Object
    },
    tools: {
      type: Object
    },
    assetPath: {
      type: String,
      default: '/static/assets'
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
    layout() {
      this.renderUi();
    }
  },
  mounted() {
    this.image = new Image();
    this.image.onload = () => {
      this.renderUi();
    };
    if (this.imagePath) {
      this.image.src = this.imagePath;
    }
  },
  methods: {
    renderUi() {
      this.editor = new PhotoEditorSDKUI({
        ...this.options,
        image: this.image,
        layout: this.layout,
        container: this.$refs.container,
        engine: {
          license: this.license
        },
        assets: {
          baseUrl: this.assetPath,
          resolver: this.assetResolver
        }
      });
      this.saveEditor();
    },

    /**
     * Save the editor instance as a vue instance property
     * so you are able to access it from anywhere with
     * `this.$pesdk` and listen on events.
     */
    saveEditor() {
      Vue.prototype.$pesdk = this.editor;
    }
  }
};
</script>
