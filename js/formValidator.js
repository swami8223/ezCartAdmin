;(function( $ ) {
$.fn.validateForm = function() {
  var input,elementId,validateResult;
  var errorFreeForm = true
  var formid=$(this).attr("id");

$(this).next(".errorBlock").remove();
$(this).find(".errorMessage").remove();
$("<div class='errorBlock' style='clear:both'></div>").insertAfter(this);
//  $("form#"+formid).find("select").each(function(){

// if($(this).val() == "" || $(this).val() == null ){
//  var validateResult = {result:false,message : "Cant be empty"};
//   $( "<span class='errorMessage'>"+$(this).attr("name")+"Cant be empty </span>" ).insertAfter(this)
// }
//  });
 $("form#"+formid+" :input").each(function(){

 input = $(this); // This is the jquery object of the input, do what you will
elementId = input.attr("id");
elementName = input.attr("name");
  //validate(input);
$(this).css("border","1px solid #000");
   var validateResult = validate (input);
//console.log("Resultss"+input.val())
 //  console.log("isvalid "+validateResult.result+" final result "+validateResult.message);
 
   if(validateResult.result == true){
   	console.log("inside validtare true")
   	$("#"+elementId).removeClass("error");
   	//$( "p" ).insertAfter("#"+elementId)
   }
   else if(validateResult.result == false){
   console.log("inside validtare false");
   $("#"+elementId).css("border","1px solid #C00");
   $( "<span class='errorMessage'>"+elementName+" "+validateResult.message+"</span>" ).insertAfter("#"+elementId)
   errorFreeForm= false;
$(".errorBlock").append( "</br><span class='errorMessage' style='clear:both'>"+elementName+" "+validateResult.message+"</span>" );
    //errorFreeForm.message.push(elementName+" "+validateResult.message) ;
   }
 });



return errorFreeForm

};




$.fn.clearform = function(){
  $(this).find("input[type=password],input[type=textarea],input[type=mail],input[type=number],input[type=text]").val("");
   $(this).find("input,select").css("border","1px solid #000");;
$(this).next(".errorBlock").remove();
$(this).find(".errorMessage").remove();
$(this).find("error").remove();
}

}( jQuery ));








var validate  = function(input){
console.log("inside validator"+input.val());
value = input.val();
emptyError = "" 
type = input.attr("type");
isRequired = input.attr("required");
id = input.attr("id");

validateResult =  function(){
	console.log("ID "+ id+" type " +type+" isRequired "+isRequired+" value "+value);


if(isRequired == "required" && value.trim() == "" || value == null ){  

return {result:false ,message:"can't be empty" };
}
if(isRequired == undefined && value == "" || value == null ){  
return {result:true ,message:"" };
}

if(type == undefined || type == ""){
	type = 0;
}

if(id == "re-password"){
//alert("gh"+input.val())
  type = "rePassword"
}
switch(type){
case 0:
return textValidator(value);
break;
case "number":
 return numberValidator(value);
 break;
case "text":
 return textValidator(value);
break;
case "PhoneNumber":
return phonumberValidator(value);
  break;
case "mail" :
return emailValidatior(value);
   break;
case "name" :
return nameValidator(value);
break;
case "rePassword" :
//alert(input.val())

   if($("#password").val() == input.val()){
  return {result:true,message : ""};
   }
   else{
       return {result:false,message : "dosent match"};
     

   }
   break;
case "pincode" :
return pincodeValidator(value);
default:
return {result:true,message : ""};
}



},

pincodeValidator =  function(value){
  alert("hihi")
  if(value.length != 6){
return {result:false,message : "is not valid"};
  }else{
    return true;
  }

}

nameValidator = function(value){
var filter =  /^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$/;
if (filter.test(value)) {
return true;
}
else {
return {result:false,message : "is not valid"};
}
}

emailValidatior =  function(value){
var filter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
if (filter.test(value)) {
return true;
}
else {
return {result:false,message : "is not valid"};
}
}
 numberValidator = function(value){
value = isNaN(value) ? true :  false;
if(value == false){
	return {result:true,message : ""};
}
else if(value == true){
		return {result:false,message : "should be number"};
}

 }


 textValidator = function(value){
//  var filter = /^[\w ]+$/;
//  if (filter.test(value)) {
// return true;
// }
// else {
// return {result:false,message : "is not valid"};
// }
 	console.log("inside text validator");

return {result:true,message : ""};
 },

 phonumberValidator = function(value){
var filter = /^[0-9-+]+$/;
if (filter.test(value) && value.trim().length == 10) {
return true;
}
else {
return {result:false,message : "is invalid"};
}
}
 //console.log("valueee"+validateResult ())
return validateResult ();


}



