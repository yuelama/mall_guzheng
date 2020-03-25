let apps=getApp();
//let app=getApp();
var wxParse = require('../../../wxParse/wxParse.js');
/* import { Cart } from '../cart/cart-model.js';
var cart = new Cart(); */

Page({	
  /**
   * 页面的初始数据
   */
  data: {
	indicatorDots: true,
	autoplay: true,
	interval: 5000,
	duration: 1000, 
  coursedata:[],
	imgUrls:[],   //图片轮播数据
	 payid:'',
	courseid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {	
		 /* var id = options.id;
		this.data.id = id;
		this._loadData(); */
	  let courseId = options.id;
	 //console.log(options)
	  var _self=this;
	    apps.util.request({
	    'url': 'entry/wxapp/coursedetail',
	    header: {
	      'content-type': 'application/json'
	    },	
		data:{
			id:courseId,		
		} ,		 
	    success(res) {	  		
	 //	console.log(res)				
	   _self.setData({
		coursedata:res.data.data.details
	    })													
	    }
				
			})	
							
  },
	

	
	
	//添加收藏页
/* Tocart: function (e ){
		var _self = this;
		var course_id = e.currentTarget.dataset.courseid;
		var userid = wx.getStorageSync('userid');
		if(userid){
			   apps.util.request({
			      'url': 'entry/wxapp/carinfo',
			      header: {
			        'content-type': 'application/json'
			      },	
			   		data:{
			   			id:course_id,
			   			userid:userid
			   		} ,		 
			      success(res) {						
							//console.log(res);	
							 _self.setData({
							
							}) 														
							if(res.data.data.status==0){
									 
								wx.switchTab({//接着跳到购物车页		 
								  url: "../cart/cart"
								}); 
							_self.joinT();
							 }else{							
								  wx.showToast({
								 	title:'添加课程失败'
								 })
							 } 			   										
			      }		   				
			 	})	
		}else{
			wx.reLaunch({
				url:'mall_guzheng/pages/index/index',
			})
		}
	}, 
	
 	joinT:function(){
	    wx.showModal({
	      title: '恭喜',
	      content: '成功添加课程',
	    })
	  }, */
	
	/* 加入购物车 */	 
	/* Tocart:function(event){		
		var course_id = event.currentTarget.dataset.courseid;
		var userid = wx.getStorageSync('userid');
		 var course_arr = wx.getStorageSync('course_arr');	 	 
		  if (course_arr && userid) {
      course_arr[course_id] = course_id;
      wx.setStorageSync('course_arr',course_arr);
		//	var arr = wx.getStorageSync('cart') || [];		
		   //console.log(course_arr)				
    } else {
      var course_arr = {};//开空对象		
      course_arr[course_id] = course_id;//key和value都是courseId		
			wx.setStorageSync('course_arr', course_arr);
    }		
		 wx.switchTab({//接着跳到购物车页		 
      url: "../cart/cart"
    }); 						
	}, 
	 	  
	 */

	
Tocart:function(event){
	 this.setData({
	          toastHidden:false
	      });
	for (var i in this.data.coursedata){
			  if(this.data.coursedata[i].id == event.currentTarget.dataset.courseid){
					  //console.log("添加课程成功")
					// this.joinT(); 
					 this.joinT();
					/* */
					
					
			   this.data.coursedata[i].course_stock = 1;
				var arr = wx.getStorageSync('cart') || [];
				 if(arr.length>0){
	          // 遍历购物车数组				
	              for(var j in arr){
									 // 判断购物车内的item的id，和事件传递过来的id，是否相							
	                  if(arr[j].id == event.currentTarget.dataset.courseid){
											
											
											
											 // 相等的话，给count+1（即再次添加入购物车，数量+1）
	                      arr[j].course_stock = arr[j].course_stock + 1;
												/* wx.switchTab({//接着跳到购物车页		 
												 	url: "../cart/cart",
												   });	 */																																																					
																							
						try {
	                          wx.setStorageSync('cart', arr)
	                      } catch (e) {
	                          console.log(e)
	                      }
	                      // 返回（在if内使用return，跳出循环节约运算，节约性能）
						 return;																					 
						}   															 
				     }
						
						 
						 
							   // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组
	              arr.push(this.data.coursedata[i]);																		 
		     	  }
			      
	          // 购物车没有数据，把item项pu  sh放入当前数据（第一次存放时）
	          else{
	              arr.push(this.data.coursedata[i]);
	          }
	          // 最后，把购物车数据，存放入缓存
	          try {
	              wx.setStorageSync('cart', arr)
	              // 返回（在if内使用return，跳出循环节约运算，节约性能）
	              return;
	          } catch (e) {
	              console.log(e)
								
	          }
										
						
		   }
	  }	
			
},


joinF:function(){
    wx.showModal({
      title: '提示',
      content: '请勿重复添加课程',
	
    })
  },	
	
		joinT:function(){
	  wx.showModal({
	    title: '提示',
	    content: '是否添加课程',
		  url:'../cart/cart',
	  })
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

//跳转到订单页
/* 	Tobuy: function (event){
		// console.log(event.currentTarget.dataset.courseid)	
		console.log(event);
	   wx.navigateTo({		   
	  			url:'/mall_guzheng/pages/pay/pay?id='+event.currentTarget.dataset.courseid,
	  }) 
		
	},	 */
	
	
Tobuy: function (event){			
		//console.log(event);
		var app = getApp();
		var _self=this;	
		var userid = wx.getStorageSync('userid');		
		if(userid){
			for (var i in this.data.coursedata){
			  if(this.data.coursedata[i].id == event.currentTarget.dataset.courseid){
					var price =  this.data.coursedata[i].course_price; 
					var title =   this.data.coursedata[i].course_name;
					//console.log(title)
				app.util.request({
				 'url': 'entry/wxapp/pay', //调用wxapp.php中的doPagePay方法获取支付参数
				 data: {
				    price:price,
					title:title					   
				 },
				 'cachetime': '0',
				 success(res) {		
				     if (res.data && res.data.data && !res.data.errno) {
				         //发起支付
				         wx.requestPayment({
				             'timeStamp': res.data.data.timeStamp,
				             'nonceStr': res.data.data.nonceStr,
				             'package': res.data.data.package,
				             'signType': 'MD5',
				             'paySign': res.data.data.paySign,
				             'success': function (res) {
				                 //执行支付成功提示
									console.log('支付完成')
									//console.log(res)																	
				             },
							
							complete: function () {
							  console.log("完成")
							wx.switchTab({//接着跳到购物车页		 
							  url: "../index/index",
							}); 
							},
							
							
							
				             'fail': function (res) {
				               //  backApp()
				             },
							 
							 
							/* success: function () {
							  console.log("支付成功");
							},
							complete: function () {
							  console.log("完成")
							  app.globalData.joinOrder.push(app.globalData.iconCar[0])
							  console.log(app.globalData.joinOrder)
							}, */
													 
				         })
				     }
				 },
				 fail(res) {
				     wx.showModal({
				         title: '系统提示',
				         content: res.data.message ? res.data.message : '错误',
				         showCancel: false,
				         success: function (res) {
				             if (res.confirm) {
				               // backApp()
							   
				             }
				         }
				     })
				 }
		    })	
					
					
		}		
			
	}
		
}
		
		
		
		
		
		
},
	

createorder:function( ){
	let payid = this.data.coursedata.id;
	var _self = this;
	 console.log(payid)
	  var _self=this;  	 	 
	 		 apps.util.request({
	 			  'url': 'entry/wxapp/createorder',
	 header: {
	 			    'content-type': 'application/json'
	 			  },		
	 					data:{
	 						id:payid
	 					      } ,					 
	         success(res) {
	 			//console.log(res);
	        }								        
	      })  	 		
	   _self.Tobuy();
		
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