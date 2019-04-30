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
const pclogical = require("postcss-logical");
const pccustommedia = require("postcss-custom-media");
const pccustomselectors = require("postcss-custom-selectors");
const pcmediaminmax = require("postcss-media-minmax");
const pcpresetenv = require("postcss-preset-env");

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
    pclogical({
      dir: 'ltr'
    }),
    pccustommedia(),
    pccustomselectors(),
    pcmediaminmax(),
    pcpresetenv()
  ]
  return gulp
    .src("./assets/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./_site/assets/css/"))
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
  gulp.watch("./assets/css/*", css);
  gulp.series(css, browserSyncReload)
  gulp.watch(
    [
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
      "./_posts/**/*",
      "./_projects/**/*"
    ],
    gulp.series(jekyll, browserSyncReload)
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