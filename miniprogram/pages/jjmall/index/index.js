// miniprogram/pages/jjmall/index/index.js
import api from '../../../common/api.js'
import fmt from '../../../common/format.js'
const app = getApp()
const icon = '/public/icon/mall-icon.png'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'rgba(255, 255, 255, .5)',
    topShopes: [],
    swiperes: [],
    floor: [],
    business: [],
    imgUrl: '',
    position: 'bottomRight',
    theme: 'calm',
    action: '/public/icon/floor-business.png',
    buttons: [],
    spinning: false,
    floorList: [],
    businessList: [],
    container: false,
    mallTab: true,
    articleTab: false,
    vipTab: false,
    swiperList: [],
    activeList: [],
    newsList: [],
    topList: [],
    mode: 'aspectFill',
    lazyLoad: 'true',
    articleHidden: false,
    active: 0,
    current_page: 1,
    last_page: 0,
    tip: '点击加载更多',
    loadMore: false,
    business_id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中..',
    })
    this.setData({
      container: true,
      imgUrl: app.imgUrl
    })
    // 主力店铺
    // let topshopes = api.request('malltopshopes', 'GET')
    let topshopes = api.request('mallbusinesses', 'GET')
    // 轮播图
    let swiperes = api.request('mallswiperes', 'GET')
    // 楼层
    let floor = api.request('mallfloor', 'GET')
    // 业态
    let business = api.request('mallbusinesses', 'GET')

    let businessList
    Promise.all([topshopes, swiperes, floor, business]).then(res => {
      // 为楼层数组添加一个hidden属性
      for (let i = 0; i < res[3].length; i++) {
        res[3][i].hidden = true
      }
      res[3][0].hidden = false
      businessList = res[3]
      this.setData({
        topShopes: res[0],
        swiperes: res[1],
        floor: res[2],
        business: res[3],
        business_id: businessList[0].id
      })
    }).then(() => {
      // 默认业态信息
      api.request('mallshops', 'GET', {
          floor: '',
          business: businessList[0].id
        })
        .then(res => {
          this.setData({
            businessList: res.data,
            container: false,
            current_page: res.current_page,
            last_page: res.last_page
          })
        })
      // 初始化浮动按钮
      let buttons = []
      let floorButton = this.data.floor
      for (let i = 0; i < floorButton.length; i++) {
        let buttonRow = {
          label: '',
          icon: ''
        }
        buttonRow.label = floorButton[i].floor_name
        buttonRow.icon = icon
        buttons.push(buttonRow)
      }
      this.setData({
        buttons: buttons
      })

      wx.hideLoading()
    })
  },

  onReady() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.current_page == this.data.last_page) {
      this.setData({
        tip: '到底啦'
      })
      return
    }
    let page = this.data.current_page + 1
    this.setData({
      loadMore: true,
      current_page: page
    })

    this.getData({
      page: this.data.current_page,
      business: this.data.business_id
    })
  },

  /**
   * 点击浮动按钮
   */
  onClick(e) {
    let label = e.detail.value.label
    let floor = this.data.floor
    let row = floor.find(row => {
      return row.floor_name == label
    })
    let id = row.id
    wx.navigateTo({
      url: '../floor/floor?id=' + id,
    })
  },

  /**
   * 楼层变换功能
   */
  businessTap(e) {
    this.setData({
      spinning: true,
      tip: '点击加载更多'
    })
    let business = this.data.business
    let item = e.currentTarget.dataset.item
    for (let i = 0; i < business.length; i++) {
      business[i].hidden = (business[i].id == item.id) ? false : true
    }
    this.setData({
      business: business
    })
    api.request('mallshops', 'GET', {
        business: item.id
      })
      .then(res => {
        this.setData({
          businessList: res.data,
          spinning: false,
          current_page: res.current_page,
          last_page: res.last_page,
          business_id: item.id
        })
      })
  },

  tabChange(e) {
    if (e.detail.key == 'mall') {
      this.setData({
        mallTab: true,
        articleTab: false,
        vipTab: false
      })
    } else if (e.detail.key == 'article') {
      this.setData({
        mallTab: false,
        articleTab: true,
        vipTab: false
      })
      if (!this.data.swiperList.length) {
        this.loadInfo()
      }
    } else if (e.detail.key == 'vip') {
      this.setData({
        mallTab: false,
        articleTab: false,
        vipTab: true
      })
    }
  },

  /**
   * 店铺
   */
  topTap(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../shop/shop?id=' + item.id,
    })
  },

  /**
   * 资讯
   */
  /**
   * 第一二个菜单
   */
  articleTap(e) {
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/mall_articleList/mall_articleList?type=' + type,
    })
  },

  /**
   * 店铺导航
   */
  navigationTap() {
    wx.navigateTo({
      url: '/pages/mall_navigation/mall_navigation',
    })
  },

  /**
   * 资讯初始化
   */
  loadInfo() {
    this.setData({
      articleHidden: true
    })
    wx.showLoading({
      title: '加载中',
    })

    // 最新活动栏的加载
    let ac = api.request('articles', 'GET', {
      time: 'desc'
    })
    // 最热资讯栏的加载
    let top = api.request('articles', 'GET', {
      rank: 'desc'
    })
    // 轮播图的加载
    let swiper = api.request('mallswiper', 'GET')

    Promise.all([ac, swiper, top]).then(res => {
      let active = res[0].data
      for (let i = 0; i < active.length; i++) {
        active[i].created = fmt.getMMdd(active[i].created_at)
      }

      let top = res[2].data
      for (let i = 0; i < top.length; i++) {
        top[i].created = fmt.getyyyyMMdd(top[i].created_at)
      }

      this.setData({
        activeList: active,
        swiperList: res[1],
        topList: top,
        articleHidden: false
      })
      wx.hideLoading()
    })
  },

  /**
   *文章点击 
   */
  cellTap(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/mall_article/mall_article?id=' + id,
    })
  },

  returnHome() {
    wx.switchTab({
      url: '/pages/pageIndex/pageIndex',
    })
  },

  investTap() {
    wx.navigateTo({
      url: '../investment/investment',
    })
  },

  // event.detail 的值为当前选中项的索引
  onChange(e) {
    // console.log(e.detail)
    if (e.detail == 0) {
      this.setData({
        mallTab: true,
        articleTab: false,
        vipTab: false
      })
    } else if (e.detail == 1) {
      this.setData({
        mallTab: false,
        articleTab: true,
        vipTab: false
      })
      if (!this.data.swiperList.length) {
        this.loadInfo()
      }
    }
  },

  // 分页拉取数据
  getData(params) {
    this.setData({
      loadMore: true
    })

    api.request('mallshops', 'GET', params).then(res => {
      let listData = this.data.businessList
      for (let i = 0; i < res.data.length; i++) {
        listData.push(res.data[i])
      }

      this.setData({
        businessList: listData,
        loadMore: false,
        current_page: res.current_page,
        last_page: res.last_page
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  }
})