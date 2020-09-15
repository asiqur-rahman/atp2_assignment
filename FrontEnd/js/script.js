var currentPostId;
var currentCommentId;
var clicked=0;

function editPost(id)
{
  // alert(document.getElementsById(id).innerHTML);
  currentPostId=id.split("p")[1];
  var editor = document.getElementById(currentPostId);
  editor.isContentEditable;
  editor.contentEditable = true;
  editor.focus();
  document.getElementById("up"+currentPostId).style.visibility = "visible";
  document.getElementById("ep"+currentPostId).style.visibility = "hidden";
  document.getElementById("dp"+currentPostId).style.visibility = "hidden";
  document.getElementById("scp"+currentPostId).style.visibility = "hidden";
  document.getElementById("cp"+currentPostId).style.visibility = "visible";
	// $("#message").val(document.getElementById(currentPostId).innerHTML);
}

function updatePost(id)
{
  currentPostId=id.split("p")[1];
  $.ajax({
     url:"http://localhost:6100/api/posts/"+currentPostId,
     method:"put",
     headers:{
       contentType:"application/json",
       Authorization:"Basic "+btoa("admin:123")
     },
     data:{
       message:document.getElementById(currentPostId).innerHTML
     },
     complete:function(xmlHttp,status){
       if(xmlHttp.status==200)
       {
         $('#createMsg').empty().show().html("Successfully Updated").delay(1000).fadeOut(10);
         loadAllPosts();
       }
       else
       {
         $('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
         console.log(xmlHttp.status+":"+xmlHttp.statusText);
       }
     }
   });
   loadAllPosts();
}

function deletePost(id)
{
  if (confirm("Are you sure about POST Deletion ?"))
  {
    id=id.split("p");
    id=id[1];
    $.ajax({
       url:"http://localhost:6100/api/posts/"+id,
       method:"delete",
       headers:{
         Authorization:"Basic "+btoa("admin:123")
       },
       complete:function(xmlHttp,status){
         if(xmlHttp.status==204)
         {

             $('#createMsg').empty().show().html("Successfully Deleted").delay(1000).fadeOut(10);
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

function cancelUpdate(id)
{
  loadAllPosts()
 }

function seeComments(id)
{
  currentPostId=id.split("p")[1];
   $.ajax({
      url:"http://localhost:6100/api/posts/"+currentPostId+"/comments",
      method:"get",
      headers:{
        Authorization:"Basic "+btoa("admin:123")
      },
      complete:function(xmlHttp,status){
        if(xmlHttp.status==200)
        {
          var data=xmlHttp.responseJSON;
          var str='';
            // str+='<div class="panel panel-default">';
            // str+='<div class="panel-body">';
            // str+='<p id="'+data.id+'" >'+data.message+'</p>';
            // str+='<span class="pull-right"><button id="dp'+data.id+'" onclick="deletePost(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Delete</button></span>';
            // str+='<span class="pull-right"><button id="ep'+data.id+'" onclick="editPost(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Edit</button></span>';
            // str+='<span class="pull-right"><button id="up'+data.id+'" onclick="updatePost(this.id)" style="padding:0 3px; visibility:hidden;">Update</button></span>';
            // str+='<span class="pull-left"><button id="scp'+data.id+'" onclick="seeComments(this.id)" style="padding:0 3px; visibility:visible;">See Comments</button></span>';
            // str+='<span class="pull-left"><button id="cp'+data.id+'" onclick="cancelUpdate(this.id)" style="padding:0 3px; visibility:hidden;">Cancel</button></span>';
            // str+='</div>';
            str+='<div class="panel-footer">';
            str+='<span><input id="com'+currentPostId+'" type="text" name="content" placeholder="Make a comment..."></span>';
            str+='<span class="pull-right"><button id="pc'+data.id+'" onclick="createCom(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Comment</button></span>';
            str+='</div>';
            for (var i = 0; i < data.comments.length; i++) {
              str+='<div class="panel-footer">';
              str+='<span id="c'+data.comments[i].id+'">'+data.comments[i].message+'</span>';
              str+='<span class="pull-right"><button id="'+data.id+'dc'+data.comments[i].id+'" onclick="deleteCom(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Delete</button></span>';
              str+='<span class="pull-right"><button id="'+data.id+'ec'+data.comments[i].id+'" onclick="editCom(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Edit</button></span>';
              str+='<span class="pull-right"><button id="'+data.id+'uc'+data.comments[i].id+'" onclick="updateCom(this.id)" style="padding:0 3px; margin-left:10px; visibility:hidden;">Update</button></span>';
              str+='<span class="pull-right"><button id="'+data.id+'cc'+data.comments[i].id+'" onclick="cancelCom(this.id)" style="padding:0 3px; visibility:hidden;">Cancel</button></span>';
              str+='</div>';
            }
            str+='</div>';
            $("#comBox"+data.id).html(str);
            document.getElementById("scp"+currentPostId).style.visibility = "hidden";
            document.getElementById("hcp"+currentPostId).style.visibility = "visible";
        }
        else
        {
          $("#createMsg").html("Error");
          console.log(xmlHttp.status+":"+xmlHttp.statusText);
        }
      }
    });

 }

function hideComments(id)
{
    currentPostId=id.split("p")[1];
    $("#comBox"+currentPostId).html("");
    document.getElementById("scp"+currentPostId).style.visibility = "visible";
    document.getElementById("hcp"+currentPostId).style.visibility = "hidden";
}

function createCom(id)
{
 // alert(id);
 currentPostId=id.split("pc")[1];
  // alert(currentPostId+" "+document.getElementById("com").value);
    $.ajax({
       url:"http://localhost:6100/api/posts/"+currentPostId+"/comments",
       method:"post",
       headers:{
         contentType:"application/json",
         Authorization:"Basic "+btoa("admin:123")
       },
       data:{
         message:document.getElementById("com"+currentPostId).value
       },
       complete:function(xmlHttp,status){
         if(xmlHttp.status==201)
         {
             $('#createMsg').empty().show().html("Successfully Created").delay(1000).fadeOut(10);
             clicked=1;
             seeComments("p"+currentPostId);

         }
         else
         {

             $('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
           console.log(xmlHttp.status+":"+xmlHttp.statusText);
         }
       }
     });
}

function editCom(id)
{
 // alert(id.split("ec")[1]);
 currentPostId=id.split("ec")[0];
 currentCommentId=id.split("ec")[1];
 var editor = document.getElementById("c"+currentCommentId);
 editor.isContentEditable;
 editor.contentEditable = true;
 editor.focus();
 document.getElementById(currentPostId+"uc"+currentCommentId).style.visibility = "visible";
 document.getElementById(currentPostId+"ec"+currentCommentId).style.visibility = "hidden";
 document.getElementById(currentPostId+"dc"+currentCommentId).style.visibility = "hidden";
 document.getElementById(currentPostId+"cc"+currentCommentId).style.visibility = "visible";
	$("#message").val(document.getElementById(currentPostId).innerHTML);
}

function updateCom(id)
{
 currentPostId=id.split("uc")[0];
 currentCommentId=id.split("uc")[1];
 // alert(document.getElementById("c"+currentCommentId).innerHTML);
 $.ajax({
    url:"http://localhost:6100/api/posts/"+currentPostId+"/comments/"+currentCommentId,
    method:"put",
    headers:{
      contentType:"application/json",
      Authorization:"Basic "+btoa("admin:123")
    },
    data:{
      message:document.getElementById("c"+currentCommentId).innerHTML
    },
    complete:function(xmlHttp,status){
      if(xmlHttp.status==200)
      {

          $('#createMsg').empty().show().html("Comment Successfully Updated").delay(1000).fadeOut(10);
        seeComments("p"+currentPostId);
      }
      else
      {

          $('#createMsg').empty().show().html("ERROR").delay(1000).fadeOut(10);
        console.log(xmlHttp.status+":"+xmlHttp.statusText);
      }
    }
  });
}

function deleteCom(id)
{
 if (confirm("Are you sure about Comment Deletion ?"))
 {
   currentPostId=id.split("dc")[0];
   currentCommentId=id.split("dc")[1];
   $.ajax({
      url:"http://localhost:6100/api/posts/"+currentPostId+"/comments/"+currentCommentId,
      method:"delete",
      headers:{
        Authorization:"Basic "+btoa("admin:123")
      },
      complete:function(xmlHttp,status){
        if(xmlHttp.status==204)
        {

            $('#createMsg').empty().show().html("Comment Successfully Deleted").delay(1000).fadeOut(10);
          seeComments("p"+currentPostId);
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

function cancelCom(id)
{
 seeComments("p"+id.split("cc")[0])
}

function loadAllPosts()
{
  $.ajax({
     url:"http://localhost:6100/api/posts",
     method:"get",
     headers:{
       Authorization:"Basic "+btoa("admin:123")
     },
     complete:function(xmlHttp,status){
       if(xmlHttp.status==200)
       {
         var data=xmlHttp.responseJSON;
         var str='';
         var len=data.length-1;
				for (var i = len; i >=0; i--) {
           str+='<div class="panel panel-default">';
           str+='<div class="panel-body">';
           str+='<p id="'+data[i].id+'" >'+data[i].message+'</p>';
           str+='<span class="pull-right"><button id="dp'+data[i].id+'" onclick="deletePost(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Delete</button></span>';
           str+='<span class="pull-right"><button id="ep'+data[i].id+'" onclick="editPost(this.id)" style="padding:0 3px; margin-left:10px; visibility:visible;">Edit</button></span>';
           str+='<span class="pull-right"><button id="up'+data[i].id+'" onclick="updatePost(this.id)" style="padding:0 3px; visibility:hidden;">Update</button></span>';
           str+='<span class="pull-left"><button id="scp'+data[i].id+'" onclick="seeComments(this.id)" style="padding:0 3px; visibility:visible;">See Comments</button></span>';
           str+='<span class="pull-left"><button id="hcp'+data[i].id+'" onclick="hideComments(this.id)" style="padding:0 3px; visibility:hidden;">Hide Comments</button></span>';
           str+='<span class="pull-left"><button id="cp'+data[i].id+'" onclick="cancelUpdate(this.id)" style="padding:0 3px; visibility:hidden;">Cancel</button></span>';
           str+='</div>';
           str+='<div id="comBox'+data[i].id+'" class="panel panel-default">';
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
