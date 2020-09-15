$(document).ready(function(){

	var currentPostId;
  var currentCommentId;
	loadAllPosts();

	$("#createPostButton").click(function(){
		createPost();
	});
	$("#loginButton").click(function(){
		login();
	});
	$("#registerButton").click(function(){
		register();
	});

function createPost()
{
	if($("#message").val()==""){
		// $("#createMsg").html("Please Write Something First");
		document.getElementById("createMsg").innerHTML="Please Write Something First";
	}
	else{
		//alert(getCookie("loginData"));
		if(getCookie("loginData")==""){
			window.location = "http://localhost/contest/index.html";
		}
		else
		{
		$.ajax({
				url:"http://localhost:6100/api/posts/",
				method:"post",
				headers:{
					contentType:"application/json",
					Authorization:"Basic "+btoa(getCookie("loginData"))
				},
				data:{
					message:$("#message").val(),
					user:getCookie("loginData").split(":")[0]
				},
				complete:function(xmlHttp,status){
					if(xmlHttp.status==201)
					{
						$('#createMsg').empty().show().html("Post created").delay(1000).fadeOut(10);
						$("#message").val("");
						loadAllPosts();
					}
					else
					{
						$('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
						console.log(xmlHttp.status+":"+xmlHttp.statusText);
					}
				}
			});
		}
	}
}

function loadAllPosts()
{
 $.ajax({
		url:"http://localhost:6100/api/posts",
		method:"get",
		headers:{
			Authorization:"Basic "+btoa(getCookie("loginData"))
		},
		complete:function(xmlHttp,status){
			if(xmlHttp.status==200)
			{
				var data=xmlHttp.responseJSON;
				var str='';
				var confirm="Are you Sure About Deletion ??";
				var len=data.length-1;
				for (var i = len; i >=0; i--) {
					str+='<div class="panel panel-default">';
					str+='<div class="panel-body">';
					str+='<center>Posted By :<b>'+data[i].user+'</b></center>';
					str+='<p id="'+data[i].id+'" >'+data[i].message+'</p>';
					str+='<span class="pull-right"><button id="dp'+data[i].id+'" onclick="deletePost(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Delete</button></span>';
					str+='<span class="pull-right"><button id="ep'+data[i].id+'" onclick="editPost(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Edit</button></span>';
					str+='<span class="pull-right"><button id="up'+data[i].id+'" onclick="updatePost(this.id)" style="padding:0 3px; visibility:hidden;">Update</button></span>';
					str+='<span class="pull-left"><button id="scp'+data[i].id+'" onclick="seeComments(this.id)" style="padding:0 3px; visibility:visible;">See Comments</button></span>';
					str+='<span class="pull-left"><button id="hcp'+data[i].id+'" onclick="hideComments(this.id)" style="padding:0 3px; visibility:hidden;">Hide Comments</button></span>';
					str+='<span class="pull-left"><button id="cp'+data[i].id+'" onclick="cancelUpdate(this.id)" style="padding:0 3px; visibility:hidden;">Cancel</button></span>';
					str+='</div>';
                    str+='<div id="comBox'+data[i].id+'">';
                    str+='</div>';
                    str+='</div>';

					$("#allPosts").html(str);
				};
			}
			else
			{
				$("#createMsg").html("Error");
				console.log(xmlHttp.status+":"+xmlHttp.statusText);
			}
		}
	});
}

function login()
{
	if($("#username").val()=="" && $("#password").val()==""){
		$('#loginMsg').empty().show().html("Please Enter Login Credentials").delay(1000).fadeOut(10);
	}
	else{
		$.ajax({
				url:"http://localhost:6100/api/login",
				method:"post",
				headers:{
					contentType:"application/json"
				},
				data:{
					username:$("#username").val(),
					password:$("#password").val()
				},
				complete:function(xmlHttp,status){
		        if(xmlHttp.status==200)
		        {
		          var data=xmlHttp.responseJSON;
							if(data!=null){
								$('#loginMsg').empty().show().html("Successfully Logined").delay(1000).fadeOut(10);
								setCookie(data.username,data.password,1);
								window.location = "http://localhost/contest/home.html";
								// alert("Check :"+getCookie("loginData"));
							}
							else
			        {
			          $('#loginMsg').empty().show().html("Login Credentials INVALID !").delay(1000).fadeOut(10);
			        }
		        }
		        else
		        {
		          $('#loginMsg').empty().show().html("ERROR!").delay(1000).fadeOut(10);
		          console.log(xmlHttp.status+":"+xmlHttp.statusText);
		        }
				}
			});
	}
}

function register()
{
	if($("#username").val()=="" && $("#password").val()==""){
		document.getElementById("loginMsg").innerHTML="Please Write Something First";
	}
	else{
		$.ajax({
				url:"http://localhost:6100/api/register",
				method:"post",
				headers:{
					contentType:"application/json"
				},
				data:{
					username:$("#username").val(),
					password:$("#password").val()
				},
				complete:function(xmlHttp,status){
		        if(xmlHttp.status==200)
		        {
		          var data=xmlHttp.responseJSON;
							if(data!=null){
								$('#loginMsg').empty().show().html("Successfully Registered").delay(1000).fadeOut(10);
								setCookie(data.username,data.password,1);
								window.location = "http://localhost/contest/home.html";
								// alert("Check :"+getCookie("loginData"));
							}
		        }
		        else
		        {
		          $("#createMsg").html("Error");
		          console.log(xmlHttp.status+":"+xmlHttp.statusText);
		        }
				}
			});
	}
}
$("#logout").click(function(){
	document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	alert(document.cookie);
});
function setCookie(username, password)
{
	var date = new Date();
  date.setTime(date.getTime()+(24*60*60*1000));
  document.cookie = "loginData=" + username + ":" +password + "; expires=" + date.toGMTString();

  //document.cookie = "loginData=" + username + ":" +password + ";";
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
});
