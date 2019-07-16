<template>
  <div class="com-pages">
    <h1 class="com-h1">自定义表单 demo</h1>
    <div class="com-text">
      <fenerate-form
        @getFormList="getFormList"
        :initList="initList"
        :uploadOptions="{
            action: 'http://' + '/file/upload',
            headers: {authKey: userInfo.authKey},
            key: 'data.url',
            callback: callback
          }"></fenerate-form>
    </div>
    <div class="com-h1">组件依赖</div>
    <div class="com-text">
      cnpm install --save vuedraggable v-dialogs

      <p>v-dialog 这里zai main.js 全局安装</p>
      <p>import animated from 'animate.css'</p>
      <p> Vue.use(vDialogs)</p>
      <p>这里v-dialogs 有个坑，2.0.3 props 下去的数据，显示undefined, 解决方法退回 2.0.2 (不行就把node_modules 全删除)</p>
    </div>
  </div>
</template>

<script>
  import fenerateForm from '../../../components/generateForm/index'

  export default {
    name: 'elFormCustom',
    data () {
      return {
        userInfo: {
          authKey: 123,
        },
        initList: [],
      }
    },
    components: {
      fenerateForm,
    },
    methods: {
      callback (response, item, formConfig) {
        console.log(response, item, formConfig)
        item.bindValue = response.data.z
        formConfig.formField[item.tempFieldName] = item.bindValue
        formConfig.names[item.name] = item.bindValue
      },
      getFormList (da) {
        console.log(da)
      }
    }
  }
</script>

<style scoped>

</style>
