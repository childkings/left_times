// pages/shoping/shoping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: null,
    shopList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    state: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      query: options
    })
    wx.setNavigationBarTitle({
      title: this.data.query.name
    })
    this.getList()
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
    if(this.data.state) {
      this.setData({
        shopList: [],
        page: 1,
        total: 0
      })
      this.getList(function(){
        wx.stopPullDownRefresh()
      });
    } else {
      return false
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.page * this.data.pageSize >= this.data.total || !this.data.state) {
      return false
    } else {
      this.setData({
        page: this.data.page + 1,
        state: false
      })
      this.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getList(cb) {
    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pagaSize
      },
      success: (res)=>{
        this.setData({
          shopList: [...this.data.shopList,...res.data],
          total: res.header['X-Total-Count'] - 0
        })
      },
      complete: ()=>{
        wx.hideLoading()
        this.setData({
          state: true
        })
        cb && cb()
      }
    })
  }
})