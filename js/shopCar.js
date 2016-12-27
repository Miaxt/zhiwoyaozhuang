//购物车功能
	var oGoodBox = $(".shopCar_box");
	var goods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
	var emptyStr = '<div class="shopCar_empty">'+
						'<div class="shopCar_empty_img">'+
						'<img src="../images/common/empty.png" />'+
						'</div>'+
						'<div class="shopCar_empty_tip">'+
							'<p class="shopCar_empty_tip1">您的购物车中没有商品，请先去挑选心爱的商品吧！</p>'+
							'<p class="shopCar_empty_tip2">'+
								'<span>您可以</span>'+
								'<a href="index.html">返回首页</a>'+
								'<span>挑选喜欢的商品 </span>'+
							'</p>'+
						'</div>'+
					'</div>';
		if($.isEmptyObject(goods)){			
			oGoodBox.html(emptyStr)
		}else{
			oGoodBox.html('<div class="all_operate">'
							+'<button class="del_all">清空购物车</button>'
							+'<button class="buy_all">支付</button>'
							+'</div>')
			for(var goodName in goods){
				var oGoodDeal = '<div class="good_detail">'+
							'<div class="good_img"'+
								'<a href="##"><img src="'+goods[goodName].src+'"></a>'+
							'</div>'+
							'<div class="good_name">'+
								'<a href="##">'+
								'<p>'+goodName+'</p>'+
								'<p class="single_price">单价：￥<span>'+goods[goodName].price+'</span></p>'+
								'</a>'+
							'</div>'+
							'<div class="good_num">'+
								'<button class="redu_num">-</button><input type="text" class="goodsNum" value="'+goods[goodName].num+'"/><button class="add_num">+</button>'+
							'</div>'+
							'<div class="good_price">'+
								'总计:￥<span>'+goods[goodName].num*goods[goodName].price+'</span>'+
							'</div>'+						
							'<button class="del_good">删除</button>'+
						'</div>'				
				$(".all_operate").before(oGoodDeal);				
			}
		}
//	商品数量左右按钮加减商品数量
	$(".redu_num").click(function(){
		var nowNum = Number($(this).siblings(".goodsNum").val());
		var goods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		var goodName = $(this).parent().siblings(".good_name").find("p").html();
		var _this = $(this);
		if(nowNum == 1){
			_confirm("是否删除本商品",
				function(){
					delete goods[goodName];
					$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
					if($.isEmptyObject(goods)){
						oGoodBox.html(emptyStr);
					}else{
						_this.parent().parent().remove();
					}
				},
				function(){
					$(this).parent().hide()
				}
			)
//			if(confirm("是否删除本商品")){							
//				delete goods[goodName];
//				$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
//				if($.isEmptyObject(goods)){
//					oGoodBox.html(emptyStr);
//				}else{
//					$(this).parent().parent().remove();
//				}
//			}else{
//				return false;
//			}
		}else{
			goods[goodName].num--;
			$(this).siblings(".goodsNum").val(goods[goodName].num);
			$(this).parent().siblings(".good_price").find("span").html(goods[goodName].num*goods[goodName].price);
			$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
		}		
	}) 
	$(".add_num").click(function(){
		var goods =$.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		var goodName = $(this).parent().siblings(".good_name").find("p").html();
		goods[goodName].num++;
		$(this).siblings(".goodsNum").val(goods[goodName].num);
		$(this).parent().siblings(".good_price").find("span").html(goods[goodName].num*goods[goodName].price);
		$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
	})
	
	//手动输入商品数量
	if($(".goodsNum")[0]){
		$(".goodsNum").each(function(){
			$(this)[0].onkeyup = onafterpaste = function(){
			if(this.value.length==1){
				this.value=this.value.replace(/[^1-9]/g,'')
				}else{
					this.value=this.value.replace(/\D/g,'')
					}
			}
		})	
	}
	$(".goodsNum").blur(function(){
		var goods =$.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		var goodName = $(this).parent().siblings(".good_name").find("p").html();
		if(!$(this).val()){
			$(this).val(1);
			$(this).parent().siblings(".good_price").find("span").html(goods[goodName].price);
		}else{		
			goods[goodName].num = $(this).val();
			$(this).parent().siblings(".good_price").find("span").html(goods[goodName].num*goods[goodName].price);
			$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});			
		}
	})
		
	
	
	$(".del_good").click(function(){
		var goods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		var num = 0 ;
		for(var goodName in goods){
			num++;
		}
		if(num == 1){
			oGoodBox.html(emptyStr);
			$.cookie("shopCar","",{expires:-1,path:"/"});
		}else{
			$(this).parent().remove();
			var goodName = $(this).siblings(".good_name").find("p").html();
			delete goods[goodName];
			$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
		}
	})
		
	$(".del_all").click(function(){
		_confirm("是否删除本商品",
				function(){
					oGoodBox.html(emptyStr);
					$.cookie("shopCar","",{expires:-1,path:"/"});
				},
				function(){
					$(this).parent().hide();
				}		
			)
	})
	$(".buy_all").click(function(){
		if($.cookie("login")){
			location.href = "pay.html";
		}else{
			_error("请先登录")
			$(".zeromodal-btn").click(function(){
				location.href = "login.html";
			})
			$(".zeromodal-close").click(function(){
				location.href = "login.html";
			})
			$.cookie("goToPay","pay.html",{expires:1,path:"/"});
		}
	})

//今日
$.ajax({
		type:"get",
		url:"../data/index/recom.json",
		async:true,
		success:function(data){
			var aRecomList = $(".r_main li");
			aRecomList.each(function(){
				$(this).html("	<div class='r_main_top'><a href='##'><img src="+data.proImg[$(this).index()]+"/></a></div><div class='r_main_bottom'><p class='pro_name'><a href='##'>"+data.proName[$(this).index()]+"</a></p><div class='pro_buy'><p class='buy_btn'><a href='##'>加入购物车</a></p><p class='now_price'><i>￥</i><span>"+data.proPrice[$(this).index()]+"</span><del>￥"+data.priceDel[$(this).index()]+"</del></p></div>")
			})
		}
	});

//今日轮播图
	recomPlay($(".r_list"));