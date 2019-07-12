<template>
  <div class="com-pages"
       v-loading="loading"
       element-loading-text="加载中..."
  >
    <!--<div class="com-page-pos">-->
      <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
        <!--<el-breadcrumb-item>首页</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>缺勤通报</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</div>-->
    <div class="com-page-box">
      <!--<div class="com-page-bar">bar</div>-->
      <div class="com-page-con">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="今日缺勤统计" name="a">
            <div class="history-search">
              <span class="search-item">所属公司：
                <el-select v-model="searchParam.orgIndexCode" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </span>
              <span class="search-item">所属驻地：
                <el-select v-model="searchParam.regionIndexCode" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </span>
              <span class="search-item">时间：
                        <el-date-picker
                          v-model="time2"
                          value-format="timestamp"
                          type="date"
                          placeholder="选择日期">
                    </el-date-picker>
              </span>
              <span class="search-item">
                  <el-input
                    placeholder="请输入人名或者编号"
                    v-model="searchParam.keywords"
                    clearable>
</el-input>
              </span>
              <span class="search-item">
               <el-button type="primary" icon="el-icon-search" @click="searchHandle2">搜索</el-button>
              </span>
            </div>
            <el-row>
              <el-col :span="12">
                <div v-if="!list.length" style="color: #cccccc;margin-top: 30px;text-align: center;">暂无数据~</div>
                <div class="inline-box-item" v-for="(item, index) in list" :key="index">
                  <div class="total">
                    <span style="color: #b8bbc0;">考勤人数:{{item.checkNum}}，</span>
                    <span style="color: #f56c6c;">缺勤人数:{{item.absenceNum}}，</span>
                    <span style="color: #c759ff;">早退人数:{{item.earlyNum}}，</span>
                    <span style="color: #6f7ad3;">迟到人数:{{item.lateNum}}，</span>
                    <span style="color: #e6a23c;">旷工人数:{{item.missNum}}</span>
                  </div>
                  <div class="progress-box">
                    <!--<div class="progress">-->
                    <!--<el-progress-->
                    <!--:stroke-width="5"-->
                    <!--:percentage="(item.absenceNum)/item.checkNum*100"-->
                    <!--color="#f56c6c"></el-progress>-->
                    <!--<el-progress-->
                    <!--:stroke-width="5"-->
                    <!--:percentage="(item.earlyNum)/item.checkNum*100"-->
                    <!--color="#909399"></el-progress>-->
                    <!--<el-progress-->
                    <!--:stroke-width="5"-->
                    <!--:percentage="(item.lateNum)/item.checkNum*100"-->
                    <!--color="#6f7ad3"></el-progress>-->
                    <!--<el-progress-->
                    <!--:stroke-width="5"-->
                    <!--:percentage="(item.missNum)/item.checkNum*100"-->
                    <!--color="#e6a23c"></el-progress>-->
                    <!--</div>-->
                    <div class="progress-2">
                      <div style="background-color: #f56c6c;height: 100%"
                           :style="{width: (item.absenceNum/item.checkNum*100) + '%'}"></div>
                      <div style="background-color: #c759ff;height: 100%"
                           :style="{width: (item.earlyNum/item.checkNum*100) + '%'}"></div>
                      <div style="background-color: #6f7ad3;height: 100%"
                           :style="{width: (item.lateNum/item.checkNum*100) + '%'}"></div>
                      <div style="background-color: #e6a23c;height: 100%"
                           :style="{width: (item.missNum/item.checkNum*100) + '%'}"></div>
                    </div>
                    <span class="name">{{item.orgName}}</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div v-if="!showMessage.length" style="height: 800px; color: #cccccc;margin-top: 30px;text-align: center;border-left: 1px solid #e5e5e5;">暂无通知~</div>
                <el-carousel v-else height="800px" direction="vertical" :autoplay='true' style="border-left: 1px solid #e5e5e5;">
                  <el-carousel-item v-for="(a, index) in showMessage" :key="index">
                    <div class="alert-msg-item" v-for="(item, i) in a" :key="i">
                      <el-alert
                        style="margin-bottom: 10px;"
                        :title="item.content"
                        type="warning"
                        :closable="true">
                      </el-alert>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="历史缺勤统计" name="b">
            <div class="history-search">
              <span class="search-item">所属公司：
                <el-select v-model="historySearchParam.orgIndexCode" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </span>
              <span class="search-item">所属驻地：
                <el-select v-model="historySearchParam.regionIndexCode" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </span>
              <span class="search-item">时间：
                    <el-date-picker
                      v-model="time"
                      type="datetimerange"
                      value-format="timestamp"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
    </el-date-picker>
              </span>
              <span class="search-item">
                  <el-input
                    placeholder="请输入人名或者编号"
                    v-model="historySearchParam.keywords"
                    clearable>
</el-input>
              </span>
              <span class="search-item">
               <el-button type="primary" icon="el-icon-search" @click="searchHandle">搜索</el-button>
              </span>
            </div>
            <div class="table">
              <el-table
                :data="tableData"
                stripe
                border
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
                style="width: 100%;">
                <el-table-column
                  prop="jobNo"
                  label="人员编号"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="personName"
                  label="人员名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="orgName"
                  label="所属公司"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="regionName"
                  label="所属驻地">
                </el-table-column>
                <el-table-column
                  prop="duty"
                  label="人员职务">
                </el-table-column>
                <el-table-column
                  prop="absenceNum"
                  label="缺勤天数">
                </el-table-column>
                <el-table-column
                  prop="earlyNum"
                  label="早退天数">
                </el-table-column>
                <el-table-column
                  prop="lateNum"
                  label="迟到天数">
                </el-table-column>
                <el-table-column
                  prop="missNum"
                  label="旷工天数">
                </el-table-column>
              </el-table>
              <div class="pag" style="text-align: right;margin: 20px 0;">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import API from '../../utils/api'
  import { groupedArray } from '../../utils/utils'

  export default {
    components: {},
    name: 'home',
    data () {
      return {
        userInfo: this.$webStorage.getItem('userInfo'),
        loading: false,
        activeName: 'a',
        options: [],
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              },
            }, {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              },
            }, {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              },
            }],
        },
        searchParam: {
          // attendanceDateStart: null,
          // attendanceDateEnd: null,
          orgIndexCode: null,
          regionIndexCode: null,
          keywords: '',
        },
        time2: new Date().getTime(),
        list: [],
        currentPage: 1,
        pageSize: 20,
        historySearchParam: {
          attendanceDateStart: null,
          attendanceDateEnd: null,
          orgIndexCode: null,
          regionIndexCode: null,
          keywords: '',
        },
        time: '',
        total: 100,
        tableData: [],
        messageList: [],
        showMessage: [],
      }
    },
    computed: {},
    methods: {
      handleClick (tab, event) {
        // console.log(tab, event)
      },
      handleSizeChange (val) {
        this.currentPage = 1
        console.log(`每页 ${val} 条`)
        this.getHistoryData()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        console.log(`当前页: ${val}`)
        this.getHistoryData()
      },
      getTodayData (t) {
        this.loading = true
        let date = ''
        if (t) {
          date = new Date(t)
        } else {
          date = new Date()
        }

        const y = date.getFullYear()
        const m = date.getMonth() + 1
        const d = date.getDate()
        API.attendance.today(Object.assign({}, {
          attendanceDateStart: new Date(y + '-' + m + '-' + d + ' 00:00:00').getTime(),
          attendanceDateEnd: new Date(y + '-' + m + '-' + d + ' 11:59:59').getTime(),
        }, this.searchParam)).then(da => {
          this.list = da.data.records
          this.loading = false
        })
      },
      getHistoryData () {
        this.loading = true
        if (this.time && this.time.length) {
          this.historySearchParam.attendanceDateStart = this.time[0]
          this.historySearchParam.attendanceDateEnd = this.time[1]
        } else {
          this.historySearchParam.attendanceDateStart = null
          this.historySearchParam.attendanceDateEnd = null
        }
        API.attendance.history(Object.assign({}, {
          size: this.pageSize,
          current: this.currentPage,
        }, this.historySearchParam)).then(da => {
          this.tableData = da.data.records
          this.total = da.data.total
          this.loading = false
        })
      },
      searchHandle () {
        this.currentPage = 1
        this.getHistoryData()
      },
      searchHandle2 () {
        this.getTodayData(this.time2)
      },
      getMessage () {
        API.attendance.message({
          current: 1,
          size: 1000,
        }).then(da => {
          this.messageList = da.data.records
          this.showMessage = groupedArray(da.data.records, 16)
        })
      },
    },
    beforeCreate () {

    },
    created () {
      this.getTodayData()
      this.getHistoryData()
      this.getMessage()
    },
  }
</script>

<style scoped lang="less">
  @import "../../styles/common";

  .inline-box-item {
    margin: 20px;
    .total {
      padding: 0 0px 0 0px;
      width: 70%;
      .right {
        float: right;
      }
    }
    .progress-box {
      display: flex;
      align-items: center;
      .progress {
        height: 40px;
        width: 70%;
        display: inline-block;
      }
      .progress-2 {
        height: 40px;
        width: 70%;
        display: inline-block;
        background-color: #ebeef5;
        div {
          display: inline-block;
        }
      }
      .name {
        display: inline-block;
        margin-left: 10px;
      }
    }
  }

  .alert-msg-item {
    margin: 10px;
  }

  .history-search {
    .search-item {
      margin-right: 20px;
      margin-bottom: 10px;
      display: inline-block;
    }
  }

  .table {
    margin-top: 20px;
  }
</style>
