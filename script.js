$(document).ready(function(){
	var o1=new Obj();
	var o2=new Obj();
	var o3=new Obj();
	
	o1.
		addPoint([-1, 0,-1]).
		addPoint([ 1, 0,-1]).
		addPoint([ 1, 0, 1]).
		addPoint([-1, 0, 1]);
		
	o2.
		addPoint([0, -1,-1]).
		addPoint([0,  1,-1]).
		addPoint([0,  1, 1]).
		addPoint([0, -1, 1]);
		
	o3.
		addPoint([-1,-1, 0]).
		addPoint([ 1,-1, 0]).
		addPoint([ 1, 1, 0]).
		addPoint([-1, 1, 0]);
		
	var pos=new Vector(0,0,20);
	var look_at=new Vector(0,0,0);
	var c=new Camera(pos,look_at,0,10);
	
	var w=new World();
	
	w.addObject(o1).addObject(o2).addObject(o3).addCamera(c).render();
});
