// miniprogram/pages/block/block.js
import api from '../../common/api.js'
import Toast from '../../dist/vant-weapp/toast/toast'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    result: '',
    user: '',
    userNumber: '',
    linkage: null,
    show: false,
    checkUsers: null,
    avatar: null,
    nickName: null,
    role: null,
    recStartTime: 0,
    showCode: false,
    qrcode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    // 获取本地缓存
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      let user = JSON.parse(userInfo)
      this.setData({
        avatar: user.avatarUrl,
        nickName: user.nickName
      })
    }

    // 获取权限信息
    this.getRoleInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    api.checkToken()
    this.setData({
      user: null,
      userNumber: null
    })
  },

  getUserInfo(e) {
    app.loginAPI()
      .then(res => {
        // 获取权限信息
        this.getRoleInfo()
      })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      avatar: e.detail.userInfo.avatarUrl,
      nickName: e.detail.userInfo.nickName
    })
  },

  /**
   * 提交
   */
  submit(e) {
    wx.showModal({
      title: '确认',
      content: '确认提交吗',
      success(mod) {
        // 点击了确认
        if (mod.confirm) {
          wx.showLoading({
            title: '正在提交单据..',
            mask: true
          })

          let url = app.url
          let formList = e.detail.value
          let js = JSON.stringify(formList)
          let token = wx.getStorageSync('token')
          api.oldRequest('sendblocklist', 'POST', {
              jsonstr: js,
              token: token
            })
            .then(res => {
              // 提交成功
              if (res.code == 1) {
                let {
                  qrcode,
                  datetime
                } = res.data

                wx.hideLoading()
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000,
                  mask: true
                })
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../block_qrcode/block_qrcode?qrcode=' + qrcode + '&datetime=' + datetime,
                  })
                }, 2000)
              } else if (res.code == 2) { // 登录过期
                wx.login({
                  success(res) {
                    wx.request({
                      url: url + 'login',
                      method: 'POST',
                      data: {
                        code: res.code
                      },
                      success(result) {
                        let session_3rd = result.data.data
                        wx.setStorageSync('token', session_3rd)

                        wx.showModal({
                          title: '提示',
                          content: '由于长时间未使用小程序，请重新提交'
                        })
                      }
                    })
                  }
                })
              } else if (res.code == 3) {
                wx.hideLoading()
                // 遍历对象
                for (let i in res.data) {
                  Toast(res.data[i][0])
                  break
                }
              }
            })
            .catch(err => {
              wx.hideLoading()
              wx.showModal({
                title: '错误',
                content: '服务出错了，请稍后再试或者联系管理员'
              })
            })
        } else if (mod.cancel) {
          // 点击了取消

        }
      }
    })
  },

  myRecommendation() {
    wx.navigateTo({
      url: '../block_myQrcode/block_myQrcode',
    })
  },
  /**
   * 扫码
   */
  scanCode() {
    let that = this
    wx.scanCode({
      scanType: ['qrCode'],
      success(res) {
        if (res.errMsg == 'scanCode:ok') {
          let code = res.result
          let token = wx.getStorageSync('token')
          that.getLinkageInfo(code, token)
        }
      }
    })
  },

  /**
   * 扫码后的请求
   */
  getLinkageInfo(code, token) {
    wx.showLoading({
      title: '查询中..',
    })
    api.oldRequest('scancodelinkage', 'POST', {
        code,
        token
      })
      .then(res => {
        wx.hideLoading()
        if (res.code == 1) {
          this.setData({
            linkage: res.data,
            show: true
          })
        } else if (res.code == 2) {
          api.login().then(() => {
            this.getLinkageInfo(code, wx.getStorageSync('token'))
          })
        } else if (res.code == 3) {
          Toast.fail('二维码不存在或过期（7天内有效）')
        } else if (res.code == 4) {
          Toast.fail(res.msg)
        } else if (res.code == 5) {
          wx.navigateTo({
            url: '../block_info/block_info?data=' + JSON.stringify(res.data) + '&data2=' + JSON.stringify(res.data2),
          })
        }
      })
  },

  /**
   * 关闭对话框
   */
  onClose(event) {
    if (event.detail === 'confirm') {
      this.setData({
        show: false
      });
    }
  },

  /**
   * 获取权限信息
   */
  getRoleInfo() {
    api.request('roleinfo', 'POST', {
        token: wx.getStorageSync('token')
      })
      .then(res => {
        this.setData({
          role: res
        })
        wx.setStorage({
          key: 'role',
          data: JSON.stringify(res),
        })
      })
  },

  /**
   * 权限申请
   */
  roleTap() {
    wx.navigateTo({
      url: '../block_role/block_role',
    })
  },

  /**
   * 消息权限确认
   */
  applyTap() {
    wx.showLoading({
      title: '权限确认中..',
    })
    api.oldRequest('checkapplyrole', 'POST', {
        token: wx.getStorageSync('token')
      })
      .then(res => {
        if (res.code == 1) {
          wx.navigateTo({
            url: '../block_apply/block_apply',
          })
        } else if (res.code == 2) {
          app.loginAPI()
            .then(() => {
              this.applyTap()
              wx.showLoading({
                title: '登录过期，正在重新登录..',
              })
            })
        } else {
          Toast('当前用户没有权限进入')
        }
        wx.hideLoading()
      })
  },

  followTap() {
    wx.showLoading({
      title: '权限确认中..',
    })
    api.oldRequest('checkfollowrole', 'POST', {
        token: wx.getStorageSync('token')
      })
      .then(res => {
        if (res.code == 1) {
          wx.navigateTo({
            url: '../block_follow/block_follow',
          })
        } else if (res.code == 2) {
          app.loginAPI()
            .then(() => {
              this.followTap()
              wx.showLoading({
                title: '登录过期，正在重新登录..',
              })
            })
        } else {
          Toast('当前用户没有权限进入')
        }
        wx.hideLoading()
      })
  },

  /**
   * 长按事件
   */
  longpress(e) { },

  /**
   * 长按事件改造
   */
  startTap(e) {
    this.setData({
      recStartTime: e.timeStamp
    })
  },

  /**
   * 长按事件改造
   */
  endTap(e) {
    let differ = e.timeStamp - this.data.recStartTime
    if (differ > 1500) {
      this.setData({
        showCode: true
      })
    }
  },

  codeOnClose(event){
    if (event.detail === 'confirm') {
      let token = wx.getStorageSync('token')
      this.getLinkageInfo(this.data.qrcode, token)
      //异步关闭弹窗
      setTimeout(() => {
        this.setData({
          showCode: false
        });
      }, 1000);
    } else {
      this.setData({
        showCode: false
      });
    }
  },

  /**
   * 获取通行码
   */
  codeOnChange(e) {
    this.setData({
      qrcode: e.detail
    })
  },
})