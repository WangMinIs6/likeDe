import request from '@/utils/request'
import { getToken } from '@/utils/auth'
const token = getToken()
const headers = {
  Authorization: token
}
// 获取当时工单汇总信息(人员统计头部信息)
export function p(oldData, newData) {
  return request.get(`/task-service/task/collectReport/${oldData}/${newData}`, { headers })
}
// 工单统计
export function workOrder(oldData, newData) {
  return request.get(`/task-service/task/taskReportInfo/${oldData}%2000:00:00/${newData}%2023:59:59`, { headers })
}
// 订货量
export function orderSize(oldData, newData) {
  return request.get(`/order-service/report/orderCount?start=${oldData}+00:00:00&end=${newData}+23:59:59`, { headers })
}
// 销售额
export function saleroom(oldData, newData) {
  return request.get(`/order-service/report/orderAmount?start=${oldData}+00:00:00&end=${newData}+23:59:59`, { headers })
}
// 销售趋势图，周
export function tendencyChartWeek(oldData, newData) {
  return request.get(`/order-service/report/amountCollect/1/${oldData}/${newData}`, { headers })
}
// 销售趋势图，月
export function tendencyChartMonth(oldData, newData) {
  return request.get(`/order-service/report/amountCollect/1/${oldData}/${newData}`, { headers })
}
// 销售趋势图，年
export function tendencyChartYear(oldData, newData) {
  return request.get(`/order-service/report/amountCollect/2/${oldData}/${newData}`, { headers })
}
// 销售额周
export function saleroomWeek(oldData, newData) {
  return request.get(`/order-service/report/regionCollect/${oldData}/${newData}`, { headers })
}
// 销售额 月
export function saleroomMonth(oldData, newData) {
  return request.get(`/order-service/report/regionCollect/${oldData}/${newData}`, { headers })
}
// 销售额 年
export function saleroomYear(oldData, newData) {
  return request.get(`/order-service/report/regionCollect/${oldData}/${newData}`, { headers })
}
// https://likede2-admin.itheima.net/likede/api/order-service/report/skuTop/10/2023-05-01/2023-05-23
// 商品top10
export function goodsTop(oldData, newData) {
  return request.get(`/order-service/report/skuTop/10/${oldData}/${newData}`, { headers })
}
// https://likede2-admin.itheima.net/likede/api
// 合作商
export function getCooperation() {
  return request.get(`/vm-service/node/nodeCollect`, { headers })
}
