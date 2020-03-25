// pages/cart/cart.js
let apps=getApp();
var carts = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
	 /* cartlist:[], */	  
	      iscart: false,
        carts: [], //数据
        //count: 1,   //商品数量默认是1
        total: 0,    //总金额
		
        goodsCount: 0 //数量   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
		//this.onShow();
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
		 var _self = this;
        // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
        var arr = wx.getStorageSync('cart') || [];		
			//console.log(arr)
        // 有数据的话，就遍历数据，计算总金额 和 总数量
        if (arr.length > 0) {
            for (var i in arr) {
               _self.data.total += (arr[i].course_price) * (arr[i].course_stock);  //获取购物车商品总价格
				
                _self.data.goodsCount += (arr[i].course_stock);
				
            } 				 																																																																		
            // 更新数据
			var totals = _self.data.total;
			  _self.data.total = parseFloat(totals.toFixed(2));

            this.setData({
                iscart: true,
                carts: arr,
                total:  _self.data.total,
              goodsCount: _self.data.goodsCount ,	  		  
            });
        }
 },
 
/* 购物车结算 */
   wxpay:function(e){
	  // console.log(this.data.carts);
      var _self = this;
	  	var app = getApp();
	  var title = '总计';
	  var price = this.data.total;
      var icon = wx.getStorageSync('cart');
	  //console.log(icon)
	  carts = this.data.carts;
	 var  total = this.data.total;
	 var goodsCount = this.data.goodsCount;
	    wx.showModal({
	     title: '提示',
	     content: '是否进行微信支付？全部结算金额为：' + price+'元',
	     success: function (res) {
	       if (res.confirm) {
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
							     console.log('支付成功')			    
								 	 _self.setData({
								 	    iscart: false,
										icon:[],
								 	     carts:[],
										 total:'',
										 goodsCount:''
															   
								 	}); 
									
	            				 wx.switchTab({//接着跳到购物车页		 
	            						url: "../cart/cart",
	            					  }); 															//console.log(res)																	
	                        },
	            								
							  'fail': function (res) {
							  //  backApp()
							},
														 
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
	         })
   }, 
 
 
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 清除数据
		var _self=this;
        _self.setData({
            iscart: false,
            carts: [], //数据
            total: 0,    //总金额
            goodsCount: 0 //数量 
        });
  },
			
	 /* 减数 */
    delCount: function (e) {
		//console.log(e)
		var carts = this.data.carts
		var index = e.target.id.substring(3);
		let num = carts[index].course_stock;
		
		 //console.log(num)		
       if (num<= 1) {		   
            return;
        }
		
       // 商品总数量-1
        this.data.goodsCount -= 1;
		 //console.log(this.data.goodsCount)
        // 总价钱 减去 对应项的价钱单价
        this.data.total -= (this.data.carts[index].course_price);
        // 购物车主体数据对应的项的数量-1  并赋给主体数据对应的项内
        this.data.carts[index].course_stock = -- this.data.carts[index].course_stock;
		
		var totals = this.data.total;
          this.data.total = parseFloat(totals.toFixed(2));
        // 更新data数据对象
		this.setData({
            carts: carts,
            total: this.data.total,
            goodsCount: this.data.goodsCount
        })
        // 主体数据重新赋入缓存内
        try {
            wx.setStorageSync('carts', carts)
        } catch (e) {
            console.log(e)
        }    	 
    },

 /* 加数 */
    addCount: function (e) {
        // 商品总数量+1
        this.data.goodsCount += 1;
		var index = e.target.id.substring(3);
        // 总价钱 加上 对应项的价钱单价
        this.data.total += Number(this.data.carts[index].course_price);
        // 购物车主体数据对应的项的数量+1  并赋给主体数据对应的项内
        this.data.carts[index].course_stock = ++this.data.carts[index].course_stock;
        // 更新data数据对象
		var totals = this.data.total;
		  this.data.total = parseFloat(totals.toFixed(2));
		
        this.setData({
            carts: this.data.carts,
            total: this.data.total,
            goodsCount: this.data.goodsCount
        })
        // 主体数据重新赋入缓存内
        try {
            wx.setStorageSync('carts', this.data.carts)
        } catch (e) {
            console.log(e)
        }
    },	
	

 /* 删除item */
    delGoods: function (e) {
		var index = e.target.id.substring(3);
        // 商品总数量  减去  对应删除项的数量
        this.data.goodsCount = this.data.goodsCount - this.data.carts[index].course_stock;
        // 总价钱  减去  对应删除项的单价*数量
        this.data.total -= this.data.carts[index].course_price * this.data.carts[index].course_stock;
        // 主体数据的数组移除该项
        this.data.carts.splice(index, 1);
        // 更新data数据对象
		
		var totals = this.data.total;   //解决显示小数点位数过多bug
		  this.data.total = parseFloat(totals.toFixed(2));
		
        this.setData({
            carts: this.data.carts,
            total: this.data.total,
            goodsCount: this.data.goodsCount
        })
        // 主体数据重新赋入缓存内
        try {
            wx.setStorageSync('carts', this.data.carts)
        } catch (e) {
            console.log(e)
        }
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