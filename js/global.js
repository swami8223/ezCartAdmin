
var BackendURL = "http://shoppingcartwebapi.4maven.com/";
var serverUrl = window.location.origin;
var appname = window.location.pathname;

$(document).ready(function(){
 
  $("#MessageBlockOk").click(function(){
    $(".MessageBlock").hide();
$(".MessageBlockmessage").html("");
  })

$("#popupBoxClose").click(function(){
    unloadPopupBox() 
})

})


function reportsuccess (response){

if(response.Result ==2){
Global.signout();
return true;
}
else if(response.Result !=1){
$(".MessageBlockdiv").css("background","#990325");
$(".MessageBlockheader").text("Form Submission failed dut to following Reason");
}


else{
  return false;
}
}

function handleResult (response){
if(response.Result ==2){
Global.signout();
}else{
  return true;
}



}
function unloadPopupBox() {    // TO Unload the Popupbox
            $('#popup_box').fadeOut("slow");
            $("#container").css({ // this is just for style        
                "opacity": "1"  
            }); 
}    


 function sucessPopup(message) {    // To Load the Popupbox
            
          
            var counter = 5;
            var id;
            $('#popup_box').fadeIn("slow");
            $("#container").css({ // this is just for style
                "opacity": "0.3"  
            });
            
            id = setInterval(function() {
                counter--;
                if(counter < 0) {
                    clearInterval(id);
                    
                    unloadPopupBox();
                } else {
                    $(document).scrollTop(100)
                    $("#countDown").html(message);
                }
            }, 1000);
            
        }

function onSucessofForm(response,callback){
  console.log(response);
 // console.log("response"+response.Result);

// $("#MessageBlockOk").focus();
// $(".MessageBlockdiv").css("background","#00CC33");
// $(".MessageBlockheader").text("Form Submission sucess");
// $(".MessageBlockmessage").html("<p>"+response.Message+"</p>")
$(".loadingBlock").hide();
if(response.Result ==2){
Global.signout();
}
else if(response.Result !=1){
  $(".MessageBlock").css("height",$(document).height())

$(".MessageBlock").show();
window.scrollTo(30, 30);
$(".MessageBlockdiv").css("background","#990325");
$(".MessageBlockheader").text("Form Submission failed dut to following Reason");
$(".MessageBlockmessage").html("<p>"+response.Message+"</p>")
}
else if(response.Result ==1 && callback != undefined){
  callback();
}


}






function ShowPopUp(response){
  console.log("response"+response);
$(".MessageBlock").css("height",$(document).height())
$(".loadingBlock").hide();
$(".MessageBlock").show();
window.scrollTo(30, 30);
$("#MessageBlockOk").focus();
$(".MessageBlockdiv").css("background","#00CC33");
$(".MessageBlockheader").text("Form Submission sucess");
$(".MessageBlockmessage").html("Result"+"</br>"+response)


}


 function loadShow(){
  $(".loadingBlock").height(document.body.clientHeight);
   $(".loadingBlock").show();
 }



Global = {

BackendURL :"http://demo.sabaristores.com/",
serverUrl : window.location.origin,
appname : window.location.pathname,

setCookie :function  (cname,cvalue,exdays)
{
  
var d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
var expires = "expires="+d.toGMTString();
document.cookie = cname + "=" + cvalue + "; " + expires;
},

resetForm:function(){

  $('.uploadimgDiv').css("width","0%" );
  $(".uploadimgDiv").css("border",'0px solid #000');
  $('.uploadimgDiv').css("height","0px" );


  
},


fileSubmit:function(input){
console.log("inside file submit");
 $('.uploadImgBlock').html("");

 $('.uploadimgDiv').css("width","100%" );
  $('.uuploadimgDiv').css('border-radius','10px');
$('.uploadimgDiv').css("height","210px" );
$(".uploadimgDiv").css("border",'2px solid #000')
$(".submitFile").show();
$(".Clear").show();
for(i=0;i<= input.files.length;i++){
if (input.files && input.files[i]) {

  Global.setup_reader(input.files[i]);
  

}
}
},
setup_reader : function(file){
  console.log("inside fillinf");
        var reader = new FileReader();
   var fileName = file.name

        reader.onload = function (e) {
$('.uploadImgBlock').append('<div  class="fl_left divBox seletedImg"><span class="remove">X</span><img class="uploadimg" src='+e.target.result +'></img><span class="fileName">'+fileName+'</span></div>')
    
        }

        reader.readAsDataURL(file);
    },


getCookie:function  (cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) {

    return c.substring(name.length,c.length)

  };
}
return "";
},

checkCookie:function  ()
{
var user=getCookie("username");
if (user!="")
  {
  alert("Welcome again " + user);
  }
else 
  {
  user = prompt("Please enter your name:","");
  if (user!="" && user!=null)
    {
    setCookie("username",user,365);
    }
  }
},

GetURLParameter:function(parameter, staticURL, decode){

  try{
    var currLocation = (staticURL.length)? staticURL : window.location.href,
       parArr = currLocation.split("?")[1].split("&"),
       returnBool = true;
   
   for(var i = 0; i < parArr.length; i++){
        parr = parArr[i].split("=");
        if(parr[0] == parameter){
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        }else{
            returnBool = false;            
        }
   }
   
   if(!returnBool) return false;  
  } 

  catch(e){
    console.log(e)
  }
},


signout:function(){
  $(".loadingBlock").show();
  $.ajax({
        url: BackendURL + "Credential/SignOut", type: "POST", xhrFields: {
            withCredentials: true
        }, success: function (result) {
           // alert("SIgnout")
              
               //$("#header-contact").hide();
               if(typeof(Storage)!=="undefined")
  {

    sessionStorage.removeItem("auth")
  }
  $("#header-contact").hide();
              window.location = window.location.origin+window.location.pathname


$(".loadingBlock").hide();


        }
    });
}

}