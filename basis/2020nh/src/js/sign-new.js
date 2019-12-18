var bd_show = 1;
var lottory_show = ["mobile"]||[];
var t = {
    animations:Threeconfig.animations,
    tempAnimations:Threeconfig.animations,
    countAnimations:[],
    stageObj: $(".wall3d ul"),
    shape:'',
    nullCount:0,
    defaultImages:Threeconfig.defaultImages,
    ajaxtime:Threeconfig.ajaxtime,
    loopTime:10,
    shapeTime:Threeconfig.shapeTime,
    isImg:!0,
    showCount:false,
    shapeCount:0,
    imghadload:false,
    Utils:{},
    Stage:{},
    Control:{},
    Card:{},
    wall:{},
    sphere:{},
    wall2:{},
    cylinder:{},
    cube:{},
    cube2:{},
    screw:{},
    deg:function(o) {
        return Math.PI / 180 * o
    },
    Countobj:[],
    Logoobj:[],
    Textobj:[],
    posfrom:[
        [800,-800,3e3],
        [800,800,3e3],
        [-800,800,3e3],
        [-800,-800,3e3],
    ],
    init:function(){
        var e = this;
        if($.inArray(t.animations[0], Threeconfig.transformShape)!=-1){
            $(".wall3d").css({'transform':'scale(0.89)'});
        }
        e.Configinit();
        e.Utils = e.makeUtils();
        e.Stage = e.makeStage();
        e.Control = e.makeControl();
        e.Card = e.makeCard();
        e.wall = e.makeWall();
        e.sphere = e.makeSphere();
        e.wall2 = e.makeWall2();
        e.sphere = e.makeSphere();
        e.cylinder = e.makeCylinder();
        e.cube = e.makeCube();
        e.cube2 = e.makeCube2();
        e.screw = e.makeScrew();
        e.tours = e.makeTours();
    },
    Configinit: function(){
        var e = this;
        if(e.animations.length>0){
            var shapes = Threeconfig.shapes;
            for(var jj=0;jj<shapes.length;jj++){
                var shapetype = shapes[jj].shape;
                var shapename = shapes[jj].name;
                var shapedots = shapes[jj].dots;
                if(shapetype=='text'){
                    e[shapename] = e.makeText(JSON.parse(shapedots));
                }else if(shapetype=='logo'){
                    e[shapename] = e.makeLogo(JSON.parse(shapedots));
                }
            }
        }
        if(Threeconfig.djsCount>0 && Threeconfig.djsOn==1){
            var djscountAnimation = Threeconfig.countAnimations;
            for(var i in djscountAnimation){
                t.countAnimations.push(i);
                e[i] = e.makeCount(JSON.parse(djscountAnimation[i]));
            }
        }
    },
    djsMusicPlay:function(){
        $("#djsMusic")[0].play()
    },
    makeUtils:function() {
        var o = window.innerWidth,
            i = window.innerHeight,
            n = [],
            e = 0,
            s = function() {
                if (n.length && !(e > 2)) {
                    ++e;
                    var o = n.shift(),
                        i = o.item,
                        t = o.url,
                        a = new Image;
                    a.onload = function() {
                        i.append(a),$(a).fadeIn(), --e, setTimeout(s, 100)
                    }, a.onerror = function() {
                        --e, setTimeout(s, 100)
                    }, a.src = t, setTimeout(s, 150)
                }
            };
        return {
            width: o,
            height: i,
            in:function() {
                if($.inArray(t.shape, Threeconfig.transformShape)!=-1){
                    $(".wall3d").css({'transform':'scale(0.89)'});
                }else{
                    $(".wall3d").css({'transform':'scale(1)'});
                }
                var o = $.Deferred(),
                    i = t.stageObj.find("li");
                var inpos = {};
                inpos.position = [-3e3, 0, -700];
                inpos.duration = 0;
                inpos.allDone =  o.resolve;

                return i.length ? (t.Stage.stop(), i.snabbt(inpos)) : o.resolve(), o.promise()
            },
            leave: function() {
                if($('.signthreed-wall-block .new-sign').length){
                    $('.signthreed-wall-block .new-sign').hide();
                }
                var o = $.Deferred(),
                    i = t.stageObj.find("li");
                var leavepos = {};
                leavepos.position = [3e3, 0, -700];
                leavepos.duration = 500;
                leavepos.delay = function(o, i) {
                    return 1e3 * Math.random()
                };
                leavepos.allDone =  o.resolve;
                return i.length ? (t.Stage.stop(), i.snabbt(leavepos)) : o.resolve(), o.promise()
            },
            loadImg: function(o) {
                n.push(o), s()
            }
        }
    },
    makeCard:function() {
        var o = -1,
            i = [],
            n = function(key) {
                var o = $('<li class="card"></li>'),
                    n = 335 * Math.random() | 0;
                if(t.isImg){
                    t.Utils.loadImg({
                        item: o,
                        url:personArray[key]?personArray[key].image:(personArray.length>0?personArray[Math.floor(Math.random()*personArray.length)].image:t.defaultImages)
                    })
                }
                i.push(o);
                t.stageObj.append(o);
                if(!personArray[key]){
                    o.attr('data-image','none');
                }else{
                    var html = '';
                    var user = personArray[key];
                    if(bd_show==1&&lottory_show.length>0){
                        console.log(lottory_show.length)
                        for(var j=0;j<lottory_show.length;j++){
                            if(lottory_show[j]!='mobile'){
                                html += (j>0?"<br>":'') + user.bd_data[lottory_show[j]]||' ';
                            }else{
                                user.bd_data[lottory_show[j]] = user.bd_data[lottory_show[j]].replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                                html += (j>0?"<br>":'')+user.bd_data[lottory_show[j]]||' ';
                            }
                        }
                    }else{
                        html += user.name
                    }
                    o.attr({
                        "data-image" : 'had',
                        "data-padding" : 'Y',
                        "data-nickname" :html ,
                        "data-src" : user.image
                    });
                }
            };
        return {
            count: function() {
                return i.length;
            },
            init: function(o) {
                var t = o - i.length;
                if (t > 0){
                    for (var e = i.length; e < o; e++){
                        n(e);
                    }
                }
            },
            reset: function() {
                o = -1, $("li.card").removeClass("activate")
            },
            next: function() {
                if (++o, i[o]) return i[o]
            }
        }
    },
    makeWall:function() {
        var self = this;
        for (var o = [], i = h = 50 * Math.sqrt(2), n = self.Utils.height / h | 0, e = self.Utils.width / i | 0, s = 0; s < n; s++) for (var a = 0; a < e; a++) {
            var l = (e - 1) / 2 - a,
                r = (n - 1) / 2 - s;
            o.push({
                position: [l * i, r * h, 0],
                rotation: [0, 0, Math.PI / 4]
            })
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective: 3500
            },
            stage: {
                position: [0, 0, 0],
                duration: self.shapeTime
            }
        }
    },
    makeWall2:function() {
        var self = this;
        for (var o = [], i = h = 55 * Math.sqrt(2), n = 17, e = 20, s = 0; s < n; s++) for (var a = 0; a < e; a++) {
            var l = (e - 1) / 2 - a,
                r = (n - 1) / 2 - s,
                c = 0;
            s % 2 == 0 && (c = h / 2), o.push({
                position: [l * i + c, r * h / 2, 0],
                rotation: [0, 0, Math.PI / 4]
            })
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective: 3500
            },
            stage: function(o) {
                t.stageObj.snabbt({
                    position: [0, 0, -200],
                    rotation: [0, 0, 0],
                    duration: 0
                });
                walltwoTime = setTimeout(o, self.shapeTime);
                var i = function() {};
                return i;
            }
        }
    },
    makeLogo:function(e) {
        var self = this;
        var o = [];
        for (var a = 0; a < e.length; a++) {
            o.push({
                position: [ e[a].x,  e[a].y, 0],
                rotation: [0, 0, 0]
            })
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective: 2e3
            },

            stage: function(o) {
                t.stageObj.snabbt({
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    duration: 0
                });
                logoTime = setTimeout(o,self.shapeTime);
                var i = function() {};
                return  i;
            }

        }
    },
    makeText:function(e) {
        var self = this;
        var o = [];
        for (var a = 0; a < e.length; a++) {
            o.push({
                position: [ e[a].x,  e[a].y, 0],
                rotation: [0, 0, 0]
            })
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective: 1e3
            },
            stage: function(o) {
                t.stageObj.snabbt({
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    duration: 0
                });
                textTime = setTimeout(o,self.shapeTime);
                var i = function() {};
                return i;
            }

        }
    },
    makeCount:function(e) {
        var o = [];
        for (var a = 0; a < e.length; a++) {
            o.push({
                position: [ e[a].x,  e[a].y, 0],
                rotation: [0, 0, 0]
            })
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective:100
            },
            stage: function(o) {
                t.stageObj.snabbt({
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    duration: 0
                });
                countTime = setTimeout(o, 1e3);
                var i = function() {};
                return  i;
            }

        }
    },
    makeSphere:function() {
        var self =  this;
        for (var o = [], t = 380, e = 16, s = 30, a = {}, l = e / 2 | 0, r = 0; r < e; r++) {
            var c = (Math.sin(Math.PI / (e - 1) * r) * s | 0) + 1;
            a[r] = c
        }
        return Object.keys(a).forEach(function(i) {
            for (var s = l - i, r = a[i], c = 0; c < r; c++) {
                var p = 180 / e * s,
                    u = 360 / r * c;
                1 == r && (p = p > 0 ? 90 : -90);
                var d = i * self.deg(180 / (e - 1)),
                    f = c * self.deg(360 / r),
                    h = t * Math.sin(d) * Math.cos(f),
                    g = t * Math.sin(d) * Math.sin(f),
                    v = .9 * t * Math.cos(d);
                o.push({
                    rotation: [-self.deg(p), -self.deg(u), 0],
                    position: [g, -v, h]
                })
            }
        }), {
            card: {
                count: o.length,
                allCard: o,
                perspective: 2e3
            },
            stage: {
                position: [0, 0, 0],
                duration: self.shapeTime
            }
        }
    },
    makeTours:function(){
        var self = this;
        var o = [];
        var deg = function(o) {
            return Math.PI / 180 * o
        };
        var e = 360;
        var s = 10;
        var a = 15;
        var l = t.Utils.width/(a*6);
        var r = 360 / a;
        for ( var c = 0; c < s; c++){
            for (var u = 0; u < a; u++) {
                var p = s / 2 | 0,
                    d = a / 2 | 0,
                    f = deg(r * u),
                    x = e * Math.cos(f),
                    y = e * Math.sin(f),
                    z = (c - p) * a * l + (u - d) * l;
                o.push({
                    position: [x, y, z],
                    rotation: [0, 0, 0],

                })
            }
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective:100
            },
            stage: function(o) {
                var i = function() {
                    t.Stage.snabbt({
                        fromRotation: [0, 0, 0],
                        rotation: [0, 0, 2 * Math.PI],
                        duration: self.shapeTime,
                        complete: function() {
                            o && o()
                        }
                    })
                };
                return i
            }

        }

    },
    makeCylinder:function() {
        var self = this;
        for (var o = [], i = 500, t = 500, e = 7, s = 45, a = t / e | 0, l = e / 2 | 0, r = 0; r < e; r++) for (var c = 360 / s, p = 0; p < s; p++) {
            var u = 0,
                d = 0,
                f = 0,
                h = 0;
            u = i * Math.sin(self.deg(p * c)), d = (r - l) * a, f = i * Math.cos(self.deg(p * c)), h = p * c, o.push({
                position: [u, d, f],
                rotation: [0, -self.deg(h), 0]
            })
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective: 3500
            },
            stage: {
                position: [0, 0, 0],
                duration: self.shapeTime
            }
        }
    },
    makeCube:function() {
        var self = this;
        for (var o = [], i = h = d = 100, t = 5, n = 9, e = 8, s = 0; s < e; s++) for (var a = 0; a < t; a++) for (var l = 0; l < n; l++) {
            var r = (n - 1) / 2 - l,
                c = (t - 1) / 2 - a,
                p = (e - 1) / 2 - s;
            o.push({
                position: [r * i, c * h, p * d],
                rotation: [0, 0, 0]
            })
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective: 3500
            },
            stage: {
                position: [0, 0, 0],
                duration: self.shapeTime
            }
        }
    },
    makeCube2:function() {
        var self = this;
        for (var o = [], i = 9, n = 57, e = (length / 2, []), s = [], a = [], l = 0; l < i; l++) for (var r = 0; r < i; r++) {
            var c = (i - 1) / 2,
                p = (c - l) * n,
                u = (c - r) * n,
                d = c * n + n / 2;
            e.push({
                position: [p, u, d],
                rotation: [0, 0, 0]
            }), e.push({
                position: [p, u, -d],
                rotation: [Math.PI, 0, 0]
            }), s.push({
                position: [-d, p, u],
                rotation: [0, Math.PI / 2, 0]
            }), s.push({
                position: [d, p, u],
                rotation: [0, -Math.PI / 2 * 3, Math.PI]
            }), a.push({
                position: [u, -d, p],
                rotation: [Math.PI / 2 * 3, 0, 0]
            }), a.push({
                position: [u, d, p],
                rotation: [Math.PI / 2, 0, 0]
            })
        }
        return o = e.concat(s, a), {
            card: {
                count: o.length,
                allCard: o,
                perspective: 3500
            },
            stage: function(o) {
                var i = function() {
                    t.Stage.snabbt({
                        fromRotation: [0, 0, 0],
                        rotation: [2 * Math.PI, 2 * Math.PI, 0],
                        duration: self.shapeTime,
                        complete: function() {
                            o && o()
                        }
                    })
                };
                return i
            }
        }
    },
    makeScrew:function() {
        var self = this;
        for (var o = [], e = 300, s = 7, a = 25, l = t.Utils.width / s / a, r = 360 / a, c = 0; c < s; c++) for (var p = s / 2 | 0, u = 0; u < a; u++) {
            var d = a / 2 | 0,
                f = self.deg(r * u),
                h = (c - p) * a * l + (u - d) * l,
                g = e * Math.sin(f),
                v = e * Math.cos(f),
                m = f,
                b = 0,
                w = 0;
            o.push({
                position: [h, g, v],
                rotation: [m, b, w],
                skew: [0, self.deg(6)]
            })
        }
        return {
            card: {
                count: o.length,
                allCard: o,
                perspective: 3500
            },
            stage: function(o) {
                var n = function() {
                    t.Stage.snabbt({
                        fromRotation: [0, 0, 0],
                        rotation: [2 * Math.PI, 0, 0],
                        duration: self.shapeTime,
                        complete: function() {
                            n()
                        }
                    })
                };
                screwTime = setTimeout(o, self.shapeTime);
                return  n;
            }
        }
    },
    makeStage:function() {
        var o = {
                fromRotation: [0, 0, 0],
                rotation: [0, 2 * Math.PI, 0],
                duration: 35e3,
                complete: function() {
                    i()
                }
            },
            i = function() {
                t.Stage.stop(), t.Stage.snabbt(o)
            };
        return {//          stage
            default:function(n, e) {
                n.transformOrigin || (n.transformOrigin = [0, 0, 0]), n.duration || (n.duration = Threeconfig.shapeTime),Object.keys(n).forEach(function(i) {
                    o[i] = n[i]
                }),o.complete = e, t.Stage.snabbt({
                    position: [0, 0, 0],
                    //rotation: [0, 0, 0],
                    duration: 400,
                    complete: i
                })
            },
            snabbt: t.stageObj.snabbt.bind(t.stageObj),
            stop: function() {
                t.stageObj.snabbt("stop")
            },
            reset: function(o) {
                t.stageObj.css("transform", "")
            }
        }
    },
    makeControl:function() {
        var self = this;
        var o = function() {
            var o = t.shape;
            if(o=='count1'){
                self.animations = self.tempAnimations;
                self.showCount = false;
                o = false;
            }
            if (!o) return void t.changeMode();
            self.shapeCount++,(o.indexOf('count')==-1?t.changeMode(self.animations[self.shapeCount]):t.changeCountMode(self.animations[self.shapeCount]));
        };
        return {
            next: o
        }
    },
    CountControl:function(){
        var self = this;
        var thisTimeShape = t.shape;
        if(!self.showCount && thisTimeShape!='sphere'){
            self.showCount = true;
            $('.signthreed-wall-block .new-sign').hide();
            self.animations = self.countAnimations;
            t.Stage.stop();
            t.Card.reset();
            clearTimeout(textTime);
            clearTimeout(logoTime);
            clearTimeout(screwTime);
            clearTimeout(walltwoTime);
            clearTimeout(countTime);
            self.changeCountMode();
        }
    },
    notFind:function(event){
        var img = new Image;
        img.src = t.defaultImages;
        img.onerror = null;
    },
    Build:function() {
        var o = t[t.shape];
        if (o) {
            var i = o.stage,
                n = o.card,
                e = function() {};
            if (i && "function" == typeof i ? e = i(t.Control.next) : t.Stage.default (i, t.Control.next), n) {
                t.Card.reset();
                for (var s = 0, a = 0; a < n.count; a++) {
                    var l = t.Card.next();
                    if (l) {
                        l.addClass("activate");
                        var r = n.allCard[a];
                        Object.keys(r).forEach(function(o) {
                            l.data("data-" + o, r[o])
                        });
                        var c = {
                            rotation: r.rotation,
                            position: r.position,
                            scale: r.scale || [1, 1],
                            complete: function() {
                                ++s, s == n.count && e()
                            }
                        };
                        if(t.shape.indexOf('count')==-1){
                            c.duration = 500;
                            c.delay = 1e3 * Math.random();
                        }else{
                            c.duration = 0;
                        }
                        r.skew || (r.skew = [0, 0]), c.skew = r.skew, l.snabbt(c)
                    }
                }
            }
        }
    },
    changeMode:function(o) {
        var self = this;
        if(!o){
            self.shapeCount = 0;
            o = self.animations[0];
        }
        t.Utils.leave().then(function() {
            t.stageObj.removeClass(t.shape),t.shape = o,t.stageObj.addClass(t.shape);
            var i = t[t.shape];
            console.log(i.card.count);
            t.Card.init(i.card.count), t.Utils.in().then(function() {
                t.Build();
            })
        })
    },
    changeCountMode:function(o) {
        var self = this;
        if(!o){
            self.shapeCount = 0;
            o = self.animations[0];
        }
        $(".wall3d").css({'transform':'scale(1)'});
        t.stageObj.removeClass(t.shape),t.shape = o,t.stageObj.addClass(t.shape);
        var i = t[t.shape];
        self.djsMusicPlay();
        t.Card.init(i.card.count),t.Build();
    },
    getNewuser(){
        var self = this;
        //if(json.image!=''){
            maxid = 32019;
            newpersonArray.push({"name":"john","qdnums":"","image":"img/tx"+parseInt(6*Math.random()+1)+".png","bd_data": {"bd_MQkXtV": "小王子", "mobile": "13560105682"}});
            personArray.push({"name":"","qdnums":"","image":"img/tx"+parseInt(6*Math.random()+1)+".png","bd_data": {"bd_MQkXtV": "小王子", "mobile": "13560105682"}});
        //}
        setTimeout(function(){
            self.getNewuser();
        }, self.ajaxtime);
        // {"omid":32019,"mid":32019,"name":"","qdnums":"","image":"","total_nums":"329"}
        // $.getJSON(PATH_ACTIVITY + Path_url('new_qd'), {rid: scene_id,mid:maxid},
        //     function(json) {
        //         if(json.image!=''){
        //             maxid = json.mid;
        //             newpersonArray.push(json);
        //             personArray.push(json);
        //         }
        //         setTimeout(function(){
        //             self.getNewuser();
        //         }, self.ajaxtime);
        //     }).fail(function() {
        //     setTimeout(function(){
        //         self.getNewuser();
        //     }, self.ajaxtime);
        // })
    },
    showuser:function(){
        var self =  this;
        if(self.shape.indexOf('count')!=-1){
            return setTimeout(function(){self.showuser()}, self.loopTime);
        }
        var newUser = newpersonArray.shift();
        if("undefined" != typeof newUser){
            var i = $(".wall3d li.activate").filter(function(o, i) {
                return "Y" != $(i).attr("data-padding")
            });
            var j = $(".wall3d li.activate").filter(function(o, i) {
                return "none" == $(i).attr("data-image")
            });
            if(i.length>0){
                if(j.length>0){
                    var a = j.eq(Math.floor(Math.random()*j.length));
                    self.showNewuser(a,newUser);
                }else{
                    var a = i.eq(Math.floor(Math.random()*i.length));
                    self.showNewuser(a,newUser);
                }
            }else{
                if(j.length==0){
                    $(".wall3d li.activate").attr('data-padding','N');
                    i = $(".wall3d li.activate").filter(function(o, i) {
                        return "Y" != $(i).attr("data-padding")
                    });
                    var a = i.eq(Math.floor(Math.random()*i.length));
                    self.showNewuser(a,newUser);
                }else{
                    var a = j.eq(Math.floor(Math.random()*j.length));
                    self.showNewuser(a,newUser);
                }
            }
        }else{
            self.nullCount++;
            if(personArray.length>0){
                var oldUser = personArray[Math.floor(Math.random()*personArray.length)];
                if(self.nullCount>1){
                    var i = $(".wall3d li.activate").filter(function(o, i) {
                        return "Y" != $(i).attr("data-padding")
                    });
                    var j = $(".wall3d li.activate").filter(function(o, i) {
                        return "none" == $(i).attr("data-image")
                    });
                    if(i.length>0){
                        if(j.length>0){
                            var a = j.eq(Math.floor(Math.random()*j.length));
                            self.showNewuser(a,oldUser);
                        }else{

                            var a = i.eq(Math.floor(Math.random()*i.length));
                            self.showNewuser(a,oldUser);
                        }
                    }else{
                        var ii = $(".wall3d li.activate").filter(function(o, i) {
                            return "Y" == $(i).attr("data-padding")
                        });
                        if(ii.length>0){
                            var box = ii.eq(Math.floor(Math.random()*ii.length));
                            self.showagainuser(box);
                        }else{

                            setTimeout(function(){self.showuser()}, self.loopTime);
                        }
                    }
                }else{
                    setTimeout(function(){self.showuser()}, self.loopTime);
                }//nullCount
            }else{
                setTimeout(function(){self.showuser()}, self.loopTime);
            }//personArray
        }//newUser
    },//showNewuser
    showNewuser:function(boxdiv,Nuser){
        var self = this;
        if(boxdiv&&Nuser){
            if(!boxdiv.data()||!boxdiv.data()){
                return setTimeout(function(){self.showuser()}, self.loopTime);
            }
            var s = Nuser.image || t.defaultImages;
            var html = '';
            var user = Nuser;
            if(bd_show==1&&lottory_show.length>0&&user.bd_data.mobile){
                for(var j=0;j<lottory_show.length;j++){
                    if(lottory_show[j]!='mobile'){
                        html += (j>0?"<br>":'')+user.bd_data[lottory_show[j]]||' ';
                    }else{
                        user.bd_data[lottory_show[j]] = user.bd_data[lottory_show[j]].replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                        html += (j>0?"<br>":'')+user.bd_data[lottory_show[j]]||' ';
                    }
                }
            }else{
                html += user.name;
            }
            var e = html || '鏈ㄦ湪';
            var l = "signthreed" + (new Date).getTime();
            var r = '<div id="' + l + '" class="new-sign onCenterColumn"><img src="' + s + '" class="image"></a><p class="nickname">' + e + "</p></div>";
            $(".signthreed-wall-block").append(r);
            $("#" + l).snabbt({
                fromPosition: self.posfrom[Math.floor(Math.random()*self.posfrom.length)],
                fromRotation: [0, 2 * Math.PI, 0],
                fromScale: [2, 2],
                posotion: [0, 0, 2e3],
                scale: [1, 1],
                rotation: [0, 0, 0],
                duration: 500,
                easing: "easeOut",
                complete: function() {
                    $("#" + l + " p").snabbt({
                        fromOpacity: 1,
                        opacity: 0,
                        delay: 500,
                        duration: 200,
                        scale: [0, 0],
                        easing: "ease"
                    });
                    var r = '<img src="' + s + '">';
                    $("#" + l).snabbt({
                        position: boxdiv.data().dataPosition,
                        rotation: boxdiv.data().dataRotation,
                        duration: 600,
                        scale: [.25, .25],//11
                        easing: "easeIn",
                        delay: 500,
                        complete: function() {
                            $("#" + l).remove(),boxdiv.html(r),boxdiv.attr({"data-image":'had',"data-padding":'Y',"data-nickname":e,"data-src":s}),setTimeout(function(){self.showuser()}, self.loopTime);
                        }
                    })
                }
            })
        }else{
            setTimeout(function(){self.showuser()}, self.loopTime);
        }
    },
    showagainuser:function(boxdiv){
        var self = this;
        if(boxdiv){
            var s = boxdiv.attr('data-src') || t.defaultImages;
            var e = boxdiv.attr('data-nickname') || '鏈ㄦ湪';
            if(!boxdiv.data()||!boxdiv.data()){
                console.log(boxdiv.data());
                return setTimeout(function(){self.showuser()}, self.loopTime);
            }
            var l = "signthreed" + (new Date).getTime();
            var r = '<div id="' + l + '" class="new-sign onCenterColumn"><img src="' + s + '" class="image"></a><p class="nickname">' + e + "</p></div>";
            $(".signthreed-wall-block").append(r);
            $("#" + l).snabbt({
                fromPosition: self.posfrom[Math.floor(Math.random()*self.posfrom.length)],
                fromRotation: [0, 2 * Math.PI, 0],
                fromScale: [2, 2],
                posotion: [0, 0, 2e3],
                scale: [1, 1],
                rotation: [0, 0, 0],
                duration: 1500,
                easing: "easeOut",
                complete: function() {
                    $("#" + l + " p").snabbt({
                        fromOpacity: 1,
                        opacity: 0,
                        delay: 500,
                        duration: 200,
                        scale: [0, 0],
                        easing: "ease"
                    });
                    $("#" + l + " img").snabbt({
                        position: boxdiv.data().dataPosition,
                        rotation: boxdiv.data().dataRotation,
                        duration: 600,
                        scale: [.25, .25],//11
                        easing: "easeIn",
                        delay: 500,
                        complete: function() {
                            $("#" + l).remove(),setTimeout(function(){self.showuser()}, self.loopTime);
                        }
                    })
                }
            })
        }else{
            setTimeout(function(){self.showuser()}, self.loopTime);
        }
    },

};
t.init();

t.changeMode();
t.getNewuser();
t.showuser();
