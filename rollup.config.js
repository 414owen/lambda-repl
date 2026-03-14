import pkg from './package.json' with { type: 'json' };
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/index.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({ babelHelpers: 'bundled' }),
      production && strip(),
      production && terser({
        compress: { passes: 2 },
        mangle: {},
        module: true,
        output: { comments: false }
      })
    ]
  }
];
