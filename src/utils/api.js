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

import { serverParentUrl } from './const'
import $axios from '../utils/axiosConfig' // axios配置文件

export default {
  other: {
    checkToken (params) {
      return new Promise((resolve, reject) => {
        $axios.get('api/Check/GetStatus', {
          params: params,
          baseURL: serverParentUrl,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
  attendance: {
    today (params) {
      return new Promise((resolve, reject) => {
        $axios.get('staffAttendance/absenceStatByOrg', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    history (params) {
      return new Promise((resolve, reject) => {
        $axios.get('staffAttendance/absenceStatByPerson', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    record (params) { // 考勤记录列表
      return new Promise((resolve, reject) => {
        $axios.get('staffAttendance/absenceStatByMonth', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    staff (params) { // 账户列表
      return new Promise((resolve, reject) => {
        $axios.get('staff', {
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
    personRecord (params) { // 个人考勤记录
      return new Promise((resolve, reject) => {
        $axios.get('attendanceRecord/personRecord', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    attendancePic (params) { // 查看照片
      return new Promise((resolve, reject) => {
        $axios.get('attendanceRecord/attendancePic', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    staffAttendanceaPass (params) { // 一键满勤
      return new Promise((resolve, reject) => {
        $axios.put('staffAttendance/pass', params).then((res) => {
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
    message (params) { // 查看照片
      return new Promise((resolve, reject) => {
        $axios.get('message', {
          params: params,
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  },
}
