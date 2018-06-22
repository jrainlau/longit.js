import { resolve } from 'path'
import rollupResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: resolve(__dirname, '../docs/index.js'),
  output: {
    file: resolve(__dirname, '../docs/app.js'),
    name: 'Long',
    format: 'umd'
  },
  plugins: [
    rollupResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      contentBase: resolve(__dirname, '../docs'),
      host: 'localhost',
      port: 3000
    }),
    livereload()
  ]
}
