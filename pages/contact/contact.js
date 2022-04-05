// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList: [],
    state: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getColor()
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
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    this.getColor()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getColor() {
    if(this.data.state) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.setData({
        state: false
      })
      wx.request({
        url: 'https://www.escook.cn/api/color',
        method: 'GET',
        success: ({data: res}) => {
          this.setData({
            colorList: [...this.data.colorList,...res.data]
          })
        },
        complete: ()=>{
          this.setData({
            state: true
          })
          wx.hideLoading()
        }
      })
    } else {
      return false
    }
  }
})