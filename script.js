$(document).ready(function(){
	var o=new Obj();
	
	o.addPoint([-1,-1,-1]).
		addPoint([-1, 1,-1]).
		addPoint([-1,-1, 1]).
		addPoint([ 1,-1,-1]).
		transform().
			translate(1,2,3).
			rotateX("30Deg").
			translate(-1,-2,-3).
			rotateY("-30deg");
		
	console.log(o.points());
});
