<div align="center">
  <img width="484" heigth="169" src="/logo.png" alt="vue-pesdk">
</div>

**You can find our latest examples at https://github.com/imgly/pesdk-web-examples.**

# vue-pesdk

> PhotoEditor SDK Vue.js wrapper

## 🏷 Note

[PhotoEditor SDK](https://img.ly/photo-sdkutm_campaign=Projects&utm_source=Github&utm_medium=Side_Projects&utm_content=VueJs-Plugin)
is a product of img.ly GmbH. In order to use [PhotoEditor SDK](https://img.ly/photo-sdk?utm_campaign=Projects&utm_source=Github&utm_medium=Side_Projects&utm_content=VueJs-Plugin) inside one of your products, you will need a valid
[a license](https://img.ly/pricing?utm_campaign=Projects&utm_source=Github&utm_medium=Side_Projects&utm_content=VueJs-Plugin).

## 🔧 Installation

```bash
yarn add vue-pesdk photoeditorsdk react react-dom styled-components
or
npm i -D vue-pesdk photoeditorsdk react react-dom styled-components
```

`react`, `react-dom` and `styled-components` are peerDependencies and are needed to render the PhotoEditorSDK UI.
In addition you need the [PhotoEditor SDK](https://img.ly/photo-sdk?utm_campaign=Projects&utm_source=Github&utm_medium=Side_Projects&utm_content=VueJs-Plugin) assets. You can either get them [here](https://github.com/imgly/pesdk-html5-build/tree/master/assets) or copy it from your `node_modules` into your public asset folder. And set the `assetBaseUrl` prop to this folder.

```bash
cp -r node_modules/photoeditorsdk/assets/ ~/projects/your-project/public/assets
```

If needed, take a look at the [official documentation](https://img.ly/docs/pesdk) for further information.

## 👈 Usage

Import the [PhotoEditor SDK](https://img.ly/photo-sdk?utm_campaign=Projects&utm_source=Github&utm_medium=Side_Projects&utm_content=VueJs-Plugin) css styles and the vue-sdk component.

```html
<template>
  <PhotoEditor
    asset-path="/static"
    license='{"owner": ...}'
    image-path="/static/example.jpg"
  />
</template>

<script>
  import PhotoEditor from 'vue-pesdk';

  export default {
    components: { PhotoEditor }
  };
</script>
```

## 📒 Props

| prop      | default    | type   | required | description                                                                                      |
| --------- | ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| layout    | 'advanced' | String | no       | Select if you want to use the Advanced or Basic UI. Supported values are `advanced` and `basic`. |
| theme     | 'dark'     | String | no       | Select if you want to use the Dark or Light Theme. Supported values are `dark` and `light`.      |
| license   | ''         | String | **yes**  | Your PhotoEditorSDK license. [Get it here](https://img.ly/photo-sdk)                       |
| imagePath | ''         | String | **yes**  | Path to the image that will be rendered initially                                                |
| assetPath | 'assets'         | String | **yes**  | Path to your assets. Where the PhotoEditorSDK assets are stored                                  |
| options   |            | Object | no       |                                                                                                  |

## 🛫 Getting Started

The idea behind this wrapper is to simplify the usage of the [PhotoEditor SDK](https://img.ly/photo-sdk?utm_campaign=Projects&utm_source=Github&utm_medium=Side_Projects&utm_content=VueJs-Plugin) inside Vue. We try to minimize the configuration and maximize the possibilities.
Because of that you have only 3 important and required props, `license`, `imagePath` and `assetPath` to get the editor running.

However, you have to either download or copy the [PhotoEditor SDK](https://img.ly/photo-sdk?utm_campaign=Projects&utm_source=Github&utm_medium=Side_Projects&utm_content=VueJs-Plugin) assets to your public asset folder. You can either get them [here](https://github.com/imgly/pesdk-html5-build/tree/master/assets) or copy them from your `node_modules`.

If you need more configuration possibilities, you can pass all the mentioned [options](https://img.ly/docs/pesdk/web/v4/introduction/configuration/) to the `options` prop.

Furthermore, the editor instance is saved as a Vue Instance Property so you can access the editor instance inside your parent component with `this.$pesdk` after the editor is mounted.

## 📺 Examples

### Basic Example

```html
<template>
  <PhotoEditor
    :license="$options.license",
    asset-path="/assets"
    image-path="/assets/example.jpg"
  />
</template>

<script>
  import PhotoEditor from 'vue-pesdk'
  import PesdkLicense from './myLicense.json'

  export default {
    components: { PhotoEditor },
    license: JSON.stringify(PesdkLicense)
  }
```

### Listen to Events

You can listen to various events in the [PhotoEditorSdk](https://img.ly/docs/pesdk/web/v4/concepts/events/)
You can simply attach an `.on()` event to the editor instance.

```html
<template>
  <PhotoEditor
    :license="$options.license"
    asset-path="/assets"
    image-path="/assets/example.jpg"
  />
</template>

<script>
  import PhotoEditor from 'vue-pesdk'
  import PesdkLicense from './myLicense.json'

  export default {
    components: { PhotoEditor },
    license: JSON.stringify(PesdkLicense), // This is optional way to store non-reactive data in vue.
    mounted () {
      this.$pesdk.on('export', (result) => {
        console.log('User clicked export, resulting image / dataurl:')
        console.log(result)
      })
    }
  }
```

### Specifying which focus modes are available

Like mentioned earlier you can pass in all configuration options like [here](https://img.ly/docs/pesdk/web/v4/features/focus/).

```html
<template>
  <PhotoEditor
    asset-path="/assets"
    :license="$options.license"
    :options="options"
    image-path="/assets/example.jpg"
  />
</template>

<script>
  import PhotoEditor from 'vue-pesdk'
  import PesdkLicense from './myLicense.json'

  export default {
    components: { PhotoEditor },
    license: JSON.strigify(PesdkLicense), // This is optional.
    data: () => ({
      options: {
        controlsOptions: {
          focus: {
            availableModes: ['radial', 'mirrored', 'linear', 'gaussian']
          }
        }
      }
    })
  }
```

## 📜 Changelog

Details changes for each release are documented in the [CHANGELOG.md](CHANGELOG.md).

## 👨‍💻 Development

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 📜 License

Please see [LICENSE](LICENSE.md) for licensing details.

## 👥 Authors and Contributors

Please see [CONTRIBUTORS](CONTRIBUTORS.md) for licensing details.

## 💬 Support or Contact

For support requests, please use our [Support Desk](https://support.img.ly).
