const config = require('./config')
const { jscdn, csscdn, useHash, usecdn, ignore } = config
const query = useHash ? '' : '?=t' + Date.now()

fis.hook('commonjs');

fis.match('/module/js/*.js', {
    isMod: true,
    release: '/$0',
    useHash,
    domain: usecdn && jscdn
})

fis.match('/util/*.js', {
    isMod: true,
    release: '/$0'
})

// fis.match('/lib/*.js', {
//     packTo: '/static/js/vendor.js' + query
// })

fis.match('/static/**/*.js', {
    useHash,
    domain: usecdn && jscdn
})

fis.match('/module/css/*.css', {
    useHash,
    domain: usecdn && csscdn,
    release: '/$0',
    query
})

fis.match('/icon/*.css', {
    useHash,
    domain: usecdn && csscdn,
    release: '/$0',
    query
})

fis.match('/img/*.{jpg, png, gif}', {
    useHash,
    release: '/static/$0',
    query
})

fis.match('/icon/*.png', {
    useHash,
    domain: usecdn && csscdn,
    release: '/$0',
    query
})

fis.match('/static/**/*.css', {
    useHash,
    domain: usecdn && csscdn,
    query
})

fis.match('/pages/*.html', {
    release: '/$0'
})

fis.match('::package', {
        postpackager: fis.plugin('loader', {
            resourceType: 'commonJs',
            useInlineMap: false,
            sourceMap: false,
            allInOne: {
                css: function(file) {
                  var url = `/static/css/${file.filename}.css`
                  return useHash ? url : url+ query
                },
                js: function(file) {
                  var url = `/static/js/${file.filename}.js`
                  return useHash ? url : url + query
                },
                ignore: []
            }
        })
    })
    .match('*.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('*.js', {
        optimizer: fis.plugin('uglify-js')
    })

fis.media('prod')
    .match('/icon/*.png', {
        deploy: fis.plugin('local-deliver', {
            to: './dist/static'
        })
    })
    .match('/img/**', {
        deploy: fis.plugin('local-deliver', {
            to: './dist/'
        })
    })
    .match('/static/**', {
        deploy: fis.plugin('local-deliver', {
            to: './dist/'
        })
    })

const env = fis.project.currentMedia()
const extra = require('fs-extra')

if(env === 'prod') {
     var form = fis.project.getTempRoot()+'/www/pages/'
    extra.copy(form, './dist')
}