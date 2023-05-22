<template>
  <div class="dashboard-container">
    <div class="top_box">
      <div class="left_box">
        <div class="top">
          <div class="statistics_box">
            123
          </div>
          <div class="statistics1_box">
            234
          </div>
        </div>
        <div class="bottom">
          456
        </div>
      </div>
      <div class="right_box">
        789
      </div>
    </div>
    <div class="foot_box">
      <div class="foot_left">
        111
      </div>
      <div class="foot_right">
        222
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard'

}
</script>

<style lang="scss" scoped>
.dashboard-container{
  width: 100%;
  .top_box{
    width: 100%;
    height: 538px;
      display: flex;
    .left_box{
      width: 1000px;
      height: 100%;
      .top{
        width: 100%;
        height: 166px;
        display: flex;
        .statistics_box{
          width: 540px;
          height: 100%;
          border-radius: 25px;
          margin-right: 20px;
          background-color: bisque;
        }
         .statistics1_box{
          width: 440px;
          height: 100%;
          border-radius: 25px;
          background-color: bisque;
        }
      }
      .bottom{
        height: 350px;
        width: 100%;
        margin-top: 25px;
        border-radius: 25px;
        background-color: rgb(147, 190, 228);

      }
    }
    .right_box{
      width: 520px;
      height: 100%;
      margin-left: 20px;
      border-radius: 25px;
      flex: 1;
      background-color: #c78080;
    }
  }
  .foot_box{
    width: 100%;
    height: 360px;
    margin-top: 25px;
    display: flex;
    .foot_left{
      width: 800px;
      height: 100%;
      margin-right: 25px;
      border-radius: 25px;
      background-color: blue;
    }
    .foot_right{
      flex: 1;
      border-radius: 25px;
      background-color: chartreuse;
    }
  }
}
</style>
