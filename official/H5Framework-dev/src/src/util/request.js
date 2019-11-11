import axios from 'axios'

//ajax基本配置
var service =  axios.create({
    baseURL: process.env.BASE_API,
    timeout: 120000,
    headers: {
        "client-context": '123',
        "q1-passport-session": 'queryData.session'
    }
})

//ajax拦截请求统一处理
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (typeof (res.isSuccessStatusCode) === 'boolean' && !res.isSuccessStatusCode) {
            alert(res.message)
        } else {
            return res
        }
    },
    error => {
        if (error.response && error.response.status === 401 && /https?:\/\/.+/.test(error.response.data.message)) {
            window.location.href = error.response.data.message + window.location.href
        } else if(error.response && (error.response.status === 401 || error.response.status === 500)) {
            alert('哎呀~网络出了小问题，请重新打开或者刷新')
        } else {
            var errMsg = error.message
            if (error.response &&
                error.response.data &&
                typeof (error.response.data.isSuccessStatusCode) === 'boolean' &&
                !error.response.data.isSuccessStatusCode) {
                errMsg = error.response.data.message
            }
            alert(errMsg)
        }
        return Promise.reject(error)
    }
);

export default service