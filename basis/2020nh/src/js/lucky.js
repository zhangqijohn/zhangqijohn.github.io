$(function () {
    /*
     * @ {Object}
     *@param luckyNum为每次抽奖的人数；若为5那么luckyResult的length也为5
     *@param luckyResult每次抽奖结果的集合（数组），每次抽奖都会更新
     *@param luckyPrize为第几次抽奖
     *@param allLuckyResults 为汇总结果{prize:'',result:[]}
     */
    let Obj = {
        prizeLevel: [
            {id: 1, label: '三等奖'},
            {id: 2, label: '二等奖'},
            {id: 3, label: '一等奖'},
        ],
        luckyNum: parseInt($('.select_lucky_number').val()),
        luckyResult: [],
        luckyPrize: null,
    };
    let allLuckyResults = [];
    let copyPersonArray = JSON.parse(JSON.stringify(personArray))

   getAllLuckyResults()

    function getAllLuckyResults() {
        $.ajax({
            url: '/api/getData',
            dataType: 'json',
            data: '',
            type: 'get',
            success: function (res) {
                // if (res.code == 1) {
                    if(res.code == 1 && res.body !== ''){
                        allLuckyResults = JSON.parse(res.body)
                    }else{
                        allLuckyResults = [{prize: '', result: []}, {prize: '', result: []}, {prize: '', result: []}];
                    }
                    tabPrize();
                // } else if (res.code == 2) {
                //     alert(res.body);
                // } else {
                //     alert('失败，原因不明！艾特程序猿！');
                // }
            },
            error: function () {
                alert('查询中奖纪录失败！请艾特程序猿打开服务！');
            }
        })
    }


    function saveAllLuckyResults(val) {
        $.ajax({
            url: '/api/postData',
            dataType: 'json',
            data: {'result': JSON.stringify(val)},
            type: 'post',
            success: function (res) {
                if (res.code == 1) {
                    console.log('save success')
                } else if (res.code == 2) {
                    alert(res.body);
                } else {
                    alert('未知原因失败！艾特程序猿处理！');
                }
            },
            error: function () {
                alert('保存中奖纪录失败！请先截图或拍照保留纪录；艾特程序猿处理！');
            }
        })
    }

    showLotteryNum(copyPersonArray.length)

    function showLotteryNum(num) {
        $('.lucky_number').html(num)
    }

    /*
     一次抽几人改变事件
     */
    $('.select_lucky_number').bind('change', function () {
        Obj.luckyNum = parseInt($(this).val());
    })

    /*
     图片预加载
     */
    function loadImage(arr, callback) {
        let loadImageLen = 1;
        let arrLen = arr.length;
        $('.all_number').html('/' + arrLen);
        for (let i = 0; i < arrLen; i++) {
            let img = new Image(); //创建一个Image对象，实现图片的预下载
            img.onload = function () {
                img.onload = null;
                ++loadImageLen;
                $('.current_number').html(loadImageLen);
                if (loadImageLen == arrLen) {
                    callback(img); //所有图片加载成功回调；
                }
                ;
            }
            img.src = arr[i].image;
        }
    }

    /*
     把3D动画初始化，等待执行
     personArray为本地引入数据
     */
    Obj.M = $('.container').lucky({
        row: 7, //每排显示个数  必须为奇数
        col: 5,//每列显示个数  必须为奇数
        depth: 5, //纵深度
        iconW: 30, //图片的宽
        iconH: 30, //图片的高
        iconRadius: 8, //图片的圆角
        data: personArray, //数据的地址数组
    });
    /*
    执行图片预加载并关闭加载试图
    */
    loadImage(personArray, function (img) {
        $('.loader_file').hide();
    });
    /*
     若为ajax请求执行这段代码
     此为为ajax请求;
     $.get('url',function(data){
         if(data.res == 1){
             personArray = data.data; //此为数组

             //执行图片预加载并关闭加载试图
             loadImage(personArray, function (img) {
                $('.loader_file').hide();
             })
             Obj.M = $('.container').lucky({
             row : 7, //每排显示个数  必须为奇数
             col : 7, //每列显示个数  必须为奇数
             depth : 6, //纵深度
             iconW : 30, //图片的宽
             iconH : 30, //图片的高
             iconRadius : 8, //图片的圆角
             data : personArray, //数据的地址数组
         });
         }
     })
     */


    /*
     停止按钮事件函数
     */
    $('#stop').click(function () {
        Obj.M.stop();
        $('.container').hide();
        $(this).hide();
        showTotal(Obj.luckyResult)
        saveAllLuckyResults(allLuckyResults)
    })

    /*
     开始按钮事件函数
     */
    $('#open').click(function () {
        $('.lucky_list').hide();
        $('.container').show();
        Obj.M.open();
        randomLuckyArr();  //此为人工写入获奖结果
        setTimeout(function () {
            $('#stop').show(300);
        }, 500)
    })


    /*
     切换奖品代码块
     */
    function tabPrize() {
        let luckyDefalut = $('.lucky_prize_picture').attr('data-default');
        let index = luckyDefalut ? luckyDefalut : 1;
        tabSport(index);
        const lucky_prize_number = $('.lucky_prize_show').length;
        $('.lucky_prize_left').click(function () {
            $('.lucky_prize_right').addClass('active');
            index <= 1 ? 1 : --index;
            tabSport(index, lucky_prize_number);
        })
        $('.lucky_prize_right').click(function () {
            $('.lucky_prize_left').addClass('active');
            index >= lucky_prize_number ? lucky_prize_number : ++index;
            tabSport(index, lucky_prize_number);
        })

    }
    tabPrize()
    /*
     切换奖品左右按钮公共模块
     */
    function tabSport(i, lucky_prize_number) {
        if (i >= lucky_prize_number) {
            $('.lucky_prize_right').removeClass('active');
        }
        if (i <= 1) {
            $('.lucky_prize_left').removeClass('active');
        }
        Obj.luckyPrize = i;
        $('.lucky_prize_show').hide().eq(i - 1).show();
        const _html = Obj.prizeLevel[i - 1].label
        $('.lucky_prize_title').html(_html);
        $('#lottory_winner_name').html(_html);
        $('.lpl_list').removeClass('active').hide().eq(i - 1).show().addClass('active');
        $('.lottory-reward-box').html('')
        $('#lottory_winner_total').text($('.lottory-reward-people').length);
        let cResults = allLuckyResults[i - 1]
        if (cResults && cResults.result.length > 0) {
            const result = cResults.result
            for (let k = 0; k < result.length; k++) {
                const row = result[k];
                const bd_html = '';
                getAwardsList(row.id, row.image, row.name, bd_html);
            }
        }
    }


    /*
     * 随机中奖 业务核心
     */
    function randomLuckyArr() {
        Obj.luckyResult = [];
        for (let i = 0; i < Obj.luckyNum; i++) {
            const random = Math.floor(Math.random() * copyPersonArray.length);
            const luckyUser = copyPersonArray.splice(random, 1)[0];  // 获取随机中奖人员信息,并将该中奖人移除抽奖名单数组
            Obj.luckyResult.push(luckyUser)
        }
        const _index = Obj.luckyPrize - 1
        const curResult = allLuckyResults[_index].result.concat(Obj.luckyResult)
        allLuckyResults[_index] = {
            prize: Obj.prizeLevel[_index].label,
            result: curResult
        }
    }


    // 抽中效果展示
    const bd_show = 1;
    const lottory_show = ['mobile'] || [];
    const luckshowtime = 1500

    function showTotal(userArr) {
        let html = '<div class="pop_3d lottory_totalshow"><div class="fireworks"></div><div class="lottory_selected"><ul>';
        for (let i = 0; i < userArr.length; i++) {
            html += '<li class="total_userone">';
            html += '<img class="userone_avatar" src="' + userArr[i].image + '">';
            html += '<div class="userone_name">' + userArr[i].name + '</div>';
            html += '</li>';
        }
        html += '</ul></div></div>';
        $('body').append(html);
        $('.pop_3d').addClass('aniResult');

        $('.lottory_totalshow').css({'display': 'flex'});
        $('.lottory_totalshow ul').addClass('pop_zoomInDown');
        $('.win-box').addClass('winMove');
        setTimeout(function () {
            $('.lottory_totalshow').animate({
                left: $('.lottory-reward-box').offset().left + 10,
                top: $('.lottory-reward-box').offset().top + 10,
                width: $('.lottory-reward-box').width(), height: $('.lottory-reward-box').height()
            }, function () {
                $('.lottory_totalshow ul').removeClass('pop_zoomInDown');
                $('.lottory_totalshow').hide();
                $('.lottory_totalshow').remove();
                $('.win-box').removeClass('winMove');
                for (let k = userArr.length - 1; k >= 0; k--) {
                    let row = userArr[k];
                    let bd_html = '';
                    getAwardsList(row.id, row.image, row.name, bd_html);
                }
            });
        }, luckshowtime);
        setTimeout(function () {
            $('.lucky_list').show();
        }, luckshowtime - 50)
    }

    function getAwardsList(id, image, name, bd_html) {
        let html = '';
        html += '<li class="lottory-reward-people" data-id="' + id + '" data-nickname="' + (bd_html == '' ? name : bd_html) + '" data-avatar="' + image + '">';
        html += '<div class="lottory-r-div"><img class="lottory-reward-people-img" src="' + image + '"></div>';
        html += '<div class="lottory-r-name">' + (bd_html == '' ? name.substring(0, 6) : bd_html) + '</div>';
        html += '<img class="lottory-del-btn"  src="img/del_btn.png">';
        html += '</li>';
        $(".lottory-reward-box").prepend(html);
        $("#lottory_winner_total").text($(".lottory-reward-people").length);
    }

})
