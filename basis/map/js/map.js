var data = [
    {name: '北京', value: 82},
    {name: '上海', value: 82},
    {name: '崇文岛', value: 81},
    {name: '南京', value: 82},
    {name: '厦门', value: 82},
    {name: '成都', value: 82},
    {name: '眉山', value: 81},
    {name: '乐山', value: 81},
    {name: '西安', value: 82},
    {name: '重庆', value: 82},
    {name: '武隆', value: 81},
    {name: '合肥', value: 82},
    {name: '南昌', value: 82},
    {name: '赣州', value: 81},
    {name: '于都', value: 81},
    {name: '景德镇', value: 81},
    {name: '兴国', value: 81},
    {name: '上犹', value: 81},
    {name: '昆明', value: 82},
    {name: '安宁', value: 81},
    {name: '深圳', value: 82},
    {name: '珠海', value: 81},
    {name: '东莞', value: 81},
    {name: '广州', value: 81},
    {name: '汕头', value: 81},
    {name: '揭阳', value: 81},
    {name: '澳门', value: 81},
    {name: '丹东', value: 81},
    {name: '抚顺', value: 81},
    {name: '沈阳', value: 82},
    {name: '凤城', value: 81},
    {name: '新宾', value: 81},
    {name: '法库', value: 81},
    {name: '彰武', value: 81},
    {name: '阜新', value: 81},
    {name: '阜蒙', value: 81},
    {name: '新民', value: 81},
    {name: '锦州', value: 81},
    {name: '运城', value: 81},
    {name: '临猗', value: 81},
    {name: '新绛', value: 81},
    {name: '绛县', value: 81},
    {name: '芮城', value: 81},
    {name: '永济', value: 81},
    {name: '三门峡', value: 81},


];
var geoCoordMap = {
    '北京':[116.46,39.92],

    '上海':[121.48,31.22],
    '崇文岛':[121.413508,31.6388],

    '南京':[118.78,32.04],

    '厦门':[118.1,24.46],

    '成都':[104.06,30.67],
    '眉山':[103.85645,30.086948],
    '乐山':[103.773662,29.565579],

    '西安':[108.95,34.27],
    '重庆':[106.54,29.59],
    '武隆':[107.767313,29.332589],

    '合肥':[117.27,31.86],

    '南昌':[115.89,28.68],
    '赣州':[114.943643,25.844581],
    '于都':[115.42286,25.962097],
    '景德镇':[117.192817,29.278745],
    '兴国':[115.350743,26.33349],
    '上犹':[114.568444,25.783792],

    '昆明':[102.73,25.04],
    '安宁':[102.484459,24.930808],

    '深圳':[114.07,22.62],
    '珠海':[113.52,22.3],
    '东莞':[113.75,23.04],
    '广州':[113.23,23.16],
    '汕头':[116.69,23.39],
    '揭阳':[116.35,23.55],
    '澳门':[113.55368,22.199345],

    '丹东':[124.37,40.13],
    '抚顺':[123.97,41.97],
    '沈阳':[123.38,41.8],
    '凤城':[124.073048,40.459894],
    '新宾':[125.040487,41.73816],
    '法库':[123.418938,42.508465],
    '彰武':[122.54406,42.386686],
    '阜新':[121.705833,42.041672],
    '阜蒙':[121.797319,42.095797],
    '新民':[122.853652,42.011665],
    '锦州':[121.131205,41.102215],

    '运城':[111.009964,35.037604],
    '临猗':[110.784597,35.147237],
    '新绛':[111.228432,35.627477],
    '绛县':[111.58028,35.499695],
    '芮城':[110.680985,34.708411],
    '永济':[110.453318,34.875367],

    '三门峡':[111.19,34.76],

};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    //console.log(res);
    return res;

};

var topC = function (data){
    var d=[];
    for(var i=0;i<data.length;i++){
        //console.log(data[i].name)
        if(data[i].value=='82'){
            d.push(data[i]);
        }
        //d.push(data[i]);
    }
    console.log(d);
    return d;

};

option = {
    title: {
        text: '去过的地方 - 百度地图',
        subtext: '身体和灵魂总要有一个在路上',
        sublink: '',
        left: 'center'
    },
    tooltip : {
        trigger: 'item'
    },
    bmap: {
        center: [108.70615,32.400978],
        zoom: 6,
        roam: true,
        mapStyle: {
            styleJson: [{
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'land',
                'elementType': 'all',
                'stylers': {
                    'color': '#f3f3f3'
                }
            }, {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                    'color': '#fdfdfd'
                }
            }, {
                'featureType': 'highway',
                'elementType': 'labels',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'geometry',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'green',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'subway',
                'elementType': 'all',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'local',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                    'visibility': 'off'
                }
            }, {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                    'color': '#fefefe'
                }
            }, {
                'featureType': 'building',
                'elementType': 'all',
                'stylers': {
                    'color': '#d1d1d1'
                }
            }, {
                'featureType': 'label',
                'elementType': 'labels.text.fill',
                'stylers': {
                    'color': '#999999'
                }
            }]
        }
    },
    series : [
        {
            name: '城市',
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#c73e44'
                }
            }
        },
        {
            name: '城市',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(topC(data)),
            /*data: convertData(data.sort(function (a,b) {
             return b.value - a.value;
             }).slice(0, 11)),*/
            symbolSize: function (val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#d05911',
                    shadowBlur: 10,
                    shadowColor: '#d05911'
                }
            },
            zlevel: 1
        }
    ]
};