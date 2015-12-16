var origin = {x:0,y:0,z:0};
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
