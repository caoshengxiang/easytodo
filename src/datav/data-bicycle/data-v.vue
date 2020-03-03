<template>
  <div class="data-bicycle">
<!--    <div class="dv-full-s-c">-->
          <dv-full-screen-container class="dv-full-s-c">
      <div class="main-header"><span>共享单车综合智慧治理平台</span></div>
      <div class="con">
        <div class="top-con">
          <div class="left">
            <div class="l-item-1 box-1">
              <div class="box-title box-title-1">
                <img class="icon-1" src="./img/title-icon1.png" alt="">
                <img class="icon-2" src="./img/title-icon2.png" alt="">
                <span class="t">近七天违章量</span>
              </div>
              <div class="box-con">
                <left-chart1></left-chart1>
              </div>
            </div>
            <div class="l-item-2 box-1">
              <div class="box-title box-title-1">
                <img class="icon-1" src="./img/title-icon1.png" alt="">
                <img class="icon-2" src="./img/title-icon2.png" alt="">
                <span class="t">近七天任务平均处理时间(h)</span></div>
              <div class="box-con">
                <left-chart2></left-chart2>
              </div>
            </div>
          </div>
          <div class="center">
            <map-center></map-center>
          </div>
          <div class="right">
            <div class="r-item-1 box-1">
              <div class="box-title box-title-1">
                <img class="icon-1" src="./img/title-icon1.png" alt="">
                <img class="icon-2" src="./img/title-icon2.png" alt="">
                <span class="t">各公司单车投放比率</span></div>
              <div class="box-con">
                <right-chart1></right-chart1>
              </div>
            </div>
            <div class="r-item-2 box-1">
              <div class="box-title box-title-1">
                <img class="icon-1" src="./img/title-icon1.png" alt="">
                <img class="icon-2" src="./img/title-icon2.png" alt="">
                <span class="t">无牌照投放情况</span></div>
              <div class="box-con">
                <right-chart2></right-chart2>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-con">
          <div class="b-item-1 box-1">
            <div class="box-title box-title-2">
              <img class="icon-1" src="./img/title-icon1.png" alt="">
              <img class="icon-2" src="./img/title-icon2.png" alt="">
              <span class="t">调度任务情况</span></div>
            <div class="box-con">
              <bottom-chart1></bottom-chart1>
            </div>
          </div>
          <div class="b-item-2 box-1">
            <div class="box-title box-title-2">
              <img class="icon-1" src="./img/title-icon1.png" alt="">
              <img class="icon-2" src="./img/title-icon2.png" alt="">
              <span class="t">使用率走势图</span></div>
            <div class="box-con">
              <bottom-chart2></bottom-chart2>
            </div>
          </div>
          <div class="b-item-3 box-1">
            <div class="box-title box-title-2">
              <img class="icon-1" src="./img/title-icon1.png" alt="">
              <img class="icon-2" src="./img/title-icon2.png" alt="">
              <span class="t">使用率排行TOP5(%)</span></div>
            <div class="box-con">
              <bottom-chart3></bottom-chart3>
            </div>
          </div>
          <div class="b-item-4 box-1">
            <div class="box-title box-title-2">
              <img class="icon-1" src="./img/title-icon1.png" alt="">
              <img class="icon-2" src="./img/title-icon2.png" alt="">
              <span class="t">最新任务</span></div>
            <div class="box-con">
              <bottom-chart4></bottom-chart4>
            </div>
          </div>
        </div>
      </div>
          </dv-full-screen-container>
<!--    </div>-->
  </div>
</template>

<script>
  import leftChart1 from './charts/LeftChart1'
  import leftChart2 from './charts/LeftChart2'
  import bottomChart1 from './charts/Bottomchart1'
  import bottomChart2 from './charts/BottomChart2'
  import BottomChart3 from './charts/BottomChart3'
  import BottomChart4 from './charts/BottomChart4'
  import RightChart1 from './charts/RightChart1'
  import RightChart2 from './charts/RightChart2'
  import mapCenter from './mapCenter'

  export default {
    name: 'data-v',
    components: {
      leftChart1,
      leftChart2,
      bottomChart1,
      bottomChart2,
      BottomChart3,
      BottomChart4,
      RightChart1,
      RightChart2,
      mapCenter,
    }
  }
</script>

<style scoped lang="less">
  .data-bicycle {
    width: 100vw;
    height: 100vh;
    background-color: #030409;
    color: #fff;

    .dv-full-s-c {
      background-image: url('./img/bg.png');
      background-size: 100% 100%;
      box-shadow: 0 0 3px blue;
      display: flex;
      flex-direction: column;
      padding: 0px 36px;
      box-sizing: border-box;

      .box-1 {
        width: 100%;
        height: 100%;

        .box-title {
          width: calc(100% + 6px);
          margin-left: -3px;
          height: 45px;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-top: 3px;
          position: relative;
          font-size: 16px;

          .icon-1 {
            position: absolute;
            left: 20px;
          }

          .icon-2 {
            position: absolute;
            left: 45px;
            bottom: 6px;
            opacity: 0.4;
          }

          .t {
            z-index: 2;
            padding-left: 45px;
          }
        }

        .box-title-1 {
          background-image: url("./img/title.png");
          margin-bottom: -4px;
        }

        .box-title-2 {
          background-image: url("./img/title2.png");
          margin-bottom: -6px;
        }

        .box-con {
          height: calc(100% - 45px);
          padding: 10px 20px;
          box-sizing: border-box;
          background-image: url("./img/box.png");
          background-size: 100% 100%;
        }
      }

      .main-header {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 27px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);

        span {
          position: relative;
          top: 10px;
        }
      }

      .con {
        height: calc(~"100% - 50px");
      }

      .top-con {
        height: 64%;
        display: flex;

        .left {
          width: 27%;
          height: 100%;

          .l-item-1 {
            height: 50%;
          }

          .l-item-2 {
            height: 50%;
          }
        }

        .center {
          width: 46%;
          height: 100%;
        }

        .right {
          width: 27%;
          height: 100%;

          .r-item-1 {
            height: 50%;
          }

          .r-item-2 {
            height: 50%;
          }
        }
      }

      .bottom-con {
        height: 36%;
        display: flex;

        .b-item-1 {
          width: 27%;
          height: 100%;
        }

        .b-item-2 {
          width: 37%;
          height: 100%;
          padding-left: 10px;
          padding-right: 10px;
          box-sizing: border-box;
        }

        .b-item-3 {
          width: 18%;
          height: 100%;
          padding-right: 10px;
          box-sizing: border-box;
        }

        .b-item-4 {
          width: 18%;
          height: 100%;
        }
      }
    }
  }
</style>
