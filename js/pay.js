
//商品列表
var oGoodBox = $(".goodsBox");
var goods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};	
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
								'<span>'+goods[goodName].num+'</span>个'+
							'</div>'+
							'<div class="good_price">'+
								'总计:￥<span>'+goods[goodName].num*goods[goodName].price+'</span>'+
							'</div>'+						
						'</div>'				
				oGoodBox.append(oGoodDeal);				
			}
	$(".del_good").click(function(){
		var goods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		var num = 0 ;
		for(var goodName in goods){
			num++;
		}
		if(num == 1){
			oGoodBox.html(emptyStr);
		}else{
			$(this).parent().remove();
			var goodName = $(this).siblings(".good_name").find("p").html();
			delete goods[goodName];
			$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
		}
	})
	$(".del_all").click(function(){
		oGoodBox.html(emptyStr);
		$.cookie("shopCar","",{expires:-1,path:"/"});
	})
	
	//动态加载购物车数据
	var allPrice = 0;
	$(".good_price span").each(function(){
		allPrice += Number($(this).html());
	})
	$("#total_amount").html(allPrice+".00");
	$(".need_pay").html(allPrice+parseFloat($(".freight").html())+parseFloat($(".fvr_freight").html())+".00")
	
	
	//支付点击事件
	var aPayList = $(".paycfm_waybox dd");
	aPayList.click(function(){
		$(this).addClass("current").siblings().removeClass("current").parent().siblings().find("dd").removeClass("current");
	})

	//确定订单
	$(".makeSure_btn").click(function(){
		alert("支付成功");
		$.cookie("shopCar","",{expires:-1,path:"/"})
		location.href = "index.html";
	})


	//保存地址事件
	$("#save_address").click(function(){
		if($(".user_name").val()&($("#s_province").val()||$(".paycfm_peraddress").val())&$(".paycfm_perpostcode").val()&$(".paycfm_perphone").val()&$(".paycfm_peremail").val()){
		var oDiv = '<div class="user_address">'+
						'<p class="user_name">'+$(".user_name").val()+'</p>'+
						'<p class="user_place">'+$("#s_province").val()+$("#s_city").val()+$("#s_county").val()+$(".paycfm_peraddress").val()+'</p>'+
						'<p class="user_postcode">'+$(".paycfm_perpostcode").val()+'</p>'+
						'<p class="user_mobile">'+$(".paycfm_perphone").val()+'</p>'+
						'<p class="user_mail">'+$(".paycfm_peremail").val()+'</p>'+
						'<button class="del_address">删除这条地址</button>'+
					'</div>';
			$(".user_addressbox").append(oDiv);
		}
		
	})
