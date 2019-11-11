var banner = $('.mod-banner')
banner.append('<p class="center">banner模块</p>')

module.exports = {
    show: function () {
        banner.fadeToggle()
    },
    run: function () {
        var mySwiper = new Swiper('.swiper-container',{
            pagination: '.pagination',
            loop:true,
            autoplay: 3000,
            grabCursor: true,
            paginationClickable: true
        })
        $('.arrow-left').on('click', function(e){
            e.preventDefault()
            mySwiper.swipePrev()
        })
        $('.arrow-right').on('click', function(e){
            e.preventDefault()
            mySwiper.swipeNext()
        })
    }
}