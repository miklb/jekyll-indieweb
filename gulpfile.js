"use strict";

// Load plugins

const browsersync = require("browser-sync").create();
const cp = require("child_process");
const cssnano = require("cssnano");
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const easyimport = require("postcss-easy-import");
const csslogical = require("postcss-logical");
const cssCustomMedia = require("postcss-custom-media");
const cssCustomSelectors = require("postcss-custom-selectors");
const cssMediaMinMax = require("postcss-media-minmax");
const cssPresentEnv = require("postcss-preset-env");
const cssDeclarationSorter = require('css-declaration-sorter');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./_site/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}



// CSS task
function css() {
  var plugins = [
    easyimport(),
    csslogical({
      dir: 'ltr'
    }),
    cssCustomMedia(),
    cssCustomSelectors(),
    cssMediaMinMax(),
    cssPresentEnv(),
    cssDeclarationSorter({
      order: 'concentric-css'
    })
  ]
  return gulp
    .src("./assets/css/_inc/main.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./_site/assets/css/"))
    .pipe(gulp.dest("./assets/css/"))
    .pipe(browsersync.stream());
}

// Jekyll
function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], {
    stdio: "inherit"
  });
}

// Watch files
function watchFiles() {
  gulp.watch("./assets/css/_inc/*", css);
  gulp.series(css, browserSyncReload)
  gulp.watch(
    [
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
      "./_posts/**/*"
      
    ],
    gulp.series(jekyll, css, browserSyncReload)
  );
}

// define complex tasks
const build = gulp.series(clean, jekyll, css);
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks

exports.css = css;
exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;