define(['swiper'],function (Swiper) {
    var run = function () {
        console.log('hello world')
        var mySwiper = new Swiper('.swiper-container',{
            pagination: '.pagination',
            autoplay: 3000,
            loop:true,
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
    return {
        init: function () {
            run()
        }
    }
})
