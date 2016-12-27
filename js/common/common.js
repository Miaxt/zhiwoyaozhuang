//动态加载公共内容
function loadHtml(url,id){
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			$("#"+id).html(data)
		}
	})
}

//小知推荐,购物车的今日特卖
	function recomPlay(id){
		var oBox = id;
		var oImgBox = oBox.find(".r_main");
		var oPrev = oBox.find(".r_prev");
		var oNext = oBox.find(".r_next");
		var oImgLength = oImgBox.find("li").outerWidth(true)*4;
		oBox.iNow = 0;
		oBox.moveOver = true;
		oPrev.click(function(){
			if(oBox.moveOver){
				if(oBox.iNow==0){
					oBox.iNow = 4;
				}
				oBox.iNow--;
				tab();
			}
		})
		oNext.click(function(){
			if(oBox.moveOver){
				if(oBox.iNow==3){
					oBox.iNow = -1;
				}
				oBox.iNow++;
				tab();
			}
		})
		function tab(){
			oBox.moveOver = false;
			oImgBox.stop().animate({marginLeft:-oImgLength*oBox.iNow},500,function(){
				oBox.moveOver=true;
			})
		}
	}
	
	//右边导航栏检测购物车有多少个
	function checkGoodsNum(){
		var shopCarGoods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
			if($.isEmptyObject(shopCarGoods)){
				$(".shopCar_num").html("0")
			}else{
				var shopCarNum = 0;
				for(var goodName in shopCarGoods){
					shopCarNum += shopCarGoods[goodName].num;
				}
				$(".shopCar_num").html(shopCarNum)
			}
	}

	//右导航购物车检测
	function checkSideCar(goods,goodName){
		if($(".ssc_box").find("ul").length){
				var sideHave = false;
				$(".ssc_name a").each(function(){
					if($(this).html() == goodName){
						$(this).parent().siblings().find("em").html(goods[goodName].num);
						sideHave = true;
						return false;
					}
				});
				if(!sideHave){
					var oLi =  '<li>'
							+'<div class="ssc_img">'
								+'<a href=##><img src="'+goods[goodName].src+'"/></a>'
							+'</div>'
							+'<div class="ssc_info">'
								+'<div class="ssc_name">'
									+'<a href="##">'+goodName+'</a>'
								+'</div>'
								+'<div class="ssc_price">'
									+'<i>￥</i><span>'+goods[goodName].price+'</span>*<em>'+goods[goodName].num+'</em>'
								+'</div>'								
							+'</div>'							
						+'</li>';
					$(".ssc_box ul").append(oLi);
				}							
			}else{
				$(".ssc_box").html("<ul></ul>");
				var oLi =  '<li>'
							+'<div class="ssc_img">'
								+'<a href=##><img src="'+goods[goodName].src+'"/></a>'
							+'</div>'
							+'<div class="ssc_info">'
								+'<div class="ssc_name">'
									+'<a href="##">'+goodName+'</a>'
								+'</div>'
								+'<div class="ssc_price">'
									+'<i>￥</i><span>'+goods[goodName].price+'</span>*<em>'+goods[goodName].num+'</em>'
								+'</div>'								
							+'</div>'							
						+'</li>';
				$(".ssc_box ul").append(oLi);
			}
	}

	//头部购物车检测
	function checkTopCar(goods,goodName){
		if($("#header dd").find("ul").length){
				var topHave = false;
				$(".t_shopcar_name p").each(function(){
					if($(this).html() == goodName){
						topHave = true;
						return false;
					}
				});
				if(!topHave){
					var oLi =  '<li>'+
							'<div class="t_shopcar_img">'+
								'<a href="##"><img src="'+goods[goodName].src+'"/></a>'+
							'</div>'+
							'<div class="t_shopcar_name">'+
								'<a href="##">'+
									'<p>'+goodName+'</p>'+
								'</a>'+
							'</div>'+
							'<div class="t_shopcar_price">'+
								'<p><span>￥</span>'+goods[goodName].price+'</p>'+
							'</div>'+
						'</li>';
				$("#header dd ul").append(oLi);
				}							
			}else{
				$("#header dd").html("<ul class='top_shopCar'></ul>");
				var oLi =  '<li>'+
							'<div class="t_shopcar_img">'+
								'<a href="##"><img src="'+goods[goodName].src+'"/></a>'+
							'</div>'+
							'<div class="t_shopcar_name">'+
								'<a href="##">'+
									'<p>'+goodName+'</p>'+
								'</a>'+
							'</div>'+
							'<div class="t_shopcar_price">'+
								'<p><span>￥</span>'+goods[goodName].price+'</p>'+
							'</div>'+
						'</li>';
				$("#header dd ul").append(oLi);
			}
			if($("#header dd").find("ul li").length>3){
				if(!$("#header dd").find(".to_check_goods").length){
					var oCheckAllGoods = '<p class="to_check_goods"><a href="shopCar.html">查看全部商品>></a><p>'
					$("#header dd").find("ul").after(oCheckAllGoods);
				}
			}		
	}
	
	//加入购物车提示	
	function successAddCar(){
			if(oSuccessAdd.isAdd){
				oSuccessAdd.isAdd = false;
				oSuccessAdd.fadeIn().delay(100).fadeOut(function(){
					oSuccessAdd.isAdd = true;
				})
			}		
	}
	
	//成功操作或失败以后弹出框
	function _success(txt) {
        zeroModal.success(txt);
    }
	//失败操作以后弹出框
	function _error(txt){
		zeroModal.error(txt);
	}
	//确认弹出框
	function _confirm(txt,ok,cancel){
        zeroModal.confirm({
            content: txt,
            okFn: ok,
            cancelFn: cancel
        });
	}

	//搜索栏关键词
	function searchKeyWord(){
		$.ajax({
			url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$(".search_cont").val()+"&json=1&p=3",
			dataType: "jsonp",
			jsonp: "cb",
			success:function(data){
				var result = data.g;
				var list = $(".search_cont").siblings(".search_list");
				list.html("");
				console.log(list)
				for(var key in result){
					var oLi = $("<li>"+result[key].q+"</li>");
					list.append(oLi)				
				}
				list.find("li").click(function(){
					$(".search_cont").val($(this).html());					
				})
			}
		});
	}
	