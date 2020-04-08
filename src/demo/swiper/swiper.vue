<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
      <swiper-slide>I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'swiper',
    data() {
      return {
        swiperOption: {
          // 参数选项,显示小点
          pagination: '.swiper-pagination',
          //循环
          loop: true,
          //每张播放时长3秒，自动播放
          autoplay: 2000,
          //滑动速度
          speed: 1000,
          // delay:1000

        },
        //三张轮播，使用变量循环
        swiperList: [
          {
            id: '001',
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1805/d4/d41d77b6ba8aca02.jpg_750x200_ac3d9a73.jpg'
          },
          {
            id: '002',
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1805/f1/e57bc93226317102.jpg_750x200_9ab37bd0.jpg'
          },
          {
            id: '003',
            imgUrl: 'http://img1.qunarzz.com/piao/fusion/1804/c4/1cdd28811593b802.jpg_750x200_5fbb7c91.jpg'
          }
        ]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>

<style scoped>

</style>
