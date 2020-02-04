<template>
  <div class="signin">
    <div class="sign-box" v-loading="dataLoading"
         element-loading-text="登录中...">
      <div class="logo-box">
        <!--        <img src="../../../public/logo.png" alt="">-->
        <span>服务后台</span>
      </div>
      <div class="sign-form-box">
        <el-form label-width="60px" class="el-form-w" :model="formData" :rules="rules" ref="ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input v-model="formData.username" @keydown.native="keydownSubmit" placeholder="请输入您的登录账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input style="border: 0" @keydown.native="keydownSubmit" type="password" v-model="formData.password"
                      placeholder="请输入你的登录密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="type">
            <el-checkbox-group v-model="isRemember">
              <el-checkbox label="记住密码" name="type"></el-checkbox>
            </el-checkbox-group>
            <!--<a class="forget" @click="recoverPassword">忘记密码</a>-->
          </el-form-item>
          <el-form-item>
            <el-button class="el-submit" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  // import { chartLengthRule } from '../../utils/const'
  // import API from '../../utils/api'
  import md5 from 'js-md5'

  export default {
    name: 'signin',
    data () {
      return {
        formData: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入您的登录账号', trigger: 'blur' },
            // ...chartLengthRule.defaultRule,
          ],
          password: [
            { required: true, message: '请输入您的登录密码', trigger: 'blur' },
            // ...chartLengthRule.defaultRule,
          ],
        },
        isRemember: false,
        dataLoading: false,
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            let pwd = null
            if (this.$webStorage.getItem('cacheUser') && this.$webStorage.getItem('cacheUser').password ===
              this.formData.password) {
              pwd = this.formData.password
            } else {
              pwd = md5(this.formData.password)
            }
            if (this.isRemember) {
              this.$webStorage.setItem('cacheUser', { user: this.formData.username, password: pwd })
            } else {
              this.$webStorage.setItem('cacheUser', '')
            }
            // API.account.login({account: this.formData.username, pwd: pwd, position: 2}).then(
            //   (res) => {
            //     if (res.status) {
            //       this.$webStorage.setItem('userInfo', res.data)
            //       this.dataLoading = false
            //       this.$router.push({name: 'home'})
            //     }
            //     this.dataLoading = false
            //   })
            this.$webStorage.setItem('userInfo', 123)
            this.$VueCookies.set('token', 123, 2 * 60 * 60) // 时效2小时
            this.$router.push({ name: 'home' })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      keydownSubmit (e) {
        if (e.keyCode === 13) {
          this.submitForm('ruleForm')
        }
      },
      recoverPassword () {
      },
    },
    created () {
      if (this.$webStorage.getItem('cacheUser')) {
        this.formData = {
          username: this.$webStorage.getItem('cacheUser').user,
          password: this.$webStorage.getItem('cacheUser').password,
        }
        this.isRemember = true
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .signin {
    .sign-box {
      width: 640px;
      margin: 0px auto;
      padding-top: 100px;

      .logo-box {
        text-align: center;
        /*display: flex;
        align-items: center;
        justify-content: center;*/
        img {
          width: 80px;
          position: relative;
          top: 24px;
        }

        span {
          font-size: 34px;
          margin-left: 20px;
        }
      }

      .sign-form-box {
        margin: 66px auto 0 auto;
        width: 100%;
        padding: 50px 0 34px 0px;
        box-shadow: 0px 3px 5px #d3f2f2;
        border-top: 6px solid #1496db;
        background-color: #fff;

        .forget {
          float: right;
          margin-top: -38px;
          cursor: pointer;
          color: #1496db;
          font-size: 12px;
        }

        .el-form-w {
          width: 340px;
          margin: 0 auto;
        }

        .el-submit {
          width: 100%;
          /*margin-left: 90px;*/
          background-color: #1496db;
          color: #fff;
          height: 40px;
          font-size: 14px;
          border-radius: 4px;

          &:active {
            color: #FFF;
            border: 1px solid #1496db;
            outline: 0;
          }
        }
      }
    }

    .footer {
      height: 89px;
      /*background-color: #D7DDE4;*/
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;

      p {
        position: absolute;
        top: -40px;
        width: 100%;
        text-align: center;
        padding-left: 30px;
        font-size: 12px;
        color: #728395;
        box-sizing: border-box;
      }
    }
  }
</style>
