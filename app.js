//app.js
import util from 'we7/resource/js/util.js';
let apps=getApp();
let app=getApp();
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
		//1.先从缓存里面找一下是否
		var useropenid = wx.getStorageSync('userid');
		if(useropenid){
			
		}else{
			util.getUserInfo(function (userInfo){
				util.request({
							  'url': 'entry/wxapp/userid',
				header: {
							    'content-type': 'application/json'
							  },		
													 
				        success(res) {
										//console.log(res)
										if(res.data.data.status==0){
											wx.setStorageSync('userid',res.data.data.userid)
										}else{
											wx.reLaunch({
												url:'/mall_guzheng/pages/login/login',
											})
										}
												  
				       }								        
				     })			
				
			   }
			)
		}
		
  },
	

	
  onShow: function () {
	 
  },
  
  onHide: function () {
  },
  onError: function (msg) {
    console.log(msg)
  },
  util: util,
  globalData: {
    userInfo: null
	
	
	
  },
  siteInfo: require('siteinfo.js')
});