var origin = {x:0,y:0,z:0};
var username = "";
// origin.z = -380;
origin.x = 240;
origin.y = 50;
origin.z = -80;
axisRot.x -= origin.x;
axisRot.y  -= origin.y;
axisRot.z  -= origin.z;
console.log("Viewer is our new glib glob!!!!!");
$("#michaelBay").click(function(){
  michaelBay = !michaelBay;
});
$("#rotateLeft").click(function() {
  thetaView += PI / 128;
});
$("#rotateRight").click(function() {
  thetaView -= PI / 128;
});
$("#moveLeft").click(function() {
  origin.y += 11;
});
$("#moveRight").click(function() {
  origin.y += -11;
});
$("#moveUp").click(function() {
  origin.z += 12;
});
$("#moveDown").click(function() {
  origin.z += -12;
});
$("#zoomIn").click(function() {
  origin.x += 13;
});
$("#zoomOut").click(function() {
  origin.x += -13;
});
console.log("Viewer still tight bro!!");
$("#saveSettings").click(function() {
  console.log("User name is ",userName,"origin is ",origin);
  $.ajax({url:"/settings",method:"post",data: {username: userName,origin: origin,theta: thetaView},dataype:"JSON"});
});
$("#saveName").click(function() {
  var input = $("#userName").val();
  userName = input;
  $.ajax({url:"/load", success: function(data){
    console.log("Data is ",data);
    origin.x = data[0].settings.x;
    origin.y = data[0].settings.y;
    origin.z = data[0].settings.z;
    thetaView = data[0].settings.theta;
  }
  });
});
