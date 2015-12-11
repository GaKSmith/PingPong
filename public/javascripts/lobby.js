var userName = null;
var socket = io();
var randomNum = Math.random();
var tableA = [[]];
var indexTemp;
$(".table").hide();
$("#container1").css("position","absolute");
$("#container2").css("position","absolute");
$("#container2").css("left","600px");
$("#list1").css("position","absolute");
$("#list2").css("position","absolute");
$("#list1").css("top","15px");
$("#list2").css("top","15px");

console.log("sup bro bot 2000");
$("#submitName").click(function() {
  $(".table").show();
  userName = $("#name").val();
  $("#welcome").append(userName);
  $("#name").hide();
  $("#submitName").hide();
});
$(".table").click(function(){
  var index = $(this).data("number");
  indexTemp = index;
  console.log("index is  ",index);
  $(".table").css("visibility","hidden")
    if(tableA[index])
    {
      tableA[index].push(userName);
    }
    else
    {
      tableA[index] = [];
      tableA[index].push(userName);
    }
    printList();
    socket.emit("lobby",randomNum,userName,indexTemp);
    indexTemp = null;
});

function printList()
{
  console.log("Getting printed");
  $("#list" + (indexTemp + 1)).empty();
  if (tableA[indexTemp])
  {
    tableA[indexTemp].forEach(function(name){
      $("#list" + (indexTemp + 1)).append(name + " ");
    });
  }
}

socket.on('connect', function() {
  console.log('Connected!');
});

socket.on("gameOn",function(uName,key,tableNumber){
  if (key !== randomNum)
  {
    console.log("Game is on");
    console.log("the user is ",uName," the key is ",key);
    if (!tableA[tableNumber])
    {
      tableA[tableNumber] = [];
    }
    tableA[tableNumber].push(uName);
    indexTemp = tableNumber;
    printList();
  }
    // location.href("/table1");
});
