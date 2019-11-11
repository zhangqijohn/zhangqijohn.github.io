require('/util').log()

var nav = require('/module/js/nav.js')

$('.btn-nav').click(function () {
    nav.hide()
})

$('.btn-banner').click(function () {
    require('/module/js/banner.js').show()
    require('/module/js/banner.js').run()
})