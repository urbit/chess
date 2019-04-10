var gulp = require('gulp');
var cssimport = require('gulp-cssimport');
var cssnano = require('gulp-cssnano');
var rollup = require('gulp-better-rollup');
var sucrase = require('@sucrase/gulp-plugin');
var minify = require('gulp-minify');

var resolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var replace = require('rollup-plugin-replace');
var json = require('rollup-plugin-json');
var builtins = require('rollup-plugin-node-builtins');
var rootImport = require('rollup-plugin-root-import');
var globals = require('rollup-plugin-node-globals');

/***
  Main config options
***/

var urbitrc = require('./.urbitrc');

/***
  End main config options
***/

gulp.task('css-bundle', function() {
  return gulp
    .src('src/index.css')
    .pipe(cssimport())
    .pipe(cssnano())
    .pipe(gulp.dest('./urbit-code/app/chess/css'));
});

gulp.task('jsx-transform', function(cb) {
  return gulp.src('src/**/*.js')
    .pipe(sucrase({
      transforms: ['jsx']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js-imports', function(cb) {
  return gulp.src('dist/index.js')
    .pipe(rollup({
      plugins: [
        commonjs({
          namedExports: {
            'node_modules/react/index.js': [ 'Component' ],
            'node_modules/react-is/index.js': [ 'isValidElementType' ],
          }
        }),
        rootImport({
          root: `${__dirname}/dist/js`,
          useEntry: 'prepend',
          extensions: '.js'
        }),
        json(),
        globals(),
        builtins(),
        resolve()
      ]
    }, 'umd'))
    .on('error', function(e){
      console.log(e);
      cb();
    })
    .pipe(gulp.dest('./urbit-code/app/chess/js/'))
    .on('end', cb);
});

gulp.task('js-minify', function () {
  return gulp.src('./urbit-code/app/chess/js/index.js')
    .pipe(minify())
    .pipe(gulp.dest('./urbit-code/app/chess/js/'));
});

gulp.task('urbit-copy', function () {
  let ret = gulp.src('urbit-code/**/*');

  urbitrc.URBIT_PIERS.forEach(function(pier) {
    ret = ret.pipe(gulp.dest(pier));
  });

  return ret;
});

gulp.task('js-bundle-dev', gulp.series('jsx-transform', 'js-imports'));
gulp.task('js-bundle-prod', gulp.series('jsx-transform', 'js-imports', 'js-minify'))

gulp.task('bundle-dev',
  gulp.series(
    gulp.parallel(
      'css-bundle',
      'js-bundle-dev'
    ),
    'urbit-copy'
  )
);

gulp.task('bundle-prod',
  gulp.series(
    gulp.parallel(
      'css-bundle',
      'js-bundle-prod'
    ),
    'urbit-copy'
  )
);

gulp.task('default', gulp.series('bundle-dev'));
gulp.task('watch', gulp.series('default', function() {
  gulp.watch('src/**/*.js', gulp.parallel('js-bundle-dev'));
  gulp.watch('src/**/*.css', gulp.parallel('css-bundle'));

  gulp.watch('urbit-code/**/*', gulp.parallel('urbit-copy'));
}));
