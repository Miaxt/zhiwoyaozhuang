//		载入验证码
		$.idcode.setCode();
		$("#change_code").click(function(){
			$.idcode.setCode();
		})

//		登录
		//用户名的事件
		var oUserName = $("#login_username")
		oUserName.mouseup(function(){
			$(this).val("");
		})
		oUserName.blur(function(){
			if(!$(this).val()){
				$(this).val("用户名/邮箱/手机号")
			}
		})
	
	//匹配账号是否存在 密码是否匹配
	var oPassWord = $("#login_password");
	$(".login_user").submit(function(e){
		e.preventDefault();
		if($.cookie(oUserName.val())){
			if($.cookie(oUserName.val())==oPassWord.val()){
				if(checkCode()){					
					_success("登陆成功");
					$.cookie("login",oUserName.val(),{expires:1,path:"/"});
					$(".zeromodal-btn").click(function(){
						if($.cookie("goToPay")){
							location.href = "pay.html";
							$.cookie("goToPay","",{expires:-1,path:"/"})
						}else{
							location.href = "index.html";
						}
					})
				}else{
					_error("请输入正确验证码")
				}
			}else{
				_error("密码不正确")
			}
		}else{
			_error("用户名不存在")
		}
	})
	
	function checkCode(){
		var isBy = $.idcode.validateCode();
		if(!isBy){
			return false;
		}else{
			return true;
		}
	}