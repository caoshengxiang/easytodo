<template>
  <div class="com-pages"
       v-loading="loading"
       element-loading-text="加载中..."
  >
    <!--<div class="com-page-pos">-->
    <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
    <!--<el-breadcrumb-item>首页</el-breadcrumb-item>-->
    <!--<el-breadcrumb-item>考勤记录</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <!--</div>-->
    <div class="com-page-box">
      <!--<div class="com-page-bar">bar</div>-->
      <div class="com-page-con">
        <div class="history-search">
        <span class="search-item">所属公司：
                <el-select v-model="search.orgIndexCode" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </span>
          <span class="search-item">所属驻地：
                <el-select v-model="search.regionIndexCode" clearable placeholder="请选择">
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
               value-format="timestamp"
               type="month"
               placeholder="选择月">
                  </el-date-picker>
              </span>
          <span class="search-item">
                  <el-input
                    placeholder="请输入人名或者编号"
                    v-model="search.keywords"
                    clearable>
</el-input>
              </span>
          <span class="search-item">
               <el-button type="primary" icon="el-icon-search" @click="searchHandle">搜索</el-button>
              </span>
          <span class="search-item">
               <el-button type="success" icon="el-icon-download" @click="exportHandle">导出</el-button>
              </span>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            stripe
            border
            :header-cell-style="{background:'#f5f7fa',color:'#606266'}"
            style="width: 100%">
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
              prop="checkNum"
              label="应到天数">
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
              label="未到(天)">
            </el-table-column>
            <el-table-column label="考勤情况" prop="monthRecords">
              <template slot="header">
              考勤情况
              （
              <i class="el-icon-success" style="color: #67C23A"></i>代表已签到，
              <i class="el-icon-remove" style="color:#F56C6C"></i>代表缺勤，
              <i class="el-icon-error" style="color: #E6A23C"></i>代表旷工，
              <i class="el-icon-alarm-clock" style="color: #333333"></i>代表迟到或早退
              ）
              </template>
              <el-table-column
                v-for="(item, index) in 31"
                :key="index"
                :label="item+''"
                width="40">
                <template slot-scope="scope">
                  <i v-if="getAttendanceStatus(item, scope.row.monthRecords) == 1" class="el-icon-success"
                     style="color: #67C23A" @click="showDialog(item, scope.row)"></i>
                  <i v-if="getAttendanceStatus(item, scope.row.monthRecords) == 4" class="el-icon-remove"
                     style="color:#F56C6C"></i>
                  <i v-if="getAttendanceStatus(item, scope.row.monthRecords) == 5" class="el-icon-error"
                     style="color: #E6A23C"></i>
                  <i
                    v-if="getAttendanceStatus(item, scope.row.monthRecords) == 2 || getAttendanceStatus(item, scope.row.monthRecords) == 3"
                    class="el-icon-alarm-clock" style="color: #333333"></i>
                </template>
              </el-table-column>
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
      </div>
    </div>

    <el-dialog title="员工当日考勤信息" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="eventTime" label="签到时间" width="150">
          <template slot-scope="scope">
            {{$moment(scope.row.eventTime)}}
          </template>
        </el-table-column>
        <el-table-column property="" label="是否签到" width="200">
          <template>
            已签到
          </template>
        </el-table-column>
        <el-table-column property="" label="查看图片">
          <template>
            <el-button type="warning">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  // @ is an alias to /src
  import API from '../../utils/api'
  import { getFirstDay, getLastDay, fileDown } from '../../utils/utils'
  import { serverUrl } from '../../utils/const'
  import QS from 'qs'

  export default {
    components: {},
    name: 'attendanceRecord',
    data () {
      return {
        userInfo: this.$webStorage.getItem('userInfo'),
        loading: false,
        search: {
          attendanceDateStart: null,
          attendanceDateEnd: null,
          orgIndexCode: null,
          regionIndexCode: null,
          keywords: '',
        },
        time: new Date().getTime(),
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
        currentPage: 1,
        pageSize: 20,
        total: 100,
        tableData: [],

        dialogTableVisible: false,
        gridData: [],
      }
    },
    computed: {},
    methods: {
      showDialog (item, row) {
        this.loading = true
        API.attendance.personRecord({
          personId: row.personId,
          eventDate: `${row.year}-${row.month}-${item}`,
        }).then(da => {
          this.gridData = da.data
          this.loading = false
          this.dialogTableVisible = true
        }).catch(() => {
          this.loading = false
        })
      },
      getAttendanceStatus (item, row) {
        let status = null
        // console.log(row)
        row.forEach(day => {
          if (item === day.day) {
            status = day.state
          }
        })
        return status
      },
      handleSizeChange (val) {
        this.currentPage = 1
        console.log(`每页 ${val} 条`)
        this.getData()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getData()
      },
      getData () {
        this.loading = true
        if (this.time) {
          this.search.attendanceDateStart = getFirstDay(this.time)
          this.search.attendanceDateEnd = getLastDay(this.time)
        } else {
          this.search.attendanceDateStart = null
          this.search.attendanceDateEnd = null
        }
        API.attendance.record(Object.assign({}, {
          size: this.pageSize,
          current: this.currentPage,
        }, this.search)).then(da => {
          this.tableData = da.data.records
          this.total = da.data.total
          this.loading = false
        })
      },
      searchHandle () {
        this.currentPage = 1
        this.getData()
      },
      exportHandle () {
        let token = this.$VueCookies.get('token')
        let p = Object.assign({}, {
          size: this.pageSize,
          current: this.currentPage,
          token: token,
        }, this.search)
        let url = serverUrl + '/staffAttendance/absenceStatByMonth/export?' + QS.stringify(p) // 拼装参数
        fileDown(url, null)
      },
    },
    beforeCreate () {

    },
    created () {
      this.getData()
    },
  }
</script>

<style scoped lang="less">
  @import "../../styles/common";

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
