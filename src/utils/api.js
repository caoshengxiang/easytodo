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
  account: {
    login (params) {
      return new Promise((resolve, reject) => {
        $axios.post('auth/loginV2', params).then((res) => {
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
  v1: {
    left1 (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/illegalAmount', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    left2 (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/avgHandleTaskTime', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    right1 (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/putInCounts', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    right2 (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/unlicensedPutsCount', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    bottom1 (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/taskCompleted', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    bottom2 (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/usedRatesTrends', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    bottom3 (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/parkingUsedRate', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    bottom4 (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/latestTask', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
    center (params) {
      return new Promise((resolve, reject) => {
        $axios.get('supervisor/statistic/bikeAndillegalTotal', {params: params}).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(new Error(err))
        })
      })
    },
  }
}
