requirejs.config({
    baseUrl: '../../assets/js/module/',
    paths: {
        jquery: '../lib/jquery',
        swiper: '../lib/swiper',
        a: 'a',
        b: 'b',
        c: 'c'
    },
    shim: {
        swiper: '../lib/swiper'
    }
})
