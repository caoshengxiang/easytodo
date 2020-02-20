<template>
  <div class="ani-box">
    <div class="ani-1"></div>
    <div class="ani-2"></div>
    <div class="map-center">
      <div class="map">
        <div>
          <img class="map-item map1" src="./img/map/成华区@2x.png" alt="">
          <div class="box box1">
            <span class="name">成华区</span>
          </div>
        </div>
        <div>
          <img class="map-item map2" src="./img/map/武侯区@2x.png" alt="">
          <div class="box box2">
            <span class="name">武侯区</span>
          </div>
        </div>
        <div>
          <img class="map-item map3" src="./img/map/金牛区@2x.png" alt="">
          <div class="box box3">
            <span class="name">金牛区</span>
          </div>
        </div>
        <div>
          <img class="map-item map4" src="./img/map/锦江区@2x.png" alt="">
          <div class="box box4">
            <span class="name">锦江区</span>
          </div>
        </div>
        <div>
          <img class="map-item map5" src="./img/map/青羊区@2x.png" alt="">
          <div class="box box5">
            <span class="name">青羊区</span>
          </div>
        </div>
        <div>
          <img class="map-item map6" src="./img/map/高新区@2x.png" alt="">
          <div class="box box6">
            <span class="name">高新区</span>
            <img id="pos" class="pos animated bounce" src="./img/pos.png" alt="">
            <div class="dialog">
              <img class="jiantou" src="./img/jiantou.png" alt="">
              <div>
                单车总数：302000 辆
              </div>
              <div>
                违章总数：2001
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'mapCenter',
    data () {
      return {
        visible: true
      }
    },
    mounted () {
      setInterval(() => {
        $('#pos').removeClass('bounce')
        setTimeout(() => {
          $('#pos').addClass('bounce')
        }, 200)
      }, 5000)
    }
  }
</script>

<style scoped lang="less">
  @keyframes rotate {
    0% {
      transform: rotateZ(0deg) scale(1.4);
    }
    100% {
      transform: rotateZ(180deg) scale(1.4);
    }
  }
  @keyframes rotate2 {
    0% {
      transform: scale(1.11) rotateZ(0deg) rotateY(0deg) rotateX(0deg);
    }
    30% {
      transform: scale(1.11) rotateZ(180deg) rotateY(0deg) rotateX(0deg);
    }
    60% {
      transform: scale(1.11) rotateZ(270deg) rotateY(180deg) rotateX(0deg);
    }
    100% {
      transform: scale(1.11) rotateZ(360deg) rotateY(360deg) rotateX(0deg);
    }
  }
  .ani-box {
    width: 100%;
    height: 100%;
    position: relative;
    .ani-1 {
      background-image: url("./img/map/ball.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 460px;
      height: 460px;
      position: absolute;
      /*top: 46px;*/
      /*left: 128px;*/
      top: 47px;
      left: 130px;
      /*border-radius: 50%;*/
      /*animation: rotate 8s infinite linear normal;*/
      /*animation: rotate 8s infinite ease alternate;*/
      animation: rotate 60s infinite linear alternate;
      /*transform: scale(1.4);*/
    }
    .ani-2 {
      background-image: url("./img/map/ring.png");
      background-size: 100% 100%;
      width: 500px;
      height: 500px;
      position: absolute;
      top: 25px;
      left: 110px;
      /*border-radius: 50%;*/
      animation: rotate2 40s infinite linear alternate;
      /*transform: scale(1.1);*/
    }
  }

  .map-center {
    width: calc(100% - 20px);
    height: calc(100% - 40px);
    /*margin-top: 40px;*/
    padding-top: 40px;
    box-sizing: border-box;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .map {
      position: relative;
      width: 460px;
      height: 460px;
      background-image: url("./img/map/all.png");
      background-size: 100%;

      .map-item {
        position: absolute;
      }

      .map1 { /*成华区*/
        right: -26px;
        top: 81px;
        transform: scale(0.77);
      }

      .map2 { /*武侯区*/
        left: 37px;
        bottom: 69px;
        transform: scale(0.77);
      }

      .map3 { /*金牛区*/
        top: -27px;
        left: 38px;
        transform: scale(0.77);
      }

      .map4 { /*锦江区*/
        right: 73px;
        bottom: 24px;
        transform: scale(0.77);
      }

      .map5 { /*青羊区*/
        top: 116px;
        left: -34px;
        transform: scale(0.77);
      }

      .map6 { /*高新区*/
        left: 158px;
        bottom: -9px;
        transform: scale(0.77);
      }

      .box {
        position: absolute;

        .name {
        }

        .pos {
          width: 17px;
          height: 23px;
          position: absolute;
          top: -23px;
          left: 14px;
        }
        .dialog {
          width: 145px;
          position: absolute;
          top: -62px;
          left: 44px;
          background: #000000;
          opacity: 0.65;
          padding: 10px;
          border-radius: 6px;
          .jiantou {
            position: absolute;
            left: -6px;
            bottom: 10px;
          }
        }
      }

      /*成华区*/

      .box1 {
        right: 110px;
        top: 180px;
      }

      /*武侯区*/

      .box2 {
        bottom: 160px;
        left: 140px;
      }

      /*金牛区*/

      .box3 {
        top: 140px;
        left: 180px;
      }

      /*锦江区*/

      .box4 {
        bottom: 110px;
        right: 140px;
      }

      /*青羊区*/

      .box5 {
        left: 100px;
        top: 200px
      }

      /*高新区*/

      .box6 {
        bottom: 50px;
        right: 210px;
      }
    }
  }
</style>
