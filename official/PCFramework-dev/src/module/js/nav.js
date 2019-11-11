var util = require('util')

console.log(util.sum(10, 20))

var nav = $('.mod-nav')
nav.append('<p>nav模块</p>')

module.exports = {
    hide: function () {
        nav.fadeToggle()
    }
}