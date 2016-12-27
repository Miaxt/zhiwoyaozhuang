//生成验证码
		$.idcode.setCode(); 
		$("#change_code").click(function(){
			$.idcode.setCode();
			//此时与输入不相等;
			checkCode();
		})

//表单验证
	var oMobile = $("#signup_mobile");
	var oPassWord = $("#signup_password");
	var oConfirm = $("#signup_passwordConfirm");
	var oVerifyCode = $("#Txtidcode");
	var oMobileError = $(".error").eq(0);
	var oPassWordError =  $(".error").eq(1);
	var oConfirmError =  $(".error").eq(2);
	var oCodeError =  $(".error").eq(3);
	var regs = {
		mobileReg:/^1[34578]\d{9}$/,
		passWordReg:/^.{6,16}$/	
	}
	oMobile.blur(function(){
		checkMobile();
	})
	oMobile.focus(function(){
		oMobileError.hide();
	})
	oPassWord.blur(function(){
		if(oConfirm.val()){
			checkConfirm();
		}		
		checkPassWord()
	})
	oPassWord.focus(function(){
		oPassWordError.hide();
	})
	oConfirm.change(function(){
		checkConfirm()
	})
	oVerifyCode.focus(function(){
		oCodeError.hide();
	})
	oVerifyCode.blur(function(){
		checkCode();
	})
	var oForm = $(".regist_user");
	oForm.submit(function(e){
		if(checkMobile()&checkPassWord()&checkConfirm()&checkCode()){
			e.preventDefault();
			$.cookie(oMobile.val(),oPassWord.val(),{expires:1,path:"/"})
			_success("注册成功");
			$(".zeromodal-btn").click(function(){
				location.href = "login.html";
			})
		}else{
			return false;
		}
	})
	function checkMobile(){
		if(!(regs.mobileReg.test(oMobile.val()))){
			oMobileError.show();
			return false;
		}
		return true;
	}
	function checkPassWord(){
		if(!(regs.passWordReg.test(oPassWord.val()))){
			oPassWordError.show();
			return false
		}
		return true;
	}
	function checkConfirm(){
			if(!oConfirm.val()){
				oConfirmError.html("请输入确认密码！");
				oConfirmError.show();
				return false;
			}
			if(oConfirm.val()!=oPassWord.val()){
				oConfirmError.html("两次输入的密码不一致！");
				oConfirmError.show();
				return false;
			}else{
				oConfirmError.hide();
				return true;
			}
		}		
	function checkCode(){
		var isBy = $.idcode.validateCode();
		if(!isBy){
			oCodeError.show();
			return false;
		}else{
			return true;
		}
	}
