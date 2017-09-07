// JavaScript Document
(function($){
    $.fn.myScroll = function(options){
        var defaults = {
            speed:40,
            rowHeight:24
        };

        var opts = $.extend({}, defaults, options),intId = [];

        function marquee(obj,Speed, step){

            obj.find("ul").animate({
                marginTop: -step
            },Speed/2,function(){
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function(i){
            var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
            intId[i] = setInterval(function(){
                if(_this.find("ul").height()<=_this.height()){
                    clearInterval(intId[i]);
                }else{
                    marquee(_this,speed,sh);
                }
            }, speed);

            _this.hover(function(){
                clearInterval(intId[i]);
            },function(){
                intId[i] = setInterval(function(){
                    if(_this.find("ul").height()<=_this.height()){
                        clearInterval(intId[i]);
                    }else{
                        marquee(_this,speed, sh);
                    }
                }, speed);
            });

        });

    }

})(jQuery);