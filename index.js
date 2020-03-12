/**
 * 日期工具类
 * @summary 日期工具类
 * @namespace ininin-dater
 * @author woo@ininin.com
 * @version 1.1
 * @since 2016/2/22
 * @constructor
 */

module.exports = {
    dayMillisecond: 864e+5, //一天的毫秒数
    /**
     * 格式化日期对象
     * @param {Date} date 日期对象
     * @param {String} [fmt] 格式，默认yyyy-mm-dd
     * @example
     * format(date, 'yyyy-mm-dd hh:ii:ss');
     * @returns {String} 格式化日期字符串
     */
    format(date, fmt) {
        date = date || new Date();
        fmt = fmt || "yyyy-mm-dd";
        let o = {
            "m+": date.getMonth() + 1,//月份
            "d+": date.getDate(),//日
            "h+": date.getHours(),//小时
            "i+": date.getMinutes(),//分
            "s+": date.getSeconds()//秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
            }
        }
        return fmt
    },
    /**
     * 获取当前时间
     * @example
     * getNowTime()
     * @returns {String} 日时间字符串
     */
    getNowTime() {
        return this.format(new Date())
    },
    /**
     * 根据字符串获取日期对象
     * @param {String|Number} str 日期字符串，时间戳
     * @param {String} separator 分隔符
     * @example
     * getDateByStr('2019-02-02')
     * @returns {Date} 日期对象
     */
    getDateByString(str, separator = '-') {
        let date
        if(/^\d+$/.test(String(str))){
            date = new Date(str)
        }else{
            date = new Date()
            const blank = RegExp('\\D+','g')
            const sta = RegExp('^' + separator,'g')
            const end = RegExp('$' + separator,'g')
            const reg = RegExp(separator,'g')
            const parts = str.trim().replace(blank, '-').replace(sta, '').replace(end, '').replace(reg, '-').split('-')
            date.setFullYear(parseInt(parts[0], 10))
            let month = parseInt(parts[1], 10)
            date.setMonth(month > 0 ? month - 1 : 11)
            date.setDate(parseInt(parts[2], 10))
            date.setHours(parseInt(parts[3], 10) || 0)
            date.setMinutes(parseInt(parts[4], 10) || 0)
            date.setSeconds(parseInt(parts[5], 10) || 0)
            date.setMilliseconds(0)
        }
        return date
    },
    /**
     * 获得某月的天数
     * @param {Number} month 月
     * @param {Number} [year] 年，默认当前年
     * @example
     * getMonthDays(2, 2016) // => 二月天数
     * @returns {Number} 结果
     */
    getMonthDays(month, year) {
        year = year || new Date().getFullYear();
        let monthStartDate = new Date(year, month - 1, 1),
            monthEndDate = new Date(year, month, 1);
        return Math.floor((monthEndDate - monthStartDate) / this.dayMillisecond);
    },
    /**
     * 获取日期段
     * @param {Number} [num=0] 数字，负数表示上月/周/num天内
     * @param {Number|String} [mode=day] year：年，month：月，week：周，day：日
     * @param {Boolean} [oneDay=false] 指定为某一天
     * @example
     * getDateRange(-1, 'month') // => 上月
     * getDateRange(0, 'month') // => 本月
     * getDateRange(-1, 'week') // => 上周
     * getDateRange(0, 'week') // => 本周
     * getDateRange(0, 'day') // => 今天
     * getDateRange(-2, 'day', true) // => 昨天
     * getDateRange(-7, 'day') // => 最近7天
     * getDateRange(-30, 'day') // => 最近30天
     * @constructor
     * @returns {Object} 结果
     */
    getDateRange(num, mode, oneDay) {
        num = parseFloat(num) || 0
        mode = mode || "day"
        let date = new Date();
        let dateTime = date.getTime();
        let startDate = dateTime; //起始时间
        let endDate = dateTime; //结束时间
        if (mode == "week") { //上周/本周
            num = 7 * num;
            let weekTime = dateTime + num * this.dayMillisecond;
            let week = date.getDay() || 7; //星期几
            startDate = weekTime - (week - 1) * this.dayMillisecond;
            endDate = startDate + 6 * this.dayMillisecond;
        } else if (mode == "month") { //上月/本月
            let monthDate = new Date(date.getFullYear(), date.getMonth() + num, 1);
            startDate = monthDate.getTime();
            monthDate.setDate(this.getMonthDays(monthDate.getMonth() + 1, monthDate.getFullYear()));
            endDate = monthDate.getTime();
        } else { //num天内
            if (num < 0) { //向前
                num++; //去掉今天
                startDate = dateTime + num * this.dayMillisecond;
                endDate = oneDay ? startDate : dateTime;
            } else if (num > 0) { //向后
                num--; //去掉今天
                endDate = dateTime + num * this.dayMillisecond;
                startDate = oneDay ? endDate : dateTime;
            }
        }
        let startDateObj = new Date(startDate)
        startDateObj.setHours(0)
        startDateObj.setMinutes(0)
        startDateObj.setSeconds(0)
        let startDateEndObj = new Date(startDate)
        startDateEndObj.setHours(23)
        startDateEndObj.setMinutes(59)
        startDateEndObj.setSeconds(59)
        let endDateObj = new Date(endDate)
        endDateObj.setHours(23)
        endDateObj.setMinutes(59)
        endDateObj.setSeconds(59)
        let todayEndObj = new Date(dateTime)
        todayEndObj.setHours(23)
        todayEndObj.setMinutes(59)
        todayEndObj.setSeconds(59)
        return {
            startDate: this.format(new Date(startDate)),
            startDateObj,
            startDateEndObj,
            endDate: this.format(new Date(endDate)),
            endDateObj,
            today: this.format(new Date(dateTime)),
            todayObj: new Date(dateTime),
            todayEndObj
        }
    },
    /**
     * 获取当前星期几
     * @param {String|Number|Date} time 日期字符串，时间戳，日期对象，默认当天
     * @returns {String} 星期几
     */
    getWeekForDay(time) {
        const date = this.getDateByString(time) || new Date()
        return date ? ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()] : ""
    }
};