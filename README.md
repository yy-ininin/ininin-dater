# ininin-dater
日期工具类

# install
npm i ininin-dater

# github
https://github.com/yy-ininin/ininin-dater

# usage
```javascript
import dater from 'ininin-dater'

// 格式化日期对象
dater.format(new Date())

// 当前时间
dater.getNowTime()

// 根据字符串获取日期对象
dater.getDateByString('2020-03-03')

// 获得某月的天数
dater.getMonthDays(2, 2020)
// 今天
dater.getDateRange(0, 'day')

// 昨天
dater.getDateRange(-2, 'day')

// 最近7天
dater.getDateRange(-7, 'day')

// 最近30天
dater.getDateRange(-30, 'day')

// 本周
dater.getDateRange(0, 'week')

// 上周
dater.getDateRange(-1, 'week')

// 本月
dater.getDateRange(0, 'month')

// 上月
dater.getDateRange(-1, 'month')

// 获取星期几
dater.getWeekForDay('2020-03-03')
```
