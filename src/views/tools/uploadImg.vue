<template>
  <div class="com-pages">
    <h1 class="com-h1">获取图片地址</h1>
    <div class="com-text">
      <div>
        <!--        <el-upload-->
        <!--          class="avatar-uploader"-->
        <!--          :headers="{authKey: userInfo.authKey}"-->
        <!--          :action="serverUrl + '/file/upload'"-->
        <!--          :show-file-list="false"-->
        <!--          :on-success="successHandleIcon">-->
        <!--          <img v-if="detail.iconUrl" :src="detail.iconUrl" class="avatar" style="max-width: 400px;">-->
        <!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--        </el-upload>-->

        <!---->
        <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar" style="max-width: 100%">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'uploadImg',
    data () {
      return {
        userInfo: {
          authKey: 123,
        },
        initList: [],
      }
    },
    components: {},
    methods: {
      beforeAvatarUpload (file) {
        const isImage = (file.type === 'image/jpeg' ||
          file.type === 'image/gif' ||
          file.type === 'image/png' ||
          file.type === 'image/bmp')
        const isLt2M = file.size / 1024 / 1024 < 10

        if (!isImage) {
          this.$message.error('上传图片只能是 JPG、JPEG、GIF、PNG、BMP 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 10MB!')
        }

        if (isImage && isLt2M) {
          let param = new FormData()
          param.append('file', file, file.name)

          // API.file.upload(param, (res) => {
          //   if (res.status) {
          //     this.ruleForm.headImg = res.data.url
          //   }
          // })
        }

        return false
      },
    }
  }
</script>

<style scoped>

</style>
