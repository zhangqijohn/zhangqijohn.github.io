
import $ from 'jquery';
import css from '../css/index.css';


//tab
$(".nav li").click(function() {
    var index = $(".nav li").index(this);
    //$("#content").attr("class","content"+index);
    //$("#box").attr("class","box"+index);
    if(index<5){ //修改参数
        $(this).addClass("focus").siblings("li").removeClass("focus");
        $(".text").animate({left:-886 * index + "px"})
    }
    else{
        Tc();
    }
    bgTc()
});
//  首屏视频
function bgTc(){
    if($(".li1").is(".focus")){
        $(".video_bg_box").show();
        $("#content").attr("class","content"+index);
    }
    else if($(".li2").is(".focus")){
        $(".video_bg_box").hide();
        $("#content").attr("class","content1");
        $("#box").attr("class","box1");

    }
    else if($(".li3").is(".focus")){
        $(".video_bg_box").hide();
        $("#content").attr("class","content2");
        $("#box").attr("class","box2");

    }
    else if($(".li4").is(".focus")){
        $(".video_bg_box").hide();
        $("#content").attr("class","content3");
        $("#box").attr("class","box3");

    }
    else if($(".li5").is(".focus")){
        $(".video_bg_box").hide();
        $("#content").attr("class","content4");
        $("#box").attr("class","box4");

    }
    else if($(".li6").is(".focus")){
        $(".video_bg_box").hide();
        $("#content").attr("class","content5");
        $("#box").attr("class","box5");

    }
}
/* 上一页 下一页 */
var count = 0;
//   下一页
$(".arrow_right").click(function(){
    if(count<4){   //修改参数
        count++;
        $(".text").animate({left:-count * 886 + "px"});
        $(".nav li").eq(count).addClass("focus").siblings("li").removeClass("focus");
        bgTc()
    }
});
//  上一页
$(".arrow_left").click(function(){
    if(count>0){
        count--;
        $(".text").animate({left:-count * 886 + "px"});
        $(".nav li").eq(count).addClass("focus").siblings("li").removeClass("focus");
        bgTc()
    }
});
//video
function videoTc(){
    $(".videobox").html("<embed width='1280' height='720' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' quality='high' allowscriptaccess='always' flashvars='videourl=https://sres.q1.com/flv/fuli.flv&amp;&amp;autoplay=1&amp;&amp;repeat=1' allowfullscreen='true' src='https://sres.q1.com/flv/webPlayer.swf' wmode='transparent' name='player'>");
    $(".black_bg").height($(document).height()).fadeTo(250, 0.7);
    $(".videoTc").fadeIn();
}
$(".closeBtn").click(function(){
    $(".videobox").html("");
    $(".videoTc").fadeOut();
    $(".black_bg").fadeOut();
});
//敬请期待
function Tc(){
    $(".black_bg").height($(document).height()).fadeTo(250, 0.7);
    $(".tc").fadeIn();
}
$(".close").click(function(){
    $(".tc").fadeOut();
    $(".black_bg").fadeOut();
});

var pbg =require('../images/logo.png');

//loader.addImage(pbg);

$('#t001').attr('src', pbg);