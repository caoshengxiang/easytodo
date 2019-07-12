<template>
  <div class="sign-in">
    <div class="sign-box">
      <div class="logo-box">
        <!--<img src="../../assets/icon/logo.png" alt="">-->
        <span>重置密码</span>
      </div>
      <div class="sign-form-box">
        <el-form label-width="0px" :model="formData" :rules="rules" ref="ruleForm">
          <el-form-item label="" prop="user">
            <el-input :disabled="true" class="user" v-model.number="formData.user" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="formData.password" type="password" auto-complete="off"
                      placeholder="请输入原始密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="newPassword">
            <el-input v-model="formData.newPassword" type="password" auto-complete="off"
                      placeholder="请输入新的密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="newPassword2">
            <el-input v-model="formData.newPassword2" type="password" auto-complete="off"
                      placeholder="请再次输入新的密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button class="el-submit" @click="submitForm('ruleForm')">确定</el-button>
            <p style="text-align: center"><a style="color: blue;cursor: pointer" @click="back">返回管理页面</a></p>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <p></p>
    </div>
  </div>
</template>

<script>
  import { chartLengthRule } from '../../utils/const'
  import API from '../../utils/api'
  // import sha1 from 'js-sha1'
  import md5 from 'js-md5'
  import webStorage from 'webStorage'

  export default {
    name: 'recoverPassword',
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formData.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        time: 0,
        timer: '',
        formData: {
          user: webStorage.getItem('userInfo').loginName,
          password: '',
          newPassword: '',
          newPassword2: '',
        },
        isRemember: false,
        rules: {
          user: [
            {required: true, message: '用户名不存在', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输原始密码', trigger: 'blur'},
          ],
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
          newPassword2: [
            // {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'},
            ...chartLengthRule.defaultRule,
          ],
        },
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = {
              user: this.formData.user,
              password: md5(this.formData.password),
              newPassword: md5(this.formData.newPassword),
            }
            API.account.resetPwd(params, (res) => {
              if (res.status) {
                this.$message.success('密码修改成功，请重新登录')
                this.signIn()
              }
            })
          } else {
            return false
          }
        })
      },
      signIn () {
        this.$router.push({name: 'signin'})
      },
      back () {
        this.$router.go(-1)
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .sign-in {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .sign-box {
    width: 440px;
    margin: 100px auto;
    .logo-box {
      text-align: center;
      span {
        font-size: 34px;
        margin-left: 20px;
      }
    }
    .sign-form-box {
      margin: 80px auto 0 auto;
      width: 340px;
      .phone {
        position: relative;
      }
      .code {
        color: #1E88E5;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 0px;
        font-size: 12px;
        &.time {
          cursor: auto;
        }
      }
      .has-account {
        text-align: center;
      }
      .forget {
        color: #1E88E5;
        cursor: pointer;
      }
      .el-submit {
        width: 50%;
        margin-left: 90px;
        background-color: #FFA94B;
        color: #fff;
        &:active {
          color: #FFF;
          border: 1px solid #FFA94B;
          outline: 0;
        }
      }
    }
  }

  .footer {
    height: 20%;
    background-color: #D7DDE4;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    p {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #333E48;
    }
  }

</style>
