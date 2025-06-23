const { task, series, parallel, src, dest, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const csscomb = require('gulp-csscomb')
const autoprefixer = require('autoprefixer');

const plugins = [
    cssnano({ preset: 'default' }),
    autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
    })    
]

function scssCompile(){
    return src('./assets/scss/style.scss', { sourcemaps: '.' })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    // made finelooking css, but drop minification. 
    .pipe(csscomb())    
    .pipe(rename({ suffix : '.min' }))
    .pipe(dest('./build', { sourcemaps: '.' })).pipe(browserSync.stream());
}

function syncInit () {
  browserSync.init({
      server: {
          baseDir: './build'
      }
  });
}

function watchFiles() {
  syncInit()
  watch('./assets/scss/**/*.scss', scssCompile)
  watch('./*.html', copyHtml)
}

function copyHtml(){
   return src('./index.html').pipe(dest('./build')).pipe(browserSync.stream());
}

exports.default = series(scssCompile,copyHtml,watchFiles)