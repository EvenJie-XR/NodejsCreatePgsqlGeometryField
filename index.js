var fs = require("fs");
// 同步读取
var data = fs.readFileSync('./ranqi-ying.json');
const geojson = JSON.parse(data);
geojson.features.forEach((feature) => {
    const x84 = feature.geometry.coordinates[0];
    const y84 = feature.geometry.coordinates[1];
    // 将属性location的值从4547变成4326
    feature.properties.locationX = x84;
    feature.properties.locationY = y84;
    // 构建geometry属性字段，这里写的是点的形式
    feature.properties.geometry = `POINT(${x84} ${y84})`;
})
const resultJSONStr = JSON.stringify(geojson);
fs.writeFile('./ranqi-ying-84-geometry.json', resultJSONStr,  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
 });
console.log("程序执行完毕。");