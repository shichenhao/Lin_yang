import axios from 'axios';
import { Toast,Indicator } from 'mint-ui';


//公用axios
const instance = axios.create({})
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
instance.defaults.withCredentials=true
instance.defaults.headers.token = localStorage.getItem('token') || ''//store.getters.token
/*
instance.defaults.transformRequest = [function (data) {
    let newData = ''
    for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
}]*/

//中间件
// 请求
instance.interceptors.request.use(request => {
  Indicator.open();
  return request
})

// 响应
instance.interceptors.response.use(response => {
  Indicator.close();
    if(response.data.code === -1 || response.data.tokenerror === "签名已过期" || response.data.message === "获取商品失败" || response.data.message === "获取失败，无有效token"){
        localStorage.clear()
      window.location.href='#/login'
    }
   if(!response.data.result){
     Toast(response.data.message);
   }
    return response.data
}, err => {
    if (err && err.response) {
        /*
        if(err.response.data.message === "用户未登录"){
            sessionStorage.clear();
            window.location.href = '#/login'
        }*/
        //错误信息
        //MessageBox.error('提示', err.response.data.message);
    }
    return Promise.resolve(err.response)
})

const http = (key,params,methods = 'post')=>{
  return instance[methods]('/apitest/', Object.assign({ key },params))
}
const getNews = axios.create({
})
getNews.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
getNews.defaults.withCredentials=true

//图片上传
const multipart = axios.create({
    withCredentials: true})

multipart.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
})

export {
    http, multipart, getNews
}
