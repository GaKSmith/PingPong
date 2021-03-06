console.log("sup bro");
var gravityOn = true;
var socket = io();
var randomNumber = Math.random();
var whoAmI;

socket.on('connect', function() {
  console.log('Connected!');
});

socket.on("initial response",function(){
    socket.emit("determine first",randomNumber);
});
socket.on("send array",function(keyArray){
  keyArray.forEach(function(key,index){
    if (key === randomNumber)
    {
      whoAmI = index + 1;
      if (whoAmI === 1)
      {
          playerIndex = 0;
      }
      else if (whoAmI === 2)
      {
          playerIndex = 3;
      }
      $("#playerNumber").append(whoAmI);
      pProp[1].x = -5;
      // pProp[1].y = 2;
    }
  });
  $("#gameOver").text("Play some pong!!!");
});
$("#reset").click(function(){
  socket.emit("reset");
});

socket.on("resett",function(){
  location.href = "/";
});

socket.on("state request",function(){
  if(whoAmI === 1)
  {
    socket.emit("send paddles",pObjA[0],pProp[0],randomNumber);
  }
  else if (whoAmI === 2)
  {
    socket.emit("send paddles",pObjA[3],pProp[3],randomNumber);
  }
  // socket.emit("send paddles",pObjA[playerIndex],pProp[playerIndex],randomNumber);
});

socket.on("update enemy",function(paddleObj,paddleProp,key){
  if (key !== randomNumber)
  {
    paddleObj.forEach(function(face,faceIndex){
      face.forEach(function(point,pointIndex){
        for (coordinate in point)
        {
          if (whoAmI === 1)
          {
            pObjA[3][faceIndex][pointIndex][coordinate] = point[coordinate];
          }
          else if (whoAmI === 2)
          {
            pObjA[0][faceIndex][pointIndex][coordinate] = point[coordinate];
          }
        }
      });
    });
  }
});
var leftSlow = 0;
var rightSlow = 0;
var topSlow = 0;
var backSlow = 0;
var michaelBay = false;

function calculateTheta()
{
  var delX = pObjA[0][0][1].x - pObjA[0][0][0].x;
  var delY = pObjA[0][0][1].y - pObjA[0][0][0].y;
  heroPaddleTheta = Math.atan2(delX,delY);
  $("#theta").text(heroPaddleTheta);
}
var outOfBounds = false;
function checkOutOfBounds()
{
  var leftOut = pObjA[1][0][2].y < initTablePos.y && pObjA[1][1][2].x > initTablePos.x && pObjA[1][0][0].x < initTablePos.x + tableDepth
  var rightOut = pObjA[1][0][0].y > initTablePos.y + tableWidth && pObjA[1][1][2].x > initTablePos.x && pObjA[1][0][0].x < initTablePos.x + tableDepth
  if (leftOut || rightOut)
  {
    outOfBounds = true;
    if (pProp[1].x > 0)
    {
      player2Score ++;
      $("#missed").text('Player one just missed');
      startPoint();
      pProp[1].x = -5;
    }
    else if(pProp[1].x < 0)
    {
      player1Score ++;
      $("#missed").text('Player two just missed');
      startPoint();
      pProp[1].x = 5;

    }
  }
  else
  {
    outOfBounds = false;
  }
}

$(document).on("keydown",function(e){
  var keyCode = e.keyCode;
  var phi;
  if (keyCode === 37)
  {
    var leftSpeed = pProp[playerIndex].y;
    if (leftSpeed <= 0)
    {
      pProp[playerIndex].y -=5;
    }
    else if (leftSpeed > 5)
    {
      pProp[playerIndex].y = 5;
    }
    else
    {
      pProp[playerIndex].y = 0;
    }
  }
  else if (keyCode === 39)
  {
    var leftSpeed = pProp[playerIndex].y;
    if (leftSpeed >= 0)
    {
      pProp[playerIndex].y +=5;
    }
    else if (leftSpeed < -5)
    {
      pProp[playerIndex].y = -5;
    }
    else
    {
      pProp[playerIndex].y = 0;
    }
  }
  else if (keyCode === 65)
  {
      pProp[playerIndex].zA += -1;
  }
  else if (keyCode === 83)
  {
      pProp[playerIndex].zA += 1;
  }
  else if (keyCode === 38)
  {
      pProp[playerIndex].x += 5
  }
  else if (keyCode === 40)
  {
      pProp[playerIndex].x -= 5;
  }

  if(keyCode === 65 || keyCode === 83)
  {
      adjustAxes = true;
  }
});

var adjustAxes = false;
function changeRotAxes()
{
  var xRot1z = pObjA[playerIndex][0][0].z;
  var xRot2z = pObjA[playerIndex][0][1].z;
  pProp[playerIndex].zF = (xRot1z + xRot2z) /2;

  var xRot1y = pObjA[playerIndex][0][0].y;
  var xRot2y = pObjA[playerIndex][0][1].y;
  pProp[playerIndex].yF = (xRot1y + xRot2y) /2;

  var xRot1x = pObjA[playerIndex][0][0].x;
  var xRot2x = pObjA[playerIndex][0][1].x;
  pProp[playerIndex].xF = (xRot1x + xRot2x) /2;
}
var paddleHeight = 50;
var paddleWidth = 50;
var paddleDepth = 10;
var ballHeight = 10;
var paddle3d = cuboidMaker(paddleDepth,paddleWidth,paddleHeight);
var ball3d = cuboidMaker(10,10,ballHeight);
var test3dHeight = 100;
var test3d = cuboidMaker(16,17,test3dHeight);
var test3d2 = cuboidMaker(18,19,test3dHeight / 2);
var tableWidth = 500;
var tableHeight = 5;
var tableDepth = 500;
var groundHeight = 100;
var enemyPaddle = cuboidMaker(paddleWidth,paddleDepth,paddleHeight);
var player1Score = 0;
var player2Score = 0;
var initTablePos = {x:25,y:0,z:groundHeight}
var thetaView = 0;
var phiView = 0;

var axisRot = {x:null,y:null,z:null};

var table = cuboidMaker(tableDepth,tableWidth,tableHeight);

axisRot.x = initTablePos.x + tableDepth / 2;
axisRot.y = initTablePos.y + tableWidth / 2;
axisRot.z = initTablePos.z + tableHeight / 2;


transform(25,0,groundHeight - paddleHeight,paddle3d,0,0,0,1000,1000,0,0,0,0);
transform(400,tableWidth / 2,groundHeight - paddleHeight - 5,ball3d,0,0,0,1000,1000,0,0,0,0);
transform(initTablePos.x,initTablePos.y,groundHeight,table,0,0,0,0,0,0,0,0,0);
transform(initTablePos.x + tableDepth,100,groundHeight - paddleHeight,paddle3d,0,0,0,1000,1000,0,0,0,0);
// transform(initTablePos.x + tableDepth /2,initTablePos.y + tableWidth /2 ,groundHeight - test3dHeight,test3d,0,0,0,1000,1000,0,0,0,0);
// transform(initTablePos.x + tableDepth,initTablePos.y,groundHeight - test3dHeight / 2,test3d2,0,0,0,1000,1000,0,0,0,0);
// transform(tableDepth,0 + tableWidth,groundHeight - test3dHeight,test3d,0,0,0,1000,1000,0,0,0,0);

var ballMove = pObjA[1];

function sketchDepth()
{
    for(var i = pObjA[2][0][0].x; i < pObjA[2][1][1].x; i += 40)
    {
        var groundHeight = 100;
        var y1 = pObjA[2][0][0].y;
        var y2 = pObjA[2][0][2].y;
        var z = groundHeight;

        var gy1 = pointConvert(i,y1,'y');
        var gz1 = pointConvert(i,z,'z');
        var gy2 = pointConvert(i,y2,'y');
        var gz2 = pointConvert(i,z,'z');

        context.beginPath();
        context.moveTo(gy1 + 100, gz1);
        context.lineTo(gy2 +100, gz2);
        context.lineWidth = .1;
        context.closePath();
        context.strokeStyle = '000000';
        context.stroke();
    }
}
function shadow()
{
  var ballY = ballMove[0][0].y;
  var ballY2 = ballMove[0][2].y;
  var ballYAvg = (ballY + ballY2) / 2;

  var ballZ = ballMove[0][0].z;
  var ballZ2 = ballMove[0][2].z;
  var ballZAvg = (ballZ + ballZ2) / 2;

  var ballX = ballMove[0][0].x;
  var ballX2 = ballMove[1][1].x;
  var ballXAvg = (ballX + ballX2) / 2;

  var g1y = pointConvert(ballX,ballY,'y');
  var g1z = pointConvert(ballX,groundHeight,'z');

  circle(g1y,g1z,2,2 * PI);
}

var time = 0;
v0 = 13;
var bounce = 0;
var gameOver = false;
gravityOn = false;

function gravity()
{
  if(gravityOn)
  {
   var g = 1;
    pObjA[1].forEach(function(face,faceIndex){
        face.forEach(function(point,pointIndex){
            pObjA[1][faceIndex][pointIndex].z += (-v0 + (g * time));
        });
    });
    time ++;

    if(pObjA[1][0][0].z > groundHeight)
    {
      bounce ++;
      var amountBelow = pObjA[1][0][0].z - groundHeight;
      pObjA[1].forEach(function(face,faceIndex){
          face.forEach(function(point,pointIndex){
              pObjA[1][faceIndex][pointIndex].z -= amountBelow;
          });
      });
        // v0 = 13;
        // if (bounce === 2)
        // {
        //     gameOver = true;
        //     $("#gameOver").text("Game over");
        //     console.log("Game is over");
        //     v0 = .5 * (g * (time -1) -v0);
            time = 0;
        // }
    }
  }
}
function circle (x,y,r,w)
{
  context.lineWidth = w;
  context.beginPath();
  context.arc(x + 100,y,r,0,2 * PI);
  context.closePath();
  context.stroke();
}

var point1 = {x: pObjA[2][0][0].x, y: pObjA[2][0][0].y,z: 300};
var point2 = {x: pObjA[2][1][1].x, y: pObjA[2][0][0].y,z: 300};

// makeLineFromPoints(point1,point2);
function makeLineFromPoints(point1,point2)
{
  var x1 = point1.x;
  var y1 = point1.y;
  var z1 = point1.z;
  var x2 = point2.x;
  var y2 = point2.y;
  var z2 = point2.z;

  if(x2 - x1 === 0)
  {
      x2 += .000001;
  }
  if(y2 - y1 === 0)
  {
      y2 += .000001;
  }

  var a = (z2 - z1) / (x2 - x1);
  var b = z1 - a * x1;
  var c = (z2 - z1) / (y2 - y1);
  var d = z1 - c * y1;

  return [a,b,c,d];
}
var goBack =false;
function intersectionChecker()
{
  var ballX = pObjA[1][0][0].x;
  var paddleZ = pObjA[0][0][0].z;
  var dragonBallZ = pObjA[1][0][2].z;


  var paddleX11 = pObjA[0][0][0].x;
  var paddleX12 = pObjA[0][1][1].x;
  var paddleY11 = pObjA[0][0][0].y;
  var paddleY12 = pObjA[0][0][2].y;

  var smallPaddleX = Math.min(paddleX11,paddleX12);
  var bigPaddleX = Math.max(paddleX11,paddleX12);
  var smallPaddleY = Math.min(paddleY11,paddleY12);
  var bigPaddleY = Math.max(paddleY11,paddleY12);

  var paddleX21 = pObjA[3][0][0].x;
  var paddleX22 = pObjA[3][1][1].x;
  var paddleY21 = pObjA[3][0][0].y;
  var paddleY22 = pObjA[3][0][2].y;

  var smallFarPaddleX = Math.min(paddleX21,paddleX22);
  var bigFarPaddleX = Math.max(paddleX21,paddleX22);
  var smallFarPaddleY = Math.min(paddleY21,paddleY22);
  var bigFarPaddleY = Math.max(paddleY21,paddleY22);

  var paddleFarZ = pObjA[3][0][0].z;

  var ballProp = pProp[1];
  var ballY = pObjA[1][0][2].y;

  if ((ballX > smallPaddleX  && ballX < bigPaddleX) && (ballY > smallPaddleY && ballY < bigPaddleY) && dragonBallZ > paddleZ && !goBack)
  {
    goBack = true
    console.log("Intersection happened! ","theta ",heroPaddleTheta);
    var R = Math.abs(ballProp.x);
    ballProp.x *= -1;
    var r2y = -R * Math.sin(2 * heroPaddleTheta);
    var r2x = R * Math.cos(2 * heroPaddleTheta);
    console.log("new x velocity ",r2x,"new y velocity ",r2y);
    ballProp.x = r2x;
    ballProp.y = r2y;


  }
  else if ((ballX > smallFarPaddleX && ballX < bigFarPaddleX) && (ballY > smallFarPaddleY && ballY < bigFarPaddleY) &&(dragonBallZ > paddleFarZ))
  {
    ballProp.x *= -1;
  }
  else if (ballX > initTablePos.x + tableDepth + 100)
  {
    player1Score ++;
    pProp[1].x = -5;
    startPoint();
  }
  else if (ballX < 15)
  {
    player2Score ++;
    pProp[1].x = 5;
    startPoint();
  }
}
function startPoint()
{
  var tempArray = pObjA.splice(0,2);
  tempArray.pop();
  transform(300,100,groundHeight - paddleHeight - 5,ball3d,0,0,0,1000,1000,500,-5,0,0);
  pProp.pop();
  tempArray.push(pObjA.pop());
  pObjA = tempArray.concat(pObjA);
  ballMove = pObjA[1];
  pProp[1].y = 0;
  goBack = false;
  $("#gameOver").text("Player one has " + player1Score + " Player two has " + player2Score);
}
function gameOver1()
{
  if (player1Score === 10)
  {
      pProp[1].x = 0;
      pProp[1].y = 0;
      $("#gameOver").text("Game over!!! Player 1 is the winner");
  }
  else if (player2Score === 10)
  {
      pProp[1].x = 0;
      pProp[1].y = 0;
      $("#gameOver").text("Game over!!! Player 2 is the winner");
  }
}
