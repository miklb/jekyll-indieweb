"use strict";
// gulp 
const gulp = require("gulp");

// needed for Jekyll command
const cp = require("child_process");

// load all of plugins in devDependencies from package.json
const plugin = require('gulp-load-plugins')({
  pattern: ["*"],
  overridePattern: true,
  scope: ["devDependencies"],
  rename: {
    'postcss-easy-import': 'easyImport',
    'postcss-preset-env': 'cssPresentEnv',
    'css-declaration-sorter': 'cssDeclarationSorter'
  }
  
});

const onError = (err) => {
  console.log(err);
};


// BrowserSync
function browserSync(done) {
  plugin.browserSync.init({
    server: {
      baseDir: "./_site/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  plugin.browserSync.reload();
  done();
}

// Clean assets
function clean() {
  return plugin.del(["./_site/assets/"]);
}



// CSS task using PostCSS
function css() {
  var postcssPlugins = [
    // import CSS files using @import
    plugin.easyImport(),
    // PostCSS plugin converts modern CSS to polyfills
    // based on browser support in .browserslistrc 
    plugin.cssPresentEnv({ stage: 1 }),
    // re-order declartions based on property
    plugin.cssDeclarationSorter({
      order: 'concentric-css'
    })
  ]
  return gulp
    .src("./assets/css/_inc/main.css")
    .pipe(plugin.sourcemaps.init())
    .pipe(plugin.postcss(postcssPlugins))
    .pipe(plugin.sourcemaps.write('.'))
    // We need to write the compiled CSS for local development
    .pipe(gulp.dest("./_site/assets/css/"))
    // This is the compiled file the remote theme will use
    .pipe(gulp.dest("./assets/css/"))
    .pipe(plugin.browserSync.stream());
}

// Jekyll
function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], {
    stdio: "inherit"
  });
}

// Watch files
function watchFiles() {
  gulp.series(jekyll);
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
const watch = gulp.series(clean, jekyll, css, gulp.parallel(watchFiles, browserSync));

// export tasks

exports.css = css;
exports.jekyll = jekyll;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;