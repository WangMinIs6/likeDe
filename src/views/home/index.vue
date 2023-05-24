<template>
  <div class="dashboard-container">
    <div class="top_box">
      <div class="left_box">
        <div class="top">
          <div class="statistics_box">
            <div class="statistics_top">
              <h3>工单统计</h3><span>{{ monthTime.old }} - {{ monthTime.new }}</span>
            </div>
            <div class="statistics_bottom">
              <div><p class="span">{{ work.total ? work.total : 0 }}</p><span>工单总数（个）</span></div>
              <div><p class="span">{{ work.completedTotal ? work.completedTotal : 0 }}</p><span>完成工单（个）</span></div>
              <div><p class="span">{{ work.progressTotal ? work.progressTotal : 0 }}</p><span>进行工单（个）</span></div>
              <div><p class="span">{{ work.cancelTotal ? work.cancelTotal : 0 }}</p><span>取消工单（个）</span></div>
            </div>
          </div>
          <div class="statistics1_box">
            <div class="statistics_top">
              <h3>工单统计</h3><span>{{ monthTime.old }} - {{ monthTime.new }}</span>
            </div>
            <div class="statistics_bottom">
              <div><p class="span">{{ oSize ? oSize : 0 }}</p><span>订单量（个）</span></div>
              <div><p class="span">{{ mySaleroom ? mySaleroom/100 :0 }}</p><span>销售额（元）</span></div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="b_top">
            <div class="b_top_left">
              <h3>销售数据</h3><span>{{ time.old }} - {{ time.new }}</span>
            </div>
            <div class="b_top_right">
              <span @click="myECharts('week')">周 </span>
              <span @click="myECharts('month')"> 月 </span>
              <span @click="myECharts('year')"> 年</span></div>
          </div>
          <div class="b-bottom">
            <div ref="chartLeft" class="b_left" />
            <div ref="chartRight" class="b_right" />
          </div>
        </div>
      </div>
      <div class="right_box">
        <div class="right_box_top">
          <h3>商品热榜</h3><span>{{ monthTime.old }} - {{ monthTime.new }}</span>
        </div>
        <ul>
          <li v-for="(item, i) in topGoods" :key="i">
            <div class="top_left">
              <div class="top" :class="'top'+ (i+1)">{{ i +1 }}</div>
              <span>{{ item.skuName }}</span>
            </div>
            <span>{{ item.count }}单</span>
          </li>

        </ul>
      </div>
    </div>
    <div class="foot_box">
      <div ref="cooperation" class="foot_left">
        <div ref="cooperation" class="cooperation_left" style="height: 100%; ">000</div>
        <div class="cooperation_right">
          111
        </div>
      </div>
      <div class="foot_right">
        222
      </div>
    </div>
  </div>
</template>

<script>
import { tendencyChartMonth, tendencyChartWeek, tendencyChartYear,
  saleroomWeek, saleroomMonth, saleroomYear, goodsTop, workOrder,
  orderSize, saleroom, getCooperation } from '@/api/home'
import { formatDate } from '@/utils/index'
import * as echarts from 'echarts'
export default {
  name: 'Dashboard',
  data() {
    return {
      tendencyChar: '',
      saleroom: '',
      time: {},
      monthTime: formatDate('month'),
      topGoods: [], // 热榜top10
      work: {}, // 工单统计
      oSize: '', // 订单量
      mySaleroom: '', // 销售额
      cooperation: '', // 合作商点位
      optionLeft: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: {
          data: [],
          type: 'line',
          smooth: true
        }

      },
      optionRight: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: {
          data: [],
          type: 'bar'
        }

      },
      cooperations: {
        toolbox: {
          show: true
        },
        series: {
          type: 'pie',
          radius: [30, 150],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: [{ value: 40, name: 'rose 1' }]
        }

      }
    }
  },
  async created() {
    this.myECharts('week')
    const time = formatDate('month')
    const goods = await goodsTop(time.old, time.new)// 商品热榜
    this.topGoods = goods
    const work = await workOrder(time.old, time.new)// 工单统计
    this.work = work[0]
    this.oSize = await orderSize(time.old, time.new)// 订单量
    this.mySaleroom = await saleroom(time.old, time.new)// 销售额
    const res = await getCooperation()
    // this.cooperation = this.cooperation.map(item => {
    //   return {
    //     value: item.value,
    //     name: item.name
    //   }
    // })
    console.log(this.cooperation)
    this.cooperations.series.data = res
  },
  mounted() {
    this.cRender()
  },
  methods: {
    async myECharts(type) {
      this.time = formatDate(type)
      if (type === 'week') {
        this.tendencyChar = await tendencyChartWeek(this.time.old, this.time.new)// 销售趋势图，周
        this.saleroom = await saleroomWeek(this.time.old, this.time.new)// 销售额，周
      } else if (type === 'month') {
        this.tendencyChar = await tendencyChartMonth(this.time.old, this.time.new)// 销售趋势图，月
        this.saleroom = await saleroomMonth(this.time.old, this.time.new)// 销售额，月
      } else if (type === 'year') {
        this.tendencyChar = await tendencyChartYear(this.time.old, this.time.new)// 销售趋势图，年
        this.saleroom = await saleroomYear(this.time.old, this.time.new)// 销售额，年
      }
      this.optionLeft.xAxis.data = this.tendencyChar.xAxis
      this.optionLeft.series.data = this.tendencyChar.series
      this.optionRight.xAxis.data = this.saleroom.xAxis
      this.optionRight.series.data = this.saleroom.series
      this.cRender()
    },
    cRender() {
      // const myChartLeft = echarts.getInstanceByDom(this.$refs.chartLeft)
      // const myChartRight = echarts.getInstanceByDom(this.$refs.chartRight)
      this.optionLeft && echarts.init(this.$refs.chartLeft).setOption(this.optionLeft)
      this.optionRight && echarts.init(this.$refs.chartRight).setOption(this.optionRight)
      this.cooperations && echarts.init(this.$refs.cooperation).setOption(this.cooperations)
      // if (myChartLeft === null) {
      //   this.optionLeft && echarts.init(this.$refs.chartLeft).setOption(this.optionLeft)
      // }
      // if (myChartRight === null) {
      //   this.optionRight && echarts.init(this.$refs.chartRight).setOption(this.optionRight)
      // }
    }

  }

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
      width: 1050px;
      height: 100%;
      .top{
        width: 100%;
        height: 160px;
        display: flex;
        .statistics_box{
          width: 550px;
          height: 100%;
          border-radius: 25px;
          margin-right: 40px;
          padding: 15px ;
          display: flex;
          flex-direction: column;
          background-color: #e9f3ff;
          background: url(data:image/png;base64,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),url(https://likede2-admin.itheima.net/img/task.66b715b7.png);
          background-repeat: no-repeat,no-repeat;
          background-position: 0 0,calc(100% - 12px) 100%;
          .statistics_top{
            display: flex;
            align-items: center;
            h3{
              font-size: 18px;
              color: #333;
            }
            span{
              margin-left: 10px;
              font-size: 14px;
              color: #999;
            }
          }
          .statistics_bottom{
            flex: 1;
            display: flex;
            div:nth-child(1){
              margin-left: 20px;
            }
            div{
              flex: 1;
              margin: 10px;
              // text-align: center;
            //  background-color: #c78080;
            .span{
              display: block;
              font-size: 36px;
              font-weight: 700;
              margin: 10px 0;
              color: #072074;
              text-shadow: 2px 4px 7px rgba(85,132,255,.5);
            }
            span{
              // margin-left: 6px;
              color: #91a7dc;
              font-size: 12px;
              font-family: none;
              font: normal;
            }
            }

          }
        }
         .statistics1_box{
          width: 460px;
          height: 100%;
          border-radius: 25px;
           padding: 15px ;
          display: flex;
          flex-direction: column;
          background: #fbefe8 url(https://likede2-admin.itheima.net/img/sale.606b0d8c.png) no-repeat calc(100% - 12px) 100%;
          // background-color: bisque;
          .statistics_top{
            display: flex;
            align-items: center;
            h3{
              font-size: 18px;
              color: #333;
            }
            span{
              margin-left: 10px;
              font-size: 14px;
              color: #999;
            }
          }
          .statistics_bottom{
            flex: 1;
            display: flex;
            div:nth-child(1){
              margin-left: 60px;
            }
            div{
              flex: 1;
              margin: 10px;
              // text-align: center;
            //  background-color: #c78080;
            .span{
              display: block;
              font-size: 36px;
              font-weight: 700;
              margin: 10px 0;
              color: #ff5757;
              text-shadow: 2px 4px 7px rgba(255,99,85,.5);
              }
            span{
              // margin-left: 6px;
              color: #ff5757;
              font-size: 12px;
              font-family: none;
              font: normal;
            }
            }
          }
        }
      }
      .bottom{
        height: 360px;
        width: 100%;
        margin-top: 15px;
        padding: 10px;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        .b_top{
          width: 100%;
          height: 30px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
         .b_top_left{
          // width: 100%;
          height: 100%;
            display: flex;
            align-items: center;
            h3{
              font-size: 18px;
              color: #333;
            }
            span{
              margin-left: 10px;
              font-size: 14px;
              color: #999;
            }
          }
          .b_top_right{
            //年月日
            // widows: 120px;
            // height: 30px;
            width: 130px;
            background: rgba(233,243,255,.37);
            border-radius: 10px;
            height: 34px;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              width: 37px;
              font-size: 14px;
              text-align: center;
              color: #9ca3b4;
              cursor: pointer;

            }
          }
        }
        .b-bottom{
          flex: 1;
          display: flex;
          .b_left{
           flex: 1;
        }
          .b_right{
            flex: 1;
          }
        }

      }
    }
    .right_box{
      width: 520px;
      height: 100%;
      margin-left: 20px;
      border-radius: 25px;
      padding: 10px;
      flex: 1;
      background-color: #fff;
      .right_box_top{
          // width: 100%;
          height: 30px;
            display: flex;
            align-items: center;
            h3{
              padding-left: 10px;
              font-size: 16px;
              color: #333;
            }
            span{
              margin-left: 10px;
              font-size: 14px;
              color: #999;
            }
      }
      ul{
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        li{
          width: 100%;
          height: 49px;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 12px;
          .top_left{
            display: flex;
            align-items: center;
            img{
              width: 20px;
              height: 20px;
              background-color: red;
            }
            span{
              margin-left: 25px;
              height: 20px;
              font-size: 14px;
              font-family: PingFangSC-Medium,PingFang SC;
              font-weight: 500;
              color: #333;
              line-height: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          span{
             height: 20px;
              font-size: 14px;
              font-family: PingFangSC-Medium,PingFang SC;
              font-weight: 500;
              color: #333;
              line-height: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
          }
        }
         .top{
              display: inline-block;
              width: 16px;
              height: 20px;
              margin-left: 10px;
              background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAo0lEQVQ4T2P8/f7FfwYKAOOoAQyjYcAwGgYMgz8MGBl+gHP6fwYOXDkeX1Le8JeRsRikkeX//97/DAwB2AzBZsBVBkbGAlYB8T3IGn5/eOnC8P//BAYGBm1kcSQD/r9nYmKuZ+ITnc7IyPgHm23///9n+f3hZRYjA2MDA8N/QZAaxj/vXzxiYGTc8u3b3zo+Kak3xJRu/z89E/n7j7np////VgAGUHY6vIpVhgAAAABJRU5ErkJggg==');
              text-align: center;
              font-size: 12px;
              font-family: zihun143-zhengkuchaojihei,zihun143;
              font-weight: 400;
              color: #e9b499;
              line-height: 14px;

        }
        .top1{
              width: 21px;
              height: 20px;
              background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACMElEQVQ4T82UPWgUURDHf3OXQy/4VYqVgoWKhYioKIaAhmguicaAWIitZewSEBQFQQvBtFZimdIEFSFFVBI/clFQz4OYRgQt1YgnuX1vZPdud9/tbhLt3Oa9fbv7m//M/GeFxKWfT33D2I1YBWPBKNjmGuwT51a/y+GpTS5GUtBP/RqAfGAASOyjAPFz6XjSwhGd4D3Krgi+uy+tJgA7ilvUKiw+jbUJFdFxVPqIIulCb0NpqMhN3VXvnMvRZ/H3Pi8FnS9pXEu3fonaRgEs0jWdgE6wxC+Kcgbj56DVExrVcrlmJRRL90wA1VkKfOGnr7RKjrNS4k3woHI8hrZ0PmyM28BGJtLzvAG9z0Fy3PEbdQnhAD2cFEH1XXczfbLrmmEv6X0hOkaedh6hPBR9wBoskyhf8Rhm27GPqDiWCr0a2iusbXhuQGb3IFxHKbCOUkP2GEXaGQHOsfnQVqSYa/gzafxwCJwS2Jol/3Ye5S5buCX7qKfN/7rrNnUztKrxw+lSRmXg1cWVJ2q6czt5qWC0kGmtUH1j2uqI7pSB8sKK0KAcM53DePZGrNYdVSd1dEROl28mRz2VfviCTnVcwdjLGM3F0xUNg0XtNRmcu5oE+vfLQgPFk0f24tkhTO08tg3sEti2exgdlcHyXBZwVWikehwN9+5/4v+B6ssdP4D1GYoWZX91wz8p1cf9NTyzFuOBMeD5q9dcTXNvwHq/5UKl+Ffdj6BZMDdIAP2Qgv4B21H4JL7cBkgAAAAASUVORK5CYII=');
              color: #8e5900;
        }
        .top2{
              width: 21px;
              height: 20px;
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACF0lEQVQ4T8WTz4vTUBDHZzYUbcEf9NBzkhaKnsRCFEqhFHqJCXv1IP4L620XBEVB0IPgXj2Jx/4DevHSW6EULw2WdpOWliKUFn+BNu+9jrxAS0zTbvZk4JE3TN7nfb+TGYTIs1gsvgkhrgkhQK7VahW898TfS6XS9TAGo9DZbEZJgOHLDMP4h4Oe53WJ6OYanslkNuoSqAwc5HK5jTZEdNB1XdJ1fXPTdDoNlIaBUXg0Xy6XN+clbws6mUwS2Q+DK5XKFtTXNC2NiEJ6GI1GsdB9aqvVagBtt9upbDb7Syr9goj3NU37LBOe5+1UuqsstVotgHqed5eI3uJwOHxMRHdUVT1ERBoMBheuab1ex0ajoRiG8VEI8QH7/f4lRVE+AcBXIcQxEQ12tVScUlmWQqFwCwBeAEBK07R7gezxeJzmnJ8AwAPGmMoYOwg3fBgWra2iKKt8Pt8HgHeqqr5GRLbV/I7jvOGcHyWcJiCiU9M0H+2dqG63W2CMOUKIVBw4opoh4g3TNM/2QmWy0+kcc85fnjdRAHBiWdar6Khv2V9/0Gq1nnLOnwghDmJ6dEVEz23bfhYFyngnVCabzeZtIjoCgIe+7wMigu/774UQp7Ztd+KA50LXh3q9Hq33xWJxr5D/A3Vd9wcAXImx+VPX9asXsj+fz3/7vn9Z1pExJuu4WeGYMfbHsqx0or8vocvlMhHUtu0t6F9KkMngoAlOWAAAAABJRU5ErkJggg==');
              color: #494949;
        }
        .top3{
          width: 21px;
          height: 20px;
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACd0lEQVQ4T82VMWgUQRSGv3fLabQWi4AI6VIKIiEWIgSDJiSoIFhZBEzAgCgpLAQPTLAWo5yRbSwURBHDRTSmECSKcgiGaMBOLIJ2FpqcuzNPZnb33MvGRDuvuZ2Ze9/8773/7QlrPvpicBKj24gtGAUTgwFik65J9mJ3ZsHqigzNj+YxUoA+Hwg9UNMg9xwpqIMCUQpUd6n1cDn9aqgFqjNcRmlvbrb1J4pcUOSVJMFuL05VG3dBAvTfu17nmcuiNULpp3mTPusLk4As/QyYKmsCXRmSksjom9/xjleAPjmcpO/ruQnQZRGDnC1Cp6gzIhWsy0FrveG6QA9w5TAQpSpdhLHIubpXqvcI2M4Np3SCMlXp5bM/eHQoxOaUuro61Tatp2ta/txBx94m0BodwCnRGfqBDvq4Jq7nD3tC3wAfmGtGsxSpC/zaePVy4d2QViixl/NYFkRvUqadMYRv/OQ+9uAVTKnViy21zWqdAL3VOhcrBByjRMB3rnqfap0yy/QhdPGjawfxVmnaxVsrrWezeS6D1FZbGkrnxy8o86zwVE5giua/c+AksfYknc913w2D9202DJlnZU4uLdzdeKJud+9ES+MYG3i1DpSfrha1zgrBRaksfN0Q6stxa/8RVI9n5i4OQ9rA2DyQ8aXHa0e9kH72A53qGqBhB7BWWofBl0RRnZbK++m1QLf+I9QrntyzmzjoQVe7aQiUYmgEL1k1czKx9Gk94KbQpuoaYfacf0/8P1Ctd15HaSsoUlZl39KZf1Kqs0er2KhMFKUmd0aP0rF0z86jbq2RDC+O/FX3dXawShyXk7+NHNDPerZ2YBPJ8IcC9BfAsOweLKuvfgAAAABJRU5ErkJggg==');
          color: #cf6d3d;
        }
      }
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
      display: flex;
      background-color: #fff;
      .cooperation_left{
        width: 500px;
        height: 100%;
      }
      .cooperation_right{
         width: 290px;
        height: 100%;
        background-color: #494949;
      }
    }
    .foot_right{
      flex: 1;
      border-radius: 25px;
      background-color: chartreuse;
    }
  }
}
</style>
