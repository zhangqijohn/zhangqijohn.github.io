const gulp = require('gulp')
const {
    task,
    src,
    watch,
    series,
    dest
} = gulp

const del = require('del')
const path = require('path')
const fs = require('fs')

const browserify = require('browserify')
const spritesmith = require('gulp.spritesmith')

const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const globby = require('globby')
const merge = require('merge-stream')

const plugins = require('gulp-load-plugins')()

const baseConf = require('./build/gulp.base.conf')
const {
    html,
    css,
    js,
    modjs,
    image,
} = baseConf.dev
const { exclude } = baseConf
const { output } = baseConf
const { supportedBrowsers } = baseConf

const config = require('./config')
const {
    usecdn,
    cdn,
    useSprite,
    isMobile,
    port,
    host,
    autoOpenBrowser

} = config

const query = new Date().getTime()
const http = require('browser-sync').create()
const reload = http.reload
const devDir = './dev'

var spritePath = []
var revImagePath = []
var revJsPath = []
var revCssPath = []
var devSpritePath = []

function resolve(file) {
    return path.resolve(file)
}

task('devRevSprite', function () {
    return globby(['./icon/*.png']).then(function (paths) {
        devSpritePath = paths
    })
})

task('devSprite', function () {
    var ext = 'px'
    var stream = null
    var result = []
    devSpritePath.forEach((item, index)=>{
        var dir = item.replace(/icon\/\S+.png/gi,'')
        if(index===0) {
            stream = src(['./icon/*.png'])
                .pipe(buffer())
                .pipe(spritesmith({
                    imgName: 'icon.png',
                    cssName: 'icon.css',
                    imgPath: '../img/icon.png',
                    padding: 20,
                    cssTemplate:(data)=> {
                        var width = data.spritesheet.width
                        var height = data.spritesheet.height
                        var url = data.spritesheet.image

                        if(isMobile) {
                            width = width / 100
                            height = height / 100
                            ext = 'rem'
                        }

                        data.sprites.forEach(function (sprite) {
                            var posX = sprite.offset_x
                            var posY = sprite.offset_y
                            var iw = sprite.width
                            var ih = sprite.height

                            dir = sprite.source_image.replace(/\\icon\\\S+\.png/gi,'').replace(/E:\\\w+\\\w+\.\w+\.\w+/gi, '')

                            if(isMobile) {
                                posX = posX / 100
                                posY = posY / 100
                                iw = iw / 100
                                ih = ih / 100
                            }

                            result.push(
                                ".icon-" + sprite.name +
                                "{\n" +
                                "   display:inline-block;\n",
                                "   background: url('" + url + "') no-repeat " +
                                posX + ext+" " + posY + ext+";\n" +
                                "   background-size: " + width + ext+" " + height + ext+";\n" +
                                "   width: " + iw + ext +";\n" +
                                "   height: " + ih + ext + ";\n" +
                                "}\n"
                            )
                        });
                        return result.join("");
                    }
                }))
                .pipe(plugins.if('*.png', dest('./img')))
                .pipe(plugins.if('*.css', dest('./css')))
        }
    })

    return merge(stream)
})

task('devCss', function () {
    return globby([css]).then(function (paths) {
        paths.forEach(function (file) {
            var dir = file.replace(/css\/\S+\.css/gi,'')
            return src(dir+'css/*.css')
                .pipe(plugins.autoprefixer({
                    browsers: supportedBrowsers,
                    cascade: false
                }))
                .pipe(plugins.concat('app.css'))
                .pipe(plugins.sourcemaps.init({loadMaps: true}))
                .pipe(plugins.sourcemaps.write('./'))
                .pipe(dest(devDir))
                .pipe(http.reload({
                    stream: true
                }))
        })
    })
})

task('devCommonJs', function () {
    return globby(['./lib/*js']).then(function (paths) {
        paths.forEach(function (file) {
            var dir = file.replace(/lib\/\S+\.js/gi,'')

            return src(dir+'lib/*.js')
                .pipe(plugins.concat('common.js'))
                .pipe(plugins.uglify({
                    ie8: true
                }))
                .pipe(dest(devDir))
                .pipe(http.reload({
                    stream: true
                }))
        })
    })
})

task('devAppJs', function () {
    var files = fs.readdirSync('./js')
    var stream = null
    files.forEach(file => {
        stream = browserify({
                entries: `./js/${file}`,
                debug: true
            })
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(plugins.uglify({
                ie8: true
            })).on('error', console.error)
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(dest(devDir))
            .pipe(http.reload({
                stream: true
            }))
    })
    return merge(stream)
})

task('start', function () {
    http.init({
        port,
        host,
        open: autoOpenBrowser,
        startPath: 'index.html',
        server: {
            baseDir: './',
            directory: true
        }
    })

    watch(['./*.html']).on('change', reload)

    watch(['./css/*.css'], series('devCss'))

    watch(['./icon/*.png'], series('devRevSprite', 'devSprite'))

    watch([js, modjs], series('devCommonJs', 'devAppJs'))
})

task('clean', function () {
    return del(['dist/**'])
})

task('buildRevImage', function () {
    return globby([image, './dist/**/icon/*.{jpg,png,gif}', '!./node_modules/**/*.{gif,png,jpg}']).then(function (paths) {
        revImagePath = paths
    })
})

task('buildImage', function () {
    var stream = null
    revImagePath.forEach(function (file) {
        dir = file.replace(/img\/\S+\.(jpg|gif|png)$/gi,'').replace(/dist\//gi,'')
        stream = src([dir + 'img/*.{gif,png,jpg}', output+'/'+dir + 'img/*.png'])
            .pipe(plugins.rev())
            .pipe(dest(output+'/'+dir + 'img'))
            .pipe(plugins.rev.manifest())
            .pipe(dest(output+'/'+dir + 'img'))

    })
    return merge(stream)
})

task('buildDeleteIcon', function () {
    return src('./dist/**/img/icon.png')
        .pipe(plugins.clean())
})


task('buildCss', function () {
    return globby([css]).then(function (paths) {
        paths.forEach(function (file) {
            return src('./css/*.css')
                .pipe(plugins.autoprefixer({
                    browsers: supportedBrowsers,
                    cascade: false
                }))
                .pipe(plugins.concat('app.css'))
                .pipe(plugins.cleanCss())
                .pipe(plugins.rev())
                .pipe(dest(output+'/css'))
                .pipe(plugins.rev.manifest())
                .pipe(dest(output+'/css'))
        })
    })
})

task('buildCommonJs', function () {
    return src('./lib/*.js')
        .pipe(plugins.concat('common.js'))
        .pipe(plugins.uglify({
            ie8: true
        }))
        .pipe(dest(output+'/js'))
})

task('buildAppJs', function () {
    var files = fs.readdirSync('./js')
    files.forEach(function (file) {
        stream = browserify('./js/'+file)
            .bundle()
            .pipe(source('main.js'))
            .pipe(buffer())
            .pipe(plugins.uglify({
                ie8: true
            }))
            .pipe(dest(output+'/js'))
    })
    return merge(stream)
})

task('buildRevCss', function () {
    return globby(['./css/*.css']).then(function (paths) {
        paths.forEach(function (file) {
            return src('./css/*.css')
                .pipe(plugins.autoprefixer({
                    browsers: supportedBrowsers,
                    cascade: false
                }))
                .pipe(plugins.concat('app.css'))
                .pipe(plugins.cleanCss())
                .pipe(plugins.rev())
                .pipe(dest(output +'/css'))
                .pipe(plugins.rev.manifest())
                .pipe(dest(output+'/css'))
        })
    })
})

task('buildHtml', function () {
    return src([html, exclude])
        .pipe(dest(output))
})

task('buildRevJs', function () {
    return src([output+'/js/*.js'])
        .pipe(src([output+'/js/*.js']))
        .pipe(plugins.clean())
        .pipe(plugins.rev())
        .pipe(dest(output+'/js'))
        .pipe(plugins.rev.manifest())
        .pipe(dest(output+'/js'))
})

task('buildReplaceCss', function () {
  return  src(output+'/css/*.css', { allowEmpty: true })
        .pipe(plugins.replace(/(\.\.\/\w+\/)(\S+(\.jpg|png|gif))/gi, ($0,$1,$2) => {
                var data = fs.readFileSync(output+'/img/rev-manifest.json')
                $1 = $1.replace(/\S+/gi, '../img/')
                $1 = usecdn ? cdn.img : $1
                return $1 + JSON.parse(data)[$2]
            })
        )
        .pipe(dest(output+'/css'))
});
task('buildInjectHtml', function () {
    return src([output+'/*.html'])
        .pipe(buffer())
        .pipe(plugins.inject(src([output+'/css/*.css', output+'/js/*.js'], {read: false}), {relative: true}))
        .pipe(plugins.htmlmin({
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(dest(output))
})
task('buildReplaceHtml', function () {
    return src([baseConf.build.manifest, baseConf.build.html])
        .pipe(buffer())
        .pipe(plugins.revCollector({
            replaceReved: true,
            dirReplacements: {
                'img': function (file) {
                    return usecdn ? cdn.img + file : 'img/' + file
                },
                'css': function (file) {
                    return usecdn ? cdn.css + file : 'css/' + file
                },
                'js': function (file) {
                    return usecdn ? cdn.js + file : 'js/' + file
                }
            }
        }) )
        .pipe(dest(output))
})

if(useSprite) {
    exports.dev = series(
        'devRevSprite',
        'devSprite',
        'devCss',
        'devCommonJs',
        'devAppJs',
        'start'
    );
} else {
    exports.dev = series(
        'devCss',
        'devCommonJs',
        'devAppJs',
        'start'
    );
}

exports.build = series(
    'clean',
    'buildRevImage',
    'buildImage',
    'buildCss',
    'buildCommonJs',
    'buildAppJs',
    'buildHtml',
    'buildReplaceCss',
    'buildRevJs',
    'buildInjectHtml',
    'buildReplaceHtml'
)
