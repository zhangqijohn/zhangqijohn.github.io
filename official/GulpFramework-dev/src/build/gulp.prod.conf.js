'use strict'
/**
 * 生产环境入口配置
 * distDir build构建目录
 * isCdn 是否使用CDN
 * cdn CDN路径
 */

const config = require('../config')

module.exports = {
    distDir: './dist',
    isCdn: config.build.useCdn,
    cdn: config.build.cdn,
}

var gulp = require('gulp');//gulp主组件
var htmlmin = require('gulp-htmlmin');//html压缩组件
var jshint = require('gulp-jshint');//js语法检查
var concat = require('gulp-concat');//多个文件合并为一个
var minifyCss = require('gulp-minify-css');//压缩CSS为一行；
var uglify = require('gulp-uglify');//js文件压缩
var rev = require('gulp-rev');//对文件名加MD5后缀
var revCollector = require('gulp-rev-collector');//路径替换
var gulpRemoveHtml = require('gulp-remove-html');//标签清除，参考：https://www.npmjs.com/package/gulp-remove-html
var removeEmptyLines = require('gulp-remove-empty-lines');//清除空白行，参考：https://www.npmjs.com/package/gulp-remove-empty-lines
var replace = require('gulp-replace');//文件名替换，参考：https://www.npmjs.com/package/gulp-replace
var gulpSequence = require('gulp-sequence');//同步执行，参考：https://github.com/teambition/gulp-sequence
var clean = require('gulp-clean');//清除文件插件，参考：https://github.com/teambition/gulp-clean

var buildBasePath = 'build/';//构建输出的目录

//删除Build文件
gulp.task('clean:Build', function (cb) {
    return gulp.src(buildBasePath, {read: false})
    .pipe(clean());
});

//复制文件夹
gulp.task('copy', function() {
    return gulp.src('plugins/**/*')
    .pipe(gulp.dest(buildBasePath+'plugins'));
});
gulp.task('copyimg',  function() {
    //如果下面执行了md5资源文件img，那么这步可以省略
    return gulp.src('img/**/*')
    .pipe(gulp.dest(buildBasePath+'img'));
});

//合并js,css文件之后压缩代码
//js
gulp.task('minifyjs', function(){
    return gulp.src('js/**/*.js')
    .pipe(concat('build.js'))//合成到一个js
    .pipe(gulp.dest(buildBasePath+'js'))//输出到js目录
    .pipe(uglify())//压缩js到一行
    .pipe(concat('build.min.js'))//压缩后的js
    .pipe(gulp.dest(buildBasePath+'js'));//输出到js目录
});
//jsmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifyjsmd5', function() {
    return gulp.src('js/**/*.js')
    .pipe(concat('build.min.js'))//压缩后的js
    .pipe(uglify())//压缩js到一行
    .pipe(rev())//文件名加MD5后缀
    .pipe(gulp.dest(buildBasePath+'js'))//输出到js目录
    .pipe(rev.manifest('rev-js-manifest.json'))////生成一个rev-manifest.json
    .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
});
//css
gulp.task('minifycss', function (){
    return gulp.src('css/**/*.css')
    .pipe(concat('build.css'))//合成到一个css
    .pipe(gulp.dest(buildBasePath+'css'))//输出到css目录
    .pipe(minifyCss())//压缩css到一样
    .pipe(concat('build.min.css'))//压缩后的css
    .pipe(gulp.dest(buildBasePath+'css'));//输出到css目录
});
//cssmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifycssmd5', function (){
    return gulp.src('css/**/*.css')
    .pipe(concat('build.min.css'))//压缩后的css
    .pipe(minifyCss())//压缩css到一样
    .pipe(rev())//文件名加MD5后缀
    .pipe(gulp.dest(buildBasePath+'css'))//输出到css目录
    .pipe(rev.manifest('rev-css-manifest.json'))//生成一个rev-manifest.json
    .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
});
//imgmd5，压缩后并用md5进行命名，下面使用revCollector进行路径替换
gulp.task('minifyimgmd5', function (){
    return gulp.src(['img/**/*.jpg','img/**/*.png','img/**/*.gif'])
    .pipe(rev())//文件名加MD5后缀
    .pipe(gulp.dest(buildBasePath+'img'))//输出到css目录
    .pipe(rev.manifest('rev-img-manifest.json'))//生成一个rev-manifest.json
    .pipe(gulp.dest('rev'));//将 rev-manifest.json 保存到 rev 目录内
});

//html压缩
gulp.task('html',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('*.html')
    .pipe(gulpRemoveHtml())//清除特定标签
    .pipe(removeEmptyLines({removeComments: true}))//清除空白行
    .pipe(htmlmin(options))
    .pipe(gulp.dest(buildBasePath));
});

//生产使用，替换文件名，common.js替换为build.min.js
gulp.task('replacejs', function(){
    return gulp.src([buildBasePath+'*.html'])
    .pipe(replace('common.js', 'build.min.js'))
    .pipe(gulp.dest(buildBasePath));
});
//生产使用，替换文件名，common.css替换为build.min.css
gulp.task('replacecss', function(){
    return gulp.src([buildBasePath+'*.html'])
    .pipe(replace('common.css', 'build.min.css'))
    .pipe(gulp.dest(buildBasePath));
});
//开发使用，替换文件名，common.js替换为build.js
gulp.task('replacejsdev', function(){
    return gulp.src([buildBasePath+'*.html'])
    .pipe(replace('common.js', 'build.js'))
    .pipe(gulp.dest(buildBasePath));
});
//开发使用，替换文件名，common.css替换为build.css
gulp.task('replacecssdev', function(){
    return gulp.src([buildBasePath+'*.html'])
    .pipe(replace('common.css', 'build.css'))
    .pipe(gulp.dest(buildBasePath));
});

//使用rev替换成md5文件名，这里包括html和css的资源文件也一起
gulp.task('rev', function() {
    //html，针对js,css,img
    return gulp.src(['rev/**/*.json', buildBasePath+'**/*.html'])
    .pipe(revCollector({replaceReved:true }))
    .pipe(gulp.dest(buildBasePath));
});
gulp.task('revimg', function() {
    //css，主要是针对img替换
    return gulp.src(['rev/**/rev-img-manifest.json', buildBasePath+'css/*.css'])
    .pipe(revCollector({replaceReved:true }))
    .pipe(gulp.dest(buildBasePath+'css'));
});

//监视文件的变化，有修改时，自动调用default缺省默认任务
gulp.task('watch', function () {
    gulp.watch('**/*.html', ['default']);
});
//监视文件的变化，有修改时，自动调用default2缺省默认任务
gulp.task('watch2', function () {
    gulp.watch('**/*.html', ['default2']);
});
//监视文件的变化，有修改时，自动调用defaultdev缺省默认任务
gulp.task('watchdev', function () {
    gulp.watch('**/*.html', ['defaultdev']);
});

//缺省默认任务，输出的js和css文件都带参数
/*执行顺序：
* 1、清除编译输出目录build的全部文件
* 2、复制第三方组件依赖到build文件夹
* 3、使用带md5对js文件进行压缩打包一个文件，命名根据gulp-rev插件md5之后的命名进行命名，如build-asdf123.min.js，并输出到build/js文件夹
* 4、使用带md5对cs文件进行压缩打包一个文件，命名根据gulp-rev插件md5之后的命名进行命名，如build-asd323.min.css，并输出到build/cs文件夹
* 5、（可选）使用带md5对img文件夹的全部文件进行重命名，命名根据gulp-rev插件md5之后的命名进行命名，如common-asdf123.jpg，并输出到build/img文件夹；如果这部不操作，下面第10步将不执行。
* 6、将build目录下的全部html页面进行压缩处理，采用gulp-minhtml插进
* 7、由于项目上使用了模块开发，然后每个页面上都会引入common.js文件，而合并后的js文件为build.min.js，所以使用gulp-replace插进对html页面进行替换，并将html文件输出到build目录上
* 8、再次在build目录上，将html进行common.css文件替换成build.min.css
* 9、使用gulp-rev-collectorc插件对刚才生成带参数的js和css文件在html页面上进行替换，如build.min.js替换成build-asdf123.min.js。还是输出到build目录。
* 10、（可选）使用gulp-rev-collectorc插件对刚才生成带参数的img文件在css文件上进行替换，如common.jpg替换成common-asdf12.jpg。输出到目录
* */
gulp.task('default',function(cb){gulpSequence('clean:Build','copy','minifyjsmd5','minifycssmd5','minifyimgmd5','html','replacejs','replacecss','rev','revimg')(cb);});
//默认任务2，输出的js和css文件不带参数
/*执行顺序：
 * 1、清除编译输出目录build的全部文件
 * 2、复制第三方组件依赖到build文件夹
 * 3、对js文件进行压缩打包一个文件，命名如build.min.js，并输出到build/js文件夹
 * 4、对cs文件进行压缩打包一个文件，命名如build.min.css，并输出到build/cs文件夹
 * 5、将build目录下的全部html页面进行压缩处理，采用gulp-minhtml插进
 * 6、由于项目上使用了模块开发，然后每个页面上都会引入common.js文件，而合并后的js文件为build.min.js，所以使用gulp-replace插进对html页面进行替换，并将html文件输出到build目录上
 * 7、再次在build目录上，将html进行common.css文件替换成build.min.css
 * */
gulp.task('default2',function(cb){gulpSequence('clean:Build','copy','copyimg','minifyjs','minifycss','html','replacejs','replacecss')(cb);});
//开发使用默认任务，js和css不带参数，且不合并
/*执行顺序：
 * 1、清除编译输出目录build的全部文件
 * 2、复制第三方组件依赖到build文件夹
 * 3、对js文件进行压缩打包一个文件，命名如build.js，并输出到build/js文件夹
 * 4、对cs文件进行压缩打包一个文件，命名如build.css，并输出到build/cs文件夹
 * 5、将build目录下的全部html页面进行压缩处理，采用gulp-minhtml插进
 * 6、由于项目上使用了模块开发，然后每个页面上都会引入common.js文件，而合并后的js文件为build.js，所以使用gulp-replace插进对html页面进行替换，并将html文件输出到build目录上
 * 7、再次在build目录上，将html进行common.css文件替换成build.css
 * */
gulp.task('defaultdev',function(cb){gulpSequence('clean:Build','copy','copyimg','minifyjs','minifycss','html','replacejsdev','replacecssdev')(cb);});
