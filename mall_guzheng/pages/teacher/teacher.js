//teacher.js
//获取应用实例
let apps=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		teadatas:[],
    teacherdata:[],
		teachid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
    
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
     var _self=this;
      apps.util.request({
      'url': 'entry/wxapp/teachers',
      header: {
        'content-type': 'application/json'
      },
    
      success(res) {
    		    var teadatas = [];
    		   				 for (var i = 0; i < 3; i++) {					
    		   				   teadatas[i] = res.data.data.teadata[i]
    		   					
    		   				 } 
    		   		//console.log(res)		
    		   _self.setData({
    		   					 teacherdata:teadatas   		   					 
    		   					})			
    		 }    		
      })    
    
  },


Totechlist: function (event){	
		//	console.log(event)
	  wx.navigateTo({
	  	url:'/mall_guzheng/pages/teacherlist/teacherlist?id='+event.currentTarget.dataset.teachid,
	  }) 
		
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})