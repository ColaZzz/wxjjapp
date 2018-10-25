// miniprogram/pages/map/map.js
import api from '../../common/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeMarkers: [], // 存储的
    markers: [],      // 展示的
    active: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let iconPath = '../../public/icon/map2.png'
    wx.showLoading({
      title: '加载中'
    })

    api.request('map', 'GET').then(res => {
      let arr = new Array()
      for (let i = 0; i < res.length; i++) {
        let row = {
          id: i,
          uid: res[i].id,
          title: res[i].title,
          latitude: res[i].latitude,
          longitude: res[i].longitude,
          img_url: res[i].img_url,
          flag: res[i].flag,
          iconPath: iconPath,
          width: 30,
          height: 30
        }
        arr.push(row)
      }
      this.setData({
        storeMarkers: arr,
        markers: arr
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // 标记点击
  mapTap(event) {
    let id = event.markerId
    let arr = this.data.markers

    let row = arr.find(array => (array.id == id))
    console.log(row)
  },

  // 类型筛选
  tabsChanged(event){
    let markers = this.data.storeMarkers
    let flag = event.detail.title
    let list
    if(flag == '商业'){
      list = markers.filter(item => item.flag == 0)
    } else if (flag == '住宅'){
      list = markers.filter(item => item.flag == 1)
    } else if (flag == '全部') {
      list = markers
    }
    this.setData({
      markers: list
    })
  }
})