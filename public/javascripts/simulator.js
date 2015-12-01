var pObjA = [];
var pProp = [];

var D = 500;
var t = 0;
var counter = 0;
var PI = Math.PI;
var dTheta = PI/256;

var sphere2 = [];
sphere2 = sphereMaker(100);
var cuboid70 = cuboidMaker(300,200,100);
var canvas = document.getElementById("c");
context = canvas.getContext("2d");
var clickState = 0;
var origin = {x:0,y:0,z:0};
// origin.z = -380;
origin.x = 240;
origin.y = 50;
origin.z = -80;

function copy(arr)
{
	return arr.concat([]);
}

function miniRotate(q,xA,yA,zA,xF,yF,zF,theta)
{
	console.log("Minirotate was called");
	var objArray = [];
	objArray.push(q);
	var vMini = []
	vMini.push({xA:xA,yA:yA,zA:zA,xF:xF,yF:yF,zF:zF});
	var holder = dTheta;
	dTheta = theta;
	turn(objArray,vMini)
	dTheta = holder;
}

function displacer (q,d1,d2,d3)
{
	q.forEach(function(qSubA){
		qSubA.forEach(function(qPoint){

			qPoint.x += d1;
			qPoint.y += d2;
			qPoint.z += d3;
		});
	});

	return q;
}

function cuboidMaker(length,width,height)
{
	var face1 = [{x:0,y:0,z:0},{x:0,y:width,z:0},{x:0,y:width,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
	var face2 = [{x:0,y:width,z:0}, {x:length,y:width,z:0},{x:length,y:width,z:height},{x:0,y:width,z:height},{x:0,y:width,z:0}];
	var face3 = [{x:length,y:width,z:0},{x:length,y:0,z:0},{x:length,y:0,z:height},{x:length,y:width,z:height},{x:length,y:width,z:0}];
	var face4 = [{x:length,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:height},{x:length,y:0,z:height},{x:length,y:0,z:0}];
	var face5 = [{x:0,y:width,z:height},{x:length,y:width,z:height},{x:length,y:0,z:height},{x:0,y:0,z:height},{x:0,y:width,z:height}];
	var face6 = [{x:length,y:width,z:0},{x:0,y:width,z:0},{x:0,y:0,z:0},{x:length,y:0,z:0},{x:length,y:width,z:0}];

	return [face1,face2,face3,face4,face5,face6];
}

function combiner (object1,object2)
{
	return object1.concat(object2);
}

function sphereMaker(r)
{
	var j = 0;
	var sphere = [];
	for(var m =-r;m<=r;m+=r/10)
	{
		sphere.push([])
		sphere.push([])
		var r2 = Math.sqrt(r*r-m*m);

		for (var n = -Math.sqrt(r*r-m*m);n<=Math.sqrt(r*r-m*m);n+=4)
		{
			var y2 = Math.sqrt(r2*r2-n*n);
			sphere[j+1].push({x:n,y:y2,z:m});
			sphere[j].push({x:n,y:-y2,z:m});
		}

		sphere[j+1].push({x:Math.sqrt(r*r-m*m),y:0,z:m});
		sphere[j].push({x:Math.sqrt(r*r-m*m),y:0,z:m});

		j += 2;
	}
	return sphere;
}
function a(num)
{
	return Math.abs(num)
}

function turn (objA,pProp)
{
	objA.forEach(function(p,l){

		var pPrime = [];

		p.forEach(function(face,m){

			var proxyArray = [];
			pPrime.push(proxyArray);
			face.forEach(function(pPoint,n){
				var prop = pProp[l];

				var xRot = mathTurn(prop.xA,prop.yF,prop.zF,pPoint.y,pPoint.z);

				 pPoint.y = xRot.a;
				 pPoint.z = xRot.b;

				var yRot = mathTurn(prop.yA,prop.xF,prop.zF,pPoint.x,pPoint.z);

				pPoint.x = yRot.a;
				pPoint.z = yRot.b;

				var zRot = mathTurn(prop.zA,prop.xF,prop.yF,pPoint.x,pPoint.y);

				pPoint.x = zRot.a;
				pPoint.y = zRot.b;

				function mathTurn(A,F1,F2,v1,v2)
				{
					var prime1 = (v1 - F1) * Math.cos(A * dTheta) - (v2 - F2) * Math.sin(A * dTheta) + F1;
					var prime2 = (v2 - F2) * Math.cos(A * dTheta) + (v1 - F1) * Math.sin(A * dTheta) + F2;

					return {a:prime1,b:prime2};
				}
			});
		});
	});
}

function move(pA)
{
	var l = 0;
	pA.forEach(function(pObject){
		var propV = pProp[l];

		pObject.forEach(function(pSubA){
			pSubA.forEach(function(pPoint){

				pPoint.x += propV.x;
				pPoint.y += propV.y;
				pPoint.z += propV.z;
			});
		});
		l++;
	});
}

function pointConvert(x,w,l)
{
  //l takes on either a value of 'y' or 'z'
  x -= origin.x;
  w -= origin[l];

  if (l === 'y')
  {
    xTemp = ((x - axisRot.x) * Math.cos(thetaView) - (w - axisRot[l]) * Math.sin(thetaView)) + axisRot.x;
    var wTemp = ((w - axisRot[l]) * Math.cos(thetaView) + (x - axisRot.x) * Math.sin(thetaView)) + axisRot[l];
    return  wTemp * D / (xTemp + D);
  }
  else
  {
    return  w * D / (xTemp + D);
  }
}

function draw(pA)
{
	function graphPart2(faceArray2d,piq)
	{
		if (checksIfBehind(faceArray2d,piq))
		{
			faceArray2d.forEach(function(point2d,index){
				if(index === faceArray2d.length -1)
				{
					var gy1 = point2d.x;
					var gz1 = point2d.y;
					var gy2 = faceArray2d[0].x;
					var gz2 = faceArray2d[0].y;
				}
				else
				{
					var gy1 = point2d.x;
					var gz1 = point2d.y;
					var gy2 = faceArray2d[index + 1].x;
					var gz2 = faceArray2d[index + 1].y;
				}
				// if (x1 > - D)
				// {
					context.beginPath();
          context.moveTo(gy1 + 100, gz1);
          context.lineTo(gy2 + 100, gz2);
          context.lineWidth = .3;
          context.closePath();
          context.strokeStyle = 'black';
          context.stroke();
		        // }
			});
		}
	}

	pA.forEach(function(pObject,l){              //pA - Array of objects
		pObject.forEach(function(pFace,m){         //pObject Physical object
			work = 0;
			var face2d = [];
			for(var n = 0; n < pFace.length - 1; n ++)
			{
				var pPoint = pFace[n];
				var pPoint1 =  pFace[n + 1];
				var x1 = pPoint.x;
				var x2 = pPoint1.x;
				var y1 = pPoint.y;
				var y2 = pPoint1.y
				var z1 = pPoint.z;
				var z2 = pPoint1.z;

				var gy1 = pointConvert(pFace[n].x,pFace[n].y,'y');
				var gz1 = pointConvert(pFace[n].x,pFace[n].z,'z');
				face2d.push({x : gy1, y : gz1});
			}
      //the following is for finding the point in the middle of the face which will be used for determining
      //orientation of the face
			var point2D1x = pointConvert(pFace[0].x,pFace[0].y,'y');
			var point2D1y = pointConvert(pFace[0].x,pFace[0].z,'z');
			var point2D2x = pointConvert(pFace[2].x,pFace[2].y,'y');
			var point2D2y = pointConvert(pFace[2].x,pFace[2].z,'z');

			var piqx = (point2D1x + point2D2x) / 2;
			var piqy = (point2D1y + point2D2y) / 2;

			checksIfBehind(face2d,{x : piqx, y: piqy});
			graphPart2(face2d,{x:piqx,y:piqy});
		});
	});
}
function checksIfBehind(face,piq)
{
	var dw = 0;
	var work = 0;

	face.forEach(function(point,index){
		var lastPoint = face.length -1;
		if (index === lastPoint)
		{
			//use the first point
			doWork(point,face[0]);
		}
		else
		{
			doWork(point,face[index + 1])
		}
	});
	function doWork(point1,point2)
  {
  	var x3 = point1.x;
		var y3 = point1.y;
		var x4 = point2.x;
		var y4 = point2.y;
    var x1 = x3 - piq.x;
    var x2 = x4 - piq.x;
    var y2 = y4 - piq.y;
    var y1 = y3 - piq.y;

    if (x2 - x1 === 0)
    {
       x2 += .000000000001
    }
    var m = (y2 - y1) / (x2 - x1);
    var m2 = m * m;
    var b = y2 - (m * x2);
    if (b !== 0)
    {
      var A = b / (m2 + 1);
      var arg1 = (x1 + m * b / (m2 + 1)) / A;
      var arg2 = (x2 + m * b / (m2 + 1)) / A;
      var dW = -(Math.atan(arg2) - Math.atan(arg1));
    }
    else if (b === 0)
    {
      dW = 0;
    }

    work += dW;
  }

  if(Math.round(work) === 6)
  {
  	return true;
  }
}
function transform(dis1,dis2,dis3,q,xA,yA,zA,XF,YF,ZF,Vx,Vy,Vz)
{
	pProp.push({xA:xA,yA:yA,zA:zA,d1:dis1,d2:dis2,d3:dis3,xF:XF,yF:YF,zF:ZF,x:Vx,y:Vy,z:Vz});
	createP(q,pProp);
}

function animate()
{
  if (michaelBay)
  {
    thetaView += PI / 256;
  }
	t += .01;
	context.clearRect(0, 0, canvas.width, canvas.height);
  checkOutOfBounds();
	move(pObjA);
	turn(pObjA,pProp);
	draw(pObjA);
	gravity();
	intersectionChecker();
	sketchDepth();
	shadow();
	gameOver1();
  calculateTheta();
	if (adjustAxes)
	{
		changeRotAxes();
	}
}

function createP(q)
{
	var p = [];
	var l = pProp.length - 1;

	q.forEach(function(qSubA){
		var pArray = [];
		p.push(pArray);

		qSubA.forEach(function(qPoint){
			var prop = pProp[l];
			pArray.push({x: qPoint.x + prop.d1, y: qPoint.y + prop.d2, z:qPoint.z + prop.d3});
		});
	});

	pObjA.push(p);
}

var interval = setInterval(animate, 1000 / 20);
