$(document).ready(function(){
	var o1=new Obj();
	var o2=new Obj();
	var o3=new Obj();
	
	o1
		//.addLine([0,0,-5],[0,0,5],20,"L","#ff0000")
		/*.addLine([-1,-1,-1],[-1,-1, 1],5,"Z","#ff0000")
		.addLine([-1, 1,-1],[-1, 1, 1],5,"Z","#ff0000")
		.addLine([ 1,-1,-1],[ 1,-1, 1],5,"Z","#ff0000")
		.addLine([ 1, 1,-1],[ 1, 1, 1],5,"Z","#ff0000")
		
		/*.addLine([-1,-1,-1],[ 1,-1,-1],5,"X","#00ff00")
		.addLine([-1, 1,-1],[ 1, 1,-1],5,"X","#00ff00")
		.addLine([-1,-1, 1],[ 1,-1, 1],5,"X","#00ff00")
		.addLine([-1, 1, 1],[ 1, 1, 1],5,"X","#00ff00")//*/
		
		/*.addLine([-1,-1,-1],[-1, 1,-1],5,"Y","#0000ff")
		.addLine([-1,-1, 1],[-1, 1, 1],5,"Y","#0000ff")
		.addLine([ 1,-1,-1],[ 1, 1,-1],5,"Y","#0000ff")
		.addLine([ 1,-1, 1],[ 1, 1, 1],5,"Y","#0000ff")//*/
		
		.addSphere([0,0,0],0.5,4,"O","#000000")//*/
		;
	
	var pos=new Vector(3,2,2);
	var look_at=new Vector(0,0,0);
	var c=new Camera(pos,look_at,0,2);
	
	var w=new World("#screen");
	
	w.addObject(o1).addCamera(c);
	
	if (window.DeviceMotionEvent==undefined) {
		$("#screen").mousemove(function(e){
			XX=e.originalEvent.layerX;
			YY=e.originalEvent.layerY;

			w.camera(0).position([(XX-300)/30,(YY-200)/20,10]);
			w.render();
			$(this).append("pesco");
		});
	} else {
		window.ondevicemotion = function(event) {
			var ax = event.accelerationIncludingGravity.x;
			var ay = event.accelerationIncludingGravity.y;
			var az = event.accelerationIncludingGravity.z;
			
			//$("#screen").html("["+ax+","+ay+","+az+"]");
			
			w.camera(0).position([ax,ay,az]);
			w.render();//*/
		}
	}
});
