import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

// axios的二次封装
const errorMessage = () => {
    localStorage.clear()
    ElMessage.error("登录失效请重新登录！")
    // router.push('/').then(r => router.go(0))
}
const token = localStorage.getItem("token")
const failMessage = (msg) => ElMessage.error(msg)

export function post(url, data, success, fail = failMessage, error = errorMessage){
    if (token){
        axios.post(url,data,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            },
            withCredentials: true
        }).then(({data}) => {
            if (data.success){
                success(data.data,data.status)
            }else {
                fail(data.data,data.status)
            }
        }).catch(error)
    }else {
        axios.post(url,data,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        }).then(({data}) => {
            if (data.success){
                success(data.data,data.status)
            }else {
                fail(data.data,data.status)
            }
        }).catch(error)
    }
}
export function get(url, success, fail = failMessage, error = errorMessage){

    if (token){
        axios.get(url,{
            headers: {
                'Authorization': 'Bearer ' + token
            },
            withCredentials: true
        }).then(({data}) => {
            if (data.success){
                success(data,data.status)
            }else {
                fail(data,data.status)
            }
        }).catch(error)
    }else {
        axios.get(url,{
            withCredentials: true
        }).then(({data}) => {
            if (data.success){
                success(data,data.status)
            }else {
                fail(data,data.status)
            }
        }).catch(error)
    }

}