import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import babel from 'rollup-plugin-babel'; // Transpile/polyfill with reasonable browser support
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

const plugins = [
  resolve(),
  vue({
    css: true, // Dynamically inject css as a <style> tag
    compileTemplate: true // Explicitly convert template to render function
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  babel({ exclude: 'node_modules/**', runtimeHelpers: true }), // Transpile to ES5
  commonjs()
];

if (process.env.NODE_ENV === 'development') {
  const makeHtmlAttributes = attributes => {
    if (!attributes) return '';
    const keys = Object.keys(attributes);
    // eslint-disable-next-line no-param-reassign
    return keys.reduce(
      (result, key) => (result += ` ${key}="${attributes[key]}"`),
      ''
    );
  };

  const template = async ({ attributes, files, publicPath, title }) => {
    const scripts = (files.js || [])
      .map(({ fileName }) => {
        const attrs = makeHtmlAttributes(attributes.script);
        return `<script src="${publicPath}${fileName}"${attrs}></script>`;
      })
      .join('\n');

    const links = (files.css || [])
      .map(({ fileName }) => {
        const attrs = makeHtmlAttributes(attributes.link);
        return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
      })
      .join('\n');

    return `
  <!doctype html>
  <html${makeHtmlAttributes(attributes.html)}>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      ${links}
    </head>
    <body>
      <div id="app"></div>
      ${scripts}
    </body>
  </html>`;
  };

  plugins.push(html({ template }));
  plugins.push(livereload({ watch: 'dist' }));
  plugins.push(
    serve({
      open: true,
      contentBase: ['dist', 'src/static']
    })
  );
}

export default {
  input: 'src/main.js', // Path relative to package.json
  output: {
    name: 'vue-pesdk',
    dir: 'dist',
    format: 'cjs',
    globals: {
      vue: 'Vue'
    },
    external: ['vue', 'react', 'react-dom', 'photoeditorsdk']
  },
  plugins
};
