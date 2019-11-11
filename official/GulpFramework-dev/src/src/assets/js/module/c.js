define(['jquery'], function ($) {
    var footer = "<div class='center footer'>"
    footer += window.navigator.userAgent
    footer += "</div>"
    $('body').append(footer)
})
