console.log("sup bro");
var gravityOn = true;

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
        pProp[0].zA += -1;
    }
    else if (keyCode === 83)
    {
        pProp[0].zA += 1;
    }
    if(keyCode === 37 || keyCode === 39)
    {
        pObjA[0].forEach(function(face,faceIndex){
            face.forEach(function(point,pointIndex){
                pObjA[0][faceIndex][pointIndex].y += deltaY;
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
        pObjA[0].forEach(function(face,faceIndex){
            face.forEach(function(point,pointIndex){
                pObjA[0][faceIndex][pointIndex].x += deltaX;
            });
        });
    }
    if(keyCode === 65 || keyCode === 83)
    {
        var xRot1z = pObjA[0][0][0].z;
        var xRot2z = pObjA[0][0][1].z;
        pProp[0].zF = (xRot1z + xRot2z) /2;

        var xRot1y = pObjA[0][0][0].y;
        var xRot2y = pObjA[0][0][1].y;
        pProp[0].yF = (xRot1y + xRot2y) /2;

        var xRot1x = pObjA[0][0][0].x;
        var xRot2x = pObjA[0][0][1].x;
        pProp[0].xF = (xRot1x + xRot2x) /2;
    }
});
var paddle3d = cuboidMaker(50,10,50);
var ball3d = cuboidMaker(10,10,10);
var paddleWidth = 500;
var paddleHeight = 5;
var paddleDepth = 500;
var table = cuboidMaker(paddleWidth,paddleDepth,paddleHeight);
transform(100,300,300,paddle3d,0,0,0,1000,1000,500,0,0,0);
transform(500,400,0,ball3d,0,0,0,1000,1000,500,0,0,0);
transform(25,300,300,table,0,0,0,1000,1000,500,0,0,0);
var time = 0;
v0 = 0;
var bounce = 0;
var gameOver = false;
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

        if(pObjA[1][0][0].z > 300)
        {
            bounce ++;
            var amountBelow = pObjA[1][0][0].z - 300;
            pObjA[1].forEach(function(face,faceIndex){
                face.forEach(function(point,pointIndex){
                    pObjA[1][faceIndex][pointIndex].z -= amountBelow;
                });
            });

            if (bounce === 2)
            {
                gameOver = true;
                $("#gameOver").text("Game over");
                console.log("Game is over");
            }
            
            v0 = .5 * (g * (time -1) -v0);
            time = 0;
        }
    }
}