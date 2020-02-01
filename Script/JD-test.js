const $NobyDa = (() => {
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const GET = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const POST = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) return ""
        if (isSurge) return $done()
    }
    return { isQuanX, isSurge, notify, write, read, GET, POST, end }
})();

const log = true;
const CookieJD = $NobyDa.read("CookieJD")
JingDongBean()

function JingDongBean() {
  const JDBUrl = {
    url: 'https://lottery.jd.com/award/lottery?actKey=jYNV3i',
    headers: {
      Cookie: CookieJD,
    }
  };

  $NobyDa.GET(JDBUrl, function(error, response, data) {
    if (error) {
      $NobyDa.notify("京东签到错误‼️‼️", "", error)
      const JDBean = "京东商城-抽签: 签到接口请求失败 ‼️‼️" + "\n"
    } else {
      const cc = JSON.parse(data)
      if (data.match(/(\"2001\"|未登录)/)) {
        if (log) console.log("Cookie error response: \n" + data)
        const JDBean = "京东抽签-失败: 签到失败, 原因: Cookie失效" + "\n"
        notice(JDBean)
      } else {
        if (data.match(/(\"3001\"|活动不存在)/)) {
          const JDBean = "京东商城-抽签: 签到失败, 原因: 活动已结束 ⚠️" + "\n"
          notice(JDBean)
        } else {
          if (cc.code == "0000") {
            if (log) console.log("京东商城-抽签签到成功response: \n" + data)
              if (data.match(/京东钢镚/)) {
                if (cc.data.volumn) {
                  const JDBean = "京东商城-抽签: 签到成功, 明细: " + cc.data.volumn + "钢镚 💰" + "\n"
                  notice(JDBean)
                } else {
                  const JDBean = "京东商城-抽签: 签到成功, 明细: 显示接口待更新 ⚠️" + "\n"
                  notice(JDBean)
                }
              } else {
                const JDBean = "京东商城-抽签: 签到成功, 奖励已输出日志" + "\n"
                notice(JDBean)
              }
          } else {
            if (log) console.log("京东商城-抽签签到失败response: \n" + data)
            if (data.match(/\"remainTimes\":(2|1)/) && cc.code == "1000") {
              setTimeout(function() {JingDongBean()}, 200)
            } else if (data.match(/\"remainTimes\":0/) && cc.code == "1000") {
              const JDBean = "京东商城-抽签: 运气稍差, 明细: 未中奖 🐶" + "\n"
              notice(JDBean)
            } else if (data.match(/(\"2003\"|机会用完)/)) {
              const JDBean = "京东商城-抽签: 签到失败, 原因: 无抽签机会 ⚠️" + "\n"
              notice(JDBean)
            } else {
              const JDBean = "京东商城-抽签: 签到失败, 原因: 未知 ⚠️" + "\n"
              notice(JDBean)
            }
          }
        }
      }
    }
  })
}

function notice(JDBean) {
  $NobyDa.notify(JDBean, "", "")
  $NobyDa.end()
}