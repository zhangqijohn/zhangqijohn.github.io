function banner() {
    this.run = function() {
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
    return this
}