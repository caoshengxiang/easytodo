<template>
  <div class="com-pages"
       v-loading="loading"
       element-loading-text="加载中...">
    <!--<div class="com-page-pos">-->
      <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
        <!--<el-breadcrumb-item>首页</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>系统设置</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>账号设置</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</div>-->
    <div class="com-page-box">
      <!--<div class="com-page-bar">bar</div>-->
      <div class="com-page-con">
        <div class="history-search">
              <span class="search-item">
               <el-button type="primary" icon="el-icon-plus">添加</el-button>
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
              prop="personName"
              label="人员姓名"
              >
            </el-table-column>
            <el-table-column
              prop=""
              label="登录账号"
              >
            </el-table-column>
            <el-table-column
              prop="orgName"
              label="所属公司"
              >
            </el-table-column>
            <el-table-column
              prop="duty"
              label="人员职务">
            </el-table-column>
            <el-table-column
              prop="phoneNo"
              label="联系方式">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="400">
              <template slot-scope="scope">
                <!--<el-button icon="el-icon-view" size="small">查看</el-button>-->
                <el-button icon="el-icon-edit" type="primary" size="small" @click="editDialog(scope.row)">编辑</el-button>
                <el-button icon="el-icon-delete" type="danger" size="small">删除</el-button>
                <el-button icon="el-icon-refresh-right" type="warning" size="small">重置密码</el-button>
              </template>
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

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="formData" v-loading="formLoading"
               element-loading-text="处理中...">
        <el-form-item label="人员姓名" label-width="120px">
          <el-input v-model="formData.personName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" label-width="120px">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" label-width="120px">
          <el-select v-model="formData.orgIndexCode" placeholder="请选择活动区域">
            <el-option label="一" :value="1"></el-option>
            <el-option label="二" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员职务" label-width="120px">
          <el-input v-model="formData.duty" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="120px">
          <el-input v-model="formData.phoneNo" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit" :disabled="formLoading">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // @ is an alias to /src
  import API from '../../utils/api'

  export default {
    components: {},
    name: 'setAccount',
    data () {
      return {
        userInfo: this.$webStorage.getItem('userInfo'),
        loading: false,
        formLoading: false,
        time: '',
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
        search: {},
        currentPage: 1,
        pageSize: 20,
        total: 100,
        tableData: [],
        dialogFormVisible: false,
        formData: {
          personName: '',
          orgIndexCode: '',
          orgName: '',
          duty: '',
          phoneNo: '',
        }
      }
    },
    computed: {},
    methods: {
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
        API.attendance.staff(Object.assign({}, {
          current: this.currentPage,
          size: this.pageSize
        })).then(da => {
          this.tableData = da.data.records
          this.total = da.data.total
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      editDialog (row) {
        this.formData = row
        this.dialogFormVisible = true
      },
      edit () {
        this.formLoading = true
        API.attendance.modifyStaff(this.formData).then(da => {
          if (da.status) {
            this.$message({
              type: 'success',
              message: '编辑成功!',
            })
            this.formLoading = false
            this.dialogFormVisible = false
            this.getData()
          }
        })
      }
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
