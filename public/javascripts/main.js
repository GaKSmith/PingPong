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
        }
    });
});
$("#reset").click(function(){
    socket.emit("reset");
});

socket.on("resett",function(){
    location.href = "http://localhost:3000";
});

socket.on("state request",function(){
    if(whoAmI === 1)
    {
        socket.emit("send paddles",pObjA[0],pProp[0],randomNumber);      
    }
    else if (whoAmI ===2)
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

$(document).on("keydown",function(e){
    var keyCode = e.keyCode;
    var deltaX;
    var deltaY;
    var theta;
    var phi;
    if (keyCode === 37)
    {
        deltaY = -20; 
    }
    else if (keyCode === 39)
    {
        deltaY = 20;
    }
    else if (keyCode === 65)
    {
        pProp[playerIndex].zA += -1;
    }
    else if (keyCode === 83)
    {
        pProp[playerIndex].zA += 1;
    }
    if(keyCode === 37 || keyCode === 39)
    {
        pObjA[playerIndex].forEach(function(face,faceIndex){
            face.forEach(function(point,pointIndex){
                pObjA[playerIndex][faceIndex][pointIndex].y += deltaY;
            });
        });
    }
    if (keyCode === 38)
    {
        deltaX = 20; 
    }
    else if (keyCode === 40)
    {
        deltaX = -20;
    }
    if(keyCode === 38 || keyCode === 40)
    {
        pObjA[playerIndex].forEach(function(face,faceIndex){
            face.forEach(function(point,pointIndex){
                pObjA[playerIndex][faceIndex][pointIndex].x += deltaX;
            });
        });
        console.log("Player index is ",playerIndex);
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
var paddle3d = cuboidMaker(paddleWidth,paddleDepth,paddleHeight);
var ball3d = cuboidMaker(10,10,10);
var test3dHeight = 10;
var test3d = cuboidMaker(10,10,test3dHeight);
var tableWidth = 500;
var tableHeight = 5;
var tableDepth = 500;
var groundHeight = 100;
var enemyPaddle = cuboidMaker(paddleWidth,paddleDepth,paddleHeight);

var table = cuboidMaker(tableWidth,tableDepth,tableHeight);
transform(25,100,groundHeight - paddleHeight,paddle3d,0,0,0,1000,1000,500,0,0,0);
transform(200,100,groundHeight - paddleHeight - 5,ball3d,0,0,0,1000,1000,500,-5,2,0);
transform(25,100,groundHeight,table,0,0,0,1000,1000,500,0,0,0);
transform(tableDepth,100,groundHeight - paddleHeight,paddle3d,0,0,0,1000,1000,500,0,0,0);
// transform(50,100,groundHeight - test3dHeight,test3d,0,0,0,1000,1000,500,0,0,0);
// transform(100,100,groundHeight -test3dHeight,test3d,0,0,0,1000,1000,500,0,0,0);
// transform(250,100,groundHeight -test3dHeight,test3d,0,0,0,1000,1000,500,0,0,0);
var ballMove = pObjA[1];

function sketchDepth()
{
    for(var i = pObjA[2][0][0].x; i < pObjA[2][1][1].x; i += 40)
    {
        var groundHeight = 100;
        var y1 = pObjA[2][0][0].y;
        var y2 = pObjA[2][0][2].y;
        var z = groundHeight;

        var gy1 = pointConvert(i,y1);
        var gz1 = pointConvert(i,z);
        var gy2 = pointConvert(i,y2);
        var gz2 = pointConvert(i,z);

        context.beginPath();
        context.moveTo(gy1, gz1);
        context.lineTo(gy2, gz2);
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

    var g1y = pointConvert(ballX,ballY);
    var g1z = pointConvert(ballX,groundHeight);

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
    context.arc(x,y,r,0,2 * PI);
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

    var a = (z2 - z1) /(x2 - x1);
    var b = z1 - a * x1; 
    var c = (z2 - z1) / (y2 - y1);
    var d = z1 - c * y1;

    return [a,b,c,d];
}

function intersectionChecker()
{
    var paddleX = pObjA[0][0][0].x;
    var ballX = pObjA[1][0][0].x;
    var paddleZ = pObjA[0][0][0].z;
    var dragonBallZ = pObjA[1][0][2].z;
    var paddleY = pObjA[0][0][0].y;
    var ballY = pObjA[1][0][2].y;

    var paddleFarX = pObjA[3][0][0].x;
    var paddleFarY = pObjA[3][0][0].y;
    var paddleFarZ = pObjA[3][0][0].z;

    var ballProp = pProp[1];

    // if (ballX < paddleX)
    // {
    //     ballProp.x = 0;
    //     ballProp.y = 0;
    // }
    // console.log("ball is lower ",ballZ > paddleZ," ballz ",ballZ," paddlez ",paddleZ);
    if ((ballX < paddleX + paddleDepth && ballX > paddleX) && dragonBallZ > paddleZ && (ballY > paddleY && ballY < paddleY + paddleWidth))
    {
        ballProp.x *= -1;
        // console.log("ballX is ",ballX,"paddleX ",paddleX);
        // ballProp.x = 0;
    }
    else if ((ballX < paddleFarX + paddleDepth && ballX > paddleFarX) && (ballY > paddleFarY && ballY < paddleFarY + paddleWidth) &&(dragonBallZ > paddleFarZ))
    {
        ballProp.x *= -1;
        // console.log("ballX is ",ballX,"paddleX ",paddleX);
        // ballProp.x = 0;
    }
}
$("canvas").click(function(){
    var ballProp = pProp[1];
    if (ballProp.x === 0)
    {
        // ballProp.x = -5
    }
    else
    {
        // ballProp.x = 0;
    }   
});