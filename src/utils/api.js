/*
* axios.request(config)
* axios.get(url[, config])
* axios.delete(url[, config])
* axios.head(url[, config])
* axios.post(url[, data[, config]])
* axios.put(url[, data[, config]])
* axios.patch(url[, data[, config]])
*
* */

// import utils from '../utils/utils'
import $axios from '../utils/axiosConfig' // axios配置文件

export default {
  area: {
    add (params) {
      return new Promise((resolve, reject) => {
        $axios.post('area/add', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    list (params) {
      return new Promise((resolve, reject) => {
        $axios.post('area/list', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  user: {
    userList (params) {
      return new Promise((resolve, reject) => {
        $axios.post('users/userList', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    modifyStaff (params) { // 账户修改
      return new Promise((resolve, reject) => {
        $axios.post('staff', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    singlePass (params) { // 单个满勤
      return new Promise((resolve, reject) => {
        $axios.put('staffAttendance/singlePass', params).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
}
