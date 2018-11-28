// miniprogram/pages/mall_navigation/mall_navigation.js
import api from '../../common/api.js'
const app = getApp()
Page({
  data: {
    img_url: null,
    imgUrl: null,
    floor: [],
    map: null,
    num: null,
    hidden: false
  },


  onLoad: function(options) {
    this.setData({
      imgUrl: app.imgUrl,
      hidden: true
    })
    
    this.loadFloor()
  },

  loadFloor(){
    wx.showLoading({
      title: '加载中..',
    })
    api.request('mallfloor', 'GET')
    .then(res=>{
      this.setData({
        floor: res,
        img_url: res[0].floor_img_url,
        num: res[0].floor_name,
        hidden: false
      })
      wx.hideLoading()
    })
  },

  floorTap(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      img_url: item.floor_img_url,
      num: item.floor_name
    })
  },

  preimage(e){
    let img = e.currentTarget.dataset.img
    wx.previewImage({
      urls: [img],
    })
  }
})