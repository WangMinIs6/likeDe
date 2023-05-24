// 引入
// eslint-disable-next-line no-unused-vars
import dayjs from 'dayjs'

export function formatDate(type) {
  const currenttime = new Date().getTime()
  const date = new Date(currenttime) // 创建Date对象
  const year = date.getFullYear() // 获取年份
  // 获取月份，记得+1
  const month = date.getMonth() + 1
  const day = date.getDate() // 获取日期

  if (type === 'month') {
    return {
      old: `${year}-${month > 10 ? month : '0' + month}-01`,
      new: `${year}-${month > 10 ? month : '0' + month}-${day > 10 ? day : '0' + day}`
    } // 返回格式化后的日期字符串
  } else if (type === 'week') {
    const dayjs = require('dayjs')
    // 本周一
    const time = dayjs().startOf('week').add(1, 'day')
    // console.log(time.$D)
    return {
      old: `${year}-${month > 10 ? month : '0' + month}-${time.$D}`,
      new: `${year}-${month > 10 ? month : '0' + month}-${day > 10 ? day : '0' + day}`
    }
  } else if (type === 'year') {
    const currentYear = dayjs().startOf('year').format('YYYY')
    // console.log(currentYear)
    return {
      old: `${currentYear}-01-01`,
      new: `${year}-${month > 10 ? month : '0' + month}-${day > 10 ? day : '0' + day}`
    }
  }
}
// console.log(dayjs().startOf('year').format('YYYY'))
