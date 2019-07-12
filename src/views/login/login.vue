<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="form">
      <div class="form-group">
        <input @blur="blurHandle" type="text" v-model="account" placeholder="账号">
      </div>
      <div class="form-group">
        <input @blur="blurHandle" type="password" v-model="password" placeholder="密码">
      </div>
      <div v-if="errMessage" class="err-message">{{errMessage}}</div>
      <div @click="login" class="login-btn">登录</div>
    </div>

    <!--<button @click="login" class="login-btn">登录</button>-->

    <!--<div style="text-align: center;margin-top: 50px;">1.0.3</div>-->
  </div>
</template>

<script>
  import API from '../../utils/api'
  import md5 from 'js-md5'

  export default {
    name: 'signin',
    components: {},
    data () {
      return {
        account: '',
        password: '',
        errMessage: '',
      }
    },
    methods: {
      blurHandle () {
        window.scrollTo(0, 0)
      },
      login () {
        this.errMessage = ''
        if (!this.account || !this.password) {
          this.$vux.toast.text('请输入账号和密码!')
          // this.errMessage = '请输入账号和密码!'
          return false
        }
        this.$vux.loading.show({
          transition: '',
          text: '正在登录...',
        })
        API.account.login({
          account: this.account,
          password: md5(this.password),
        }).then(da => {
          // console.log(this.$VueCookies)
          if (da.status) {
            console.log(da.data)
            this.$VueCookies.set('token', da.data.token, 2 * 60 * 60)
            this.$webStorage.setItem('userInfo', da.data)
            setTimeout(() => {
              this.$vux.loading.hide()
              this.$router.replace({name: 'hexiaoHome'})
            }, 1000)
          } else {
            this.$vux.loading.hide()
            // this.errMessage = da.error.message
            this.$vux.toast.text(da.error.message)
          }
        }).then(err => {
          console.log(err)
        })
      },
    },
    created () {
      let token = this.$VueCookies.get('token')
      if (token) {
        this.$router.push({name: 'hexiaoHome'})
      }
    },
  }
</script>

<style scoped lang="less">

</style>
