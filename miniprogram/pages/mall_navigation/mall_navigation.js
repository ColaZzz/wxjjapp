// miniprogram/pages/mall_navigation/mall_navigation.js
const SimpleMap = require("../../plug/simplemap/simplemap").SimpleMap // SimpleMap 核心类
const Layer = require("../../plug/simplemap/layers/Layer") // 图层模块包
const Widget = require("../../plug/simplemap/widgets/Widget") // UI 部件模块包

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541650972918&di=8120ef549295eea8979ec946a831c569&imgtype=0&src=http%3A%2F%2Fimgbdb3.bendibao.com%2Fxabdb%2F20155%2F26%2F2015526162921348.jpg',
    x: 0,
    y: 0,
    scale: 2,
  },

  onMapReady: function (res) {
    console.log(res)
    const map = res.map
    const TILE_URL = "https://www.dennic365.com/static/cqcet/"
    // 配置瓦片图图层
    const mapLayer = new Layer.TileMapLayer(map, 1000, 1000)
    // mapLayer.addTileLevel(1.4, TILE_URL + "cqcet-s-{column}-{row}.jpg", 1001, 1438, 500, 500)
    // mapLayer.addTileLevel(2.4, TILE_URL + "cqcet-m-{column}-{row}.jpg", 2669, 3835, 800, 800)
    // mapLayer.addTileLevel(2.8, TILE_URL + "cqcet-l-{column}-{row}.jpg", 5000, 7185, 800, 800)
    mapLayer.addTileLevel(1, "../../public/4/tile-{column}_{row}.png", 1024, 1024, 256, 256)
    // mapLayer.addTileLevel(2, "../../public/5/tile-{column}_{row}.png", 1024, 1024, 256, 256)
    // 配置单一图层
    // const mapLayer = new Layer.MapLayer(map,this.data.img, 1000, 1000)
    // 将图层设为底图
    map.setMap(mapLayer)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const mapOptions = {
      minZoom: 0.25, // 最小缩放倍数
      maxZoom: 3, // 最大缩放倍数
      slide: true // 开启惯性滑动
    }
    const map = new SimpleMap(this, "demo_map", mapOptions)
    // 设置地图 canvas 准备完毕的回调
    map.setOnReadyCallback(this.onMapReady)

    this.map = map
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 在页面显示时调用show方法，开始绘制地图。
    this.map.show()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 在页面显示时调用hide方法，暂停绘制地图以节省资源。
    this.map.hide()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 在页面被回收时调用stop方法，彻底结束掉地图绘制。
    this.map.stop()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  navigationTap(e){
    let url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url],
    })
  }
})