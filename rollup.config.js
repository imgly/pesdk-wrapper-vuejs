import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import babel from 'rollup-plugin-babel'; // Transpile/polyfill with reasonable browser support
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
export default {
  input: 'src/components/index.js', // Path relative to package.json
  output: {
    name: 'PhotoEditor',
    exports: 'named'
  },
  plugins: [
    commonjs(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true // Explicitly convert template to render function
    }),
    babel() // Transpile to ES5
  ]
};
