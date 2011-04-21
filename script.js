$(document).ready(function(){
	var o1=new Obj();
	var o2=new Obj();
	var o3=new Obj();
	
	o1
		.addPoint([1,1,0])
		.addPoint([1,-1,0])
		.addPoint([-1,-1,0])
		.addPoint([-1,1,0]);

	var pos=new Vector(1,3,10);
	var look_at=new Vector(0,0,0);
	var c=new Camera(pos,look_at,0,0.1);
	
	var w=new World("#screen");
	
	w.addObject(o1).addCamera(c).render();
});
