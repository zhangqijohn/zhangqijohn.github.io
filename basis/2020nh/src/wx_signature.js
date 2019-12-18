'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var appid = 'PDCUGQUBOOUOP5XTP';
var secret = 'ox2RVFBD8jNY79pUmG7gwrN2pCD4p10P';
function getSignature(data, token) {
    var query = {
        timestamp: Math.ceil(new Date().getTime() / 1000),
        noncestr: randomChar(16),
        appid: appid,
        access_token: token || ''
    };

    var _data = deepCopy(data);
    _data.timestamp = query.timestamp;
    _data.noncestr = query.noncestr;
    _data.appid = query.appid;
    _data.access_token = query.access_token;
    forEachValue(_data, function (item, key) {
        var type = typeof item === 'undefined' ? 'undefined' : _typeof(item);
        if (type === 'object') {
            _data[key] = encodeStr(JSON.stringify(item));
        } else if (type === 'function') {} else if (type === 'string') {
            _data[key] = encodeStr(item);
        }
    });
    var str = getQueryString(_data).toUpperCase();
    var strMd5 = CryptoJS.MD5(str).toString() + secret;
    query.signature = CryptoJS.SHA256(strMd5).toString();
    return getQueryString(query);
}
function randomChar(l) {
    var x = '0123456789qwertyuioplkjhgfdsazxcvbnmABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var tmp = '';
    for (var i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
}
function encodeStr(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
}
function getQueryString(obj) {
    var arr = [];
    var _tmpArray = [];
    for (var index in obj) {
        _tmpArray.push(index);
    }
    _tmpArray.sort();

    _tmpArray.forEach(function (key) {
        if (_typeof(obj[key]) === 'object') {
            obj[key].forEach(function (item) {
                arr.push(key + '[]' + '=' + item);
            });
        } else {
            arr.push(key + '=' + obj[key]);
        }
    });
    return arr.join('&');
}
function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function (key) {
        return fn(obj[key], key);
    });
}
function deepCopy(obj) {
    var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
        return obj;
    }
    var hit = find(cache, function (c) {
        return c.original === obj;
    });
    if (hit) {
        return hit.copy;
    }

    var copy = Array.isArray(obj) ? [] : {};
    cache.push({
        original: obj,
        copy: copy
    });

    Object.keys(obj).forEach(function (key) {
        copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
}
function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
