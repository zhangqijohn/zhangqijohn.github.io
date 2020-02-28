//省会城市
_init_area();

//下单
var UnitPrice = $(".order_btn").attr("data-price"); //单价
var order_qty = 1;  //数量

//套餐选择
$(".order_btn").click(function () {
    $(".order_btn").removeClass("f");
    $(this).addClass("f");
    UnitPrice = $(this).attr("data-price"); //获取到价格
    $(".order_price").html(UnitPrice * order_qty + ".00元");

});
//颜色选择
$(".color_btn").click(function () {
    $(".color_btn").removeClass("f");
    $(this).addClass("f");
});
$(".color_btn1").click(function () {
    $(".color_btn1").removeClass("f");
    $(this).addClass("f");
});


//数量选择
$(".order_subductionBtn").click(function () {
    if (order_qty > 1) {
        order_qty--;
        $(".order_qty").html(order_qty);
        $(".order_price").html(UnitPrice * order_qty + ".00元")
    } else {
        return
    }
});
$(".order_addBtn").click(function () {
    order_qty++;
    $(".order_qty").html(order_qty);
    $(".order_price").html(UnitPrice * order_qty + ".00元")
});


//限时特价，立即抢购
$(".t04_btn").click(function () {
    $(".order_btn").removeClass("f").eq($(this).index('.t04_btn')).addClass("f"); //套餐选择
    toEleFn($('.orderBox').offset().top);   //滚动到立即下单
    UnitPrice = $(this).attr("data-price"); //获取到价格
    $(".order_price").html(UnitPrice * order_qty + ".00元")  //订单价格
});

//toTop
function toEleFn(num) {
    $('body,html').animate({scrollTop: num}, 0);
    return false;
}

function IsEmpty(obj) {
    var isEmp = false;

    if (obj == null || obj == undefined || (!obj) || obj == "") {
        isEmp = true;
    }
    return isEmp;
}

function Request(name) {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return "";
    }
    catch (e) {
        return ""
    }
}

function rand(num) {
    if (num == null) num = 9999;
    return Math.floor(Math.random() * num) + Math.random();
}

//下单成功
$(".order_sureBtn").click(function () {
    var UserName = $("#txtusername").val();
    var PhoneNum = $("#txtphone").val();
    if (IsEmpty(PhoneNum)) {
        alert("请输入手机号");
        return;
    }
    var Area = $("#s_province").val() + " " + $("#s_city").val() + " " + $("#s_county").val();
    var FullAddress = $(".addrDetailedIpt").val();

    var ProductName = "";
    $(".order_btn").each(function () {
        if ($(this).hasClass("f")) {
            ProductName = $(this).html(); //套餐选择
        }
    });
    if (IsEmpty(ProductName)) {
        alert("请选择相应套餐");
        return;
    }
    var Qty = $(".order_qty").html();
    if (IsEmpty(Qty)) {
        alert("请选择正确的数量");
        return;
    }
    if (Qty < 1) {
        alert("请选择正确的数量");
        return;
    }
    var OrderRemarks = $(".MessageIpt").val();
    if (OrderRemarks.length > 256) {
        alert("备注不能超过256个字符");
        return;
    }
    var Radid = Request("radid");
    if (IsEmpty(Radid)) {
        //alert("未获取到radid"); return;
        Radid = "default_fanheRadid";
    }
    var Rsid = Request("rsid");
    if (IsEmpty(Rsid)) {
        //alert("未获取到rsid"); return;
        Rsid = "default_fanheRsid";
    }
    var AppID = Request("appid");
    if (IsEmpty(AppID)) {
        //alert("未获取到AppID"); return;
        AppID = 2107;
    }
    var PID = Request("pid");
    if (IsEmpty(PID)) {
        //alert("未获取到PID"); return;
        PID = 1;
    }
    $(".sucessBox").show();
    $(".sucess_orderNum").html(json.orderid); //订单编号
});

//返回上页
$(".sucess_CloseBtn").click(function () {
    $(".sucessBox").hide();
});


//最新订单滚动
if ($(".showOrderUl").height() > $(".showOrderBox").height()) {
    lyScrollFn('.showOrderBox');
}

function lyScrollFn(boxName) {
    var $this = $(boxName);
    var scrollTimer;
    $this.hover(function () {
        clearInterval(scrollTimer);
    }, function () {
        scrollTimer = setInterval(function () {
            var $self = $this.find("ul:first");
            var lineHeight = $self.find("li:first").height();
            $self.animate({"marginTop": -lineHeight + "px"}, 600, function () {
                $self.css({marginTop: 0}).find("li:first").appendTo($self);
            });
        }, 3000);
    }).trigger("mouseleave");
};


setTimeout(clickAdByBro, 1);//此处调用数据接口

//每次下载前调用获取数据来源
function clickAdByBro() {
    var adsendurl = "https://appdata.q1.com"; //内网
    var RadID = ""; //广告ID
    var RsID = ""; //子站点ID
    radid ? RadID = radid : RadID = ""
    rsid ? RsID = rsid : RsID = "";

    var APPID = curgameid; //游戏ID
    var PID = 1; //平台ID;
    var OS = "";
    if (isAndroid) {
        OS = "Android";
        PID = 1
    } else if (isiOS) {
        OS = "IOS";
        PID = 141;
    } else {
        OS = "Others"
    }
    ;
    var UA = window.navigator.userAgent; //User-Agent


    //--------------------------------------------------------------
    var tmpCookieName = "br_" + RadID + RsID + APPID + PID + OS;
    //不让调用接口了
    if (getCookieFF(tmpCookieName) == "1") return;
    //--------------------------------------------------------------


    $.getJSON(adsendurl + "/api/dlclick?jsoncallback=?",
        {
            RadID: RadID,
            RsID: RsID,
            APPID: APPID,
            PID: PID,
            OS: OS,
            UA: UA,
            Url: window.location.href,
            q: rand(9999)
        },
        function (json) {
            if (json.e < 0) {
                //调接口返回失败
            } else {
                //调接口返回成功---------------------------------------------------------
                SetCookieFF(tmpCookieName, "1");//存cookie
            }
        });
}

function rand(num) {
    if (num == null) num = 9999;
    return Math.floor(Math.random() * num) + Math.random();
}

function getCookieFF(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

function SetCookieFF(name, value) {
    var argc = SetCookieFF.arguments.length;
    var argv = SetCookieFF.arguments;
    var path = (argc > 2) ? argv[2] : null;
    var domain = (argc > 3) ? argv[3] : null;
    var secure = (argc > 4) ? argv[4] : false;
    document.cookie = name + "=" + value +
        ((path == null) ? "" : ("; path=" + path)) +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");
}
