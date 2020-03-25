let apps=getApp();
var wxParse = require('../../../wxParse/wxParse.js');

Page({	
  /**
   * 页面的初始数据
   */
  data: {
      payType: 1,
	  payid:'',
      orderInfo: {},
	  paydata:[],
	  
  },






//选择支付方式
/* function:  changePayType(type) {
				this.payType = type;
			}, */
			//确认支付
		/* 	confirm: async function() {
				uni.redirectTo({
					url: '/pages/money/paySuccess'
				})
			
			}, */
			
			
/* 支付过程:
  1.获取待支付商品ID;
  2.通过ID 得到对应商品订单名称 ,价格;
  3.把相应的信息传到后端 pay 进行处理; */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	   let payid = options.id;
	 // console.log(payid)
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
	  			console.log(res);
	         }								        
	       })  
	  		
	    _self.confirm();
  },
  
  
  
/* getorderid:function(){
	 var outTradeNo="";  //订单号
     for(var i=0;i<6;i++) //6位随机数，用以加在时间戳后面。
     {
        outTradeNo += Math.floor(Math.random()*10);
      }
         outTradeNo = new Date().getTime() + outTradeNo;  //时间戳，
		 return outTradeNo
 }, */
  
  
confirm: function (){
	//console.log(e)
	
	var app = getApp();
	var _self=this;
	// let payId = event.id;
	 //console.log(e)
	app.util.request({
    'url': 'entry/wxapp/pay', //调用wxapp.php中的doPagePay方法获取支付参数
    data: {
       // orderid: _self.getorderid(),
	   
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
					
					
                },
                'fail': function (res) {
                  //  backApp()
                }
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

    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
	
  }
})