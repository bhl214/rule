var appid="47273245";
var appsecret="BCK1QTW5";

var wurl = {
    url: "https://www.tianqiapi.com/api/?version=v6&appid=" + appid + "&appsecret=" + appsecret,
};

$task.fetch(wurl).then(response => {
        var obj = JSON.parse(response.body);
        var city = obj.city;
        var noweather = obj.wea;
        var wind_dir = obj.win;
        var wind_sc = obj.win_speed;
        var hum = obj.humidity;
        var lowtmp = obj.tem2;
        var hightmp = obj.tem1;
        var air = obj.air_pm25;
        var airlevel =obj.air_level;
        var airtips = obj.air_tips;
        var updatetime = obj.date + " " + obj.update_time;

        var title = city + "天气: "+ noweather +" | " + "🌡: " + lowtmp +" °C " + "~" + hightmp +" °C "
        var mation = "🌬: " + wind_dir + wind_sc + " | " + "💧: " + hum + " | " + "💨: " + air + " " + airlevel
        var tips = "🔊: " + airtips
        var update = "更新于: " + updatetime
        $notify(title, mation, tips, update);

}, reason => {
    $notify("错误", "", reason.error);
});
