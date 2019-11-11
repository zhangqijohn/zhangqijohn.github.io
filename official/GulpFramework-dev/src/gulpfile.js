'use strict'
const gulp = require('gulp')
const {
    task,
    src,
    dest,
    watch,
    series,
    parallel
} = gulp

const path = require('path')
const fs = require('fs')
const del = require('del')

const rm = require('gulp-rimraf')
const gulpif = require('gulp-if')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const replace = require('gulp-replace')
const inject = require('gulp-inject')
const append = require('gulp-append-prepend')
const requireJsOptimize = require('gulp-requirejs-optimize')
const amdOptimize = require('amd-optimize')

const imageMin = require('gulp-imagemin')
const imageMinJpg = require('imagemin-jpeg-recompress')

const cleanCss = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')

const uglify = require('gulp-uglify')
const htmlMin = require('gulp-htmlmin')

const server = require('browser-sync').create()
const reloadServer = server.reload

const config = require('./config')
const baseGulpConfig = require('./build/gulp.base.conf')
const devConf = require('./build/gulp.dev.conf')
const { distAssetsServer } = devConf
const prodConf = require('./build/gulp.prod.conf')
const { distDir, isCdn, cdn } = prodConf
const { supportedBrowsers } = baseGulpConfig

const manifest = {
    img: null
}

function accessSync(dir) {
    try {
        fs.accessSync(dir)
    } catch (e) {
        return false
    }
    return true
}

function resolve(dir) {
    return path.join(dir)
}

const buildProdConf = [
    async function clean() {
        return del.sync([distDir]);
    },
    function buildImage() {
        return src(baseGulpConfig.dev.img, { allowEmpty: true })
            // .pipe(
            //     gulpif(
            //         config.build.compressImage === true,
            //         imageMin([
            //             imageMin.optipng(),
            //             imageMinJpg({
            //                 target: 0.5
            //             })
            //         ])
            //     )
            // )
            .pipe(rev())
            .pipe(dest(baseGulpConfig.build.img))
            .pipe(rev.manifest())
            .pipe(dest(baseGulpConfig.build.img))
    },
    async function buildManifest() {
        if(accessSync(distDir)) {
            fs.readFile(distDir + '/static/img/rev-manifest.json', (err, data) => {
                manifest['img'] = data
            })
        }
    },
    function buildStyle() {
        return src(baseGulpConfig.dev.css, { allowEmpty: true })
            .pipe(autoprefixer({
                browsers: supportedBrowsers,
                cascade: false
            }))
            .pipe(concat('app.css'))
            .pipe(cleanCss())
            .pipe(replace(/(\.\.\/img\/)(\S+\.jpg|png|gif)/gi, ($0,$1, $2) => {
                    return $1 + JSON.parse(manifest['img'])[$2]
                })
            )
            .pipe(rev())
            .pipe(dest(baseGulpConfig.build.css))
            .pipe(rev.manifest())
            .pipe(dest(baseGulpConfig.build.css))
    }
]

if(config.libraryTarget === 'cmd') {
    buildProdConf.push(
        function buildComJs() {
            if(config.libraryTarget === 'amd') return false;
            return src([baseGulpConfig.dev.lib, "!./src/assets/js/lib/require-2.1.16.js"], { allowEmpty: true })
                .pipe(concat('common.js'))
                .pipe(uglify({
                    ie8: true
                }))
                .pipe(rev())
                .pipe(dest(baseGulpConfig.build.js))
                .pipe(rev.manifest())
                .pipe(dest(baseGulpConfig.build.js))
        },
        function buildAppJs() {
            if(config.libraryTarget === 'amd') return false;
            return src(baseGulpConfig.dev.app, { allowEmpty: true })
                .pipe(concat('main.js'))
                .pipe(uglify({
                    ie8: true
                }))
                .pipe(rev())
                .pipe(dest(baseGulpConfig.build.js))
                .pipe(rev.manifest())
                .pipe(dest(baseGulpConfig.build.js))
        },
        function buildInjectJs() {
            if(config.libraryTarget === 'amd') return false;
            var sources = src([distDir + '/static/css/**/*.css', distDir + '/static/js/**/*.js'])
            return src(baseGulpConfig.dev.html)
                .pipe(inject(sources))
                .pipe(gulp.dest(distDir));
        }
    )
}

if(config.libraryTarget === 'amd') {
    buildProdConf.push(
        function buildRequireJs() {
            if(config.libraryTarget !== 'amd') return false;
            return src([baseGulpConfig.dev.js])
                .pipe(amdOptimize('a', {
                    baseUrl: './src/assets/js/module/',
                    configFile: './src/assets/js/module/app.js'
                }))
                .pipe(concat('app.js'))
                .pipe(uglify({
                    ie8: true
                }))
                .pipe(rev())
                .pipe(dest(baseGulpConfig.build.js + '/module'))
                .pipe(rev.manifest())
                .pipe(dest(baseGulpConfig.build.js))
        },
        function buildConfRequire() {
            if(config.libraryTarget !== 'amd') return false;
            return src([baseGulpConfig.build.module])
                .pipe(append.appendText("require(['a'])"))
                .pipe(dest(baseGulpConfig.build.js + '/module'))
        },
        function buildCopyJs() {
            if(config.libraryTarget !== 'amd') return false;
            return src([baseGulpConfig.dev.lib])
                .pipe(dest(baseGulpConfig.build.lib))
        },
        function buildRequireInjectJs() {
            if(config.libraryTarget !== 'amd') return false;
            var sources = src([distDir + '/static/css/**/*.css', distDir + '/static/js/module/*.js'])
            return src(baseGulpConfig.dev.html)
                .pipe(
                    replace(/\.\.\/\.\.\/assets\/(\w+)\/(\S+\.js)/gi, ($0, $1, $2) => {
                        if($1.indexOf('js') > -1) {
                            return '/dist/static/js/' + $2
                        }
                    })
                )
                .pipe(inject(sources))
                .pipe(gulp.dest(distDir))
        },
    )
}

buildProdConf.push(
    function buildHtml() {
        return src(baseGulpConfig.build.html)
            .pipe(
                gulpif(isCdn===true,
                    replace(/\/dist\/static\/(\w+)\/(\S+\.\w+)/gi, ($0, $1, $2) => {
                        if($1.indexOf('css') > -1) {
                            return cdn.css + $2
                        }
                        if($1.indexOf('js') > -1) {
                            return cdn.js + $2
                        }
                    })
                )
            )
            .pipe(
                replace(/\.\.\/\.\.\/assets\/img\/(\S+\.jpg|png|gif)/gi, ($0, $1) => {
                    return `/dist/static/img/${JSON.parse(manifest['img'])[$1]}`
                })
            )
            .pipe(htmlMin({
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true
            }))
            .pipe(gulp.dest(distDir));
    },
    function server() {
        distAssetsServer()
    }
)

const buildDevConf = parallel (
    function devServer() {
        server.init({
            port: config.dev.port,
            startPath: 'src/views/index/index.html',
            server: {
                baseDir: config.build.assetsPublicPath,
                directory: true
            }
        })

        watch([
            baseGulpConfig.dev.html,
            baseGulpConfig.dev.css,
            baseGulpConfig.dev.js
        ]).on('change', reloadServer)
    }
)

exports.build = series(buildProdConf)

exports.default = buildDevConf
