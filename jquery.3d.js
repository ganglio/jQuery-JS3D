(function($){
	$.js3d = $.js3d || {version: "1.0.0"};
	
	$.js3d.default = {
		conf : {
			maxZ: 0,
		}
	};

	function JS3D(elem, conf) {
		var
			self = this,
			fire = elem.add(self),
			points = [],
			matrix=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
			
		var PHI = 1.61803398874989484820458683;
		var PHI_INV = 1/PHI;
					
		$.extend(self,{
		
			paint: function() {
				for(var i = 0; i<points.length; i++) {
					self.drawPoint(i);
				}
			},
			
			addPoint: function(x,y,z,text) {
				var l = points.length;
				points[l]=new self.Point(x,y,z,text);
				return self;
			},
			
			addPointV: function(v,text) {
				self.addPoint(v[0],v[1],v[2],text);
			},
			
			clearPoints: function() {
				for (var i = 0; i <points.length; i++) {
					points[i].div.remove();
				}
				points.length=0;
			},
			
			drawPoint: function(index) {
				var tPoint = self.multV(matrix,points[index].x,points[index].y,points[index].z,points[index].W);
				if (tPoint[0] < 0 ||
						tPoint[0] > elem.width() ||
						tPoint[1] < 0 ||
						tPoint[1] > elem.height() ||
						tPoint[2] >= conf.maxZ) {
						points[index].div.css({"visibility":"hidden"});
					return;
				}
				points[index].div.css({
					"visibility":"visible",
					"left":tPoint[0]+"px",
					"top":tPoint[1]+"px",
					"fontSize":5000/(-tPoint[2])+"px",
					"position":"absolute"
				});
			},

			resetMatrix: function() {
				matrix = self.identity();
				self.translate(elem.width()/2,elem.height()/2,0);
				return self;
			},

			Point: function(x, y, z, text) {
				this.x = x;
				this.y = y;
				this.z = z;
				this.W = 1;
				this.div = $("<div class='point' style='visibility:hidden'>"+(text?text:"*")+"</div>");
				elem.append(this.div);
			},
			
			identity: function() {
				return [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
			}
		});
	}
	
	// jQuery plugin initialization
	$.fn.js3d = function(conf) {   
		
		// already constructed --> return API
		var el = this.data("js3d");
		if (el) { return el; }
		
		conf = $.extend(true, $.js3d.default.conf, conf);
		
		this.each(function() {
			el = new JS3D($(this), conf);
			$(this).data("js3d", el).css({"position":"relative"});
		});
		
		return el;
	};
})(jQuery);

function Point(xx,yy,zz,text,elem) {
	var
		self=this,
		X=xx,
		Y=yy,
		Z=zz,
		div=jQuery("<div class='point' style='visibility:hidden'>"+(text?text:"*")+"</div>");
	
	if (elem)
		elem.append(div);
}


/**
 * Vector
 * Implements a simple vector object
 *
 * Methods:
 *   length - returns the vector lenght
 *   normalize - returns the normalized vector
 *   multV - crossproduct of the vector by another one
 *   multM - multiply the vector by an affine matrix
 */
function Vector(xx,yy,zz) {
	var
		self=this,
		X=xx[0]?xx[0]:xx,
		Y=xx[0]?xx[1]:yy,
		Z=xx[0]?xx[2]:zz;
		
	jQuery.extend(self,{
	
		// the 
		length: function() {
			return Math.sqrt(X*X+Y*Y+Z*Z);
		},
		
		// normalize the vector
		normalize: function() {
			return new Vector(X/self.length(),Y/self.length(),Z/self.length());
		},
		
		// cross product of the vector by another one
		multV: function(v) {
			return new Vector(
				Y*v.Z-v.Y*Z,
				v.X*Z-X*v.Z,
				X*v.Y-v.X*Y
			);
		},
		
		// Multiply the vector by an affine matrix
		multM: function(mm) {
			var m=mm.M?mm.M:mm;
			return new Vector(
				m[0][0]*X + m[0][1]*Y + m[0][2]*Z + m[0][3],
				m[1][0]*X + m[1][1]*Y + m[1][2]*Z + m[1][3],
				m[2][0]*X + m[2][1]*Y + m[2][2]*Z + m[2][3]
			);
		},
		
		// the coordinates
		'X': X,
		'Y': Y,
		'Z': Z
	});
}

/**
 * Matrix
 * Implements a simple affine matrix object
 *
 * Methods:
 *   mult - multiply the matrix by another
 *   add - add the matrix to another
 */
function Matrix(mm) {
	var
		self=this,
		M=mm;
		
	jQuery.extend(self,{
		mult: function(mm) {
			var m=mm.M?mm.M:mm;
			
			var result = new Array(4);
			for (var i = 0; i<4;i++) {
				result[i] = new Array(4);
			}
			
			for(var i = 0; i < 4; i++){
				result[i][0] = M[i][0] * m[0][0] + M[i][1] * m[1][0] + M[i][2] * m[2][0] + M[i][3] * m[3][0];
				result[i][1] = M[i][0] * m[0][1] + M[i][1] * m[1][1] + M[i][2] * m[2][1] + M[i][3] * m[3][1];
				result[i][2] = M[i][0] * m[0][2] + M[i][1] * m[1][2] + M[i][2] * m[2][2] + M[i][3] * m[3][2];
				result[i][3] = M[i][0] * m[0][3] + M[i][1] * m[1][3] + M[i][2] * m[2][3] + M[i][3] * m[3][3];
			}
			
			return new Matrix(result);
		},
		
		add: function(mm) {
			var m=mm.M?mm.M:mm;
			
			var result = new Array(4);
			for (var i = 0; i<4;i++) {
				result[i] = new Array(4);
			}
			
			for (var i=0; i<4; i++)
				for (var j=0; j<4; j++)
					result[i][j]=M[i][j]+m[i][j];

			return new Matrix(result);
		},
		
		// the matrix
		'M': M
	});
}

/**
 * Obj
 * Implements a list of points as an object
 *
 * Methods:
 *
 */
function Obj(tt) {
	var
		self=this;
		points=new Array(),
		T=tt?(tt.T?tt:new Transformation(tt,this)):new Transformation(null,this);
		
	jQuery.extend(self,{
		
		addPoint: function(v) {
			var l=points.length;
			points[l]=v.X?v:new Vector(v);
			
			return self;
		},
		
		length: function(){
			return points.length;
		},
		
		bounding: function() {
			var mX=1e9,mY=1e9,mZ=1e9,MX=-1e9,MY=-1e9,MZ=-1e9;
			var pts=self.points();
			
			for (var i=0; i<pts.length; i++) {
				mX=Math.min(mX,pts[i].X);
				mY=Math.min(mY,pts[i].Y);
				mZ=Math.min(mZ,pts[i].Z);
				
				MX=Math.max(MX,pts[i].X);
				MY=Math.max(MY,pts[i].Y);
				MZ=Math.max(MZ,pts[i].Z);
			}
			
			return {
				min:new Vector(mX,mY,mZ),
				max:new Vector(MX,MY,MZ)
			};
		},
		
		size: function() {
			var b=self.bounding();
			return new Vector(b.max.X-b.min.X,b.max.Y-b.min.Y,b.max.Z-b.min.Z);
		},
		
		// points
		points: function(i) {
			if (i!=undefined) {
				return points[i].multM(T.T());
			} else {
				var pts=new Array();
				for (var i=0; i<points.length; i++)
					pts[i]=points[i].multM(T.T());
				return pts;
			}
		},
		transform:function(){return T;}
	});
}

function Transformation(mm,e) {
	var
		self=this,
		T=mm?(mm.M?mm:new Matrix(mm)):new Matrix([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]),
		parent=e;
		
		jQuery.extend(self,{
			
			rotateX: function(angle) {
				var c = Math.cos(self.angle2rad(angle));
				var s = Math.sin(self.angle2rad(angle));
				
				T=T.mult([[1, 0, 0, 0],[0, c, -s, 0],[0, s, c, 0],[0, 0, 0, 1]]);
				
				return self;
			},
			
			rotateY: function(angle) {
				var c = Math.cos(self.angle2rad(angle));
				var s = Math.sin(self.angle2rad(angle));
				
				T=T.mult([[c, 0, s, 0],[0, 1, 0, 0],[-s, 0, c, 0],[0, 0, 0, 1]]);
				
				return self;
			},
			
			rotateZ: function(angle) {
				var c = Math.cos(self.angle2rad(angle));
				var s = Math.sin(self.angle2rad(angle));
				
				T=T.mult([[c, -s, 0, 0],[s, c, 0, 0],[0, 0, 1, 0],[0, 0, 0, 1]]);
				
				return self;
			},
			
			scale: function(sx,sy,sz) {
				T=T.mult([[sx, 0, 0, 0],[0, sy, 0, 0],[0, 0, sz, 0],[0, 0, 0, 1]]);
				return self;
			},
			
			translate: function(tx,ty,tz) {
				T=T.mult([[1, 0, 0, tx],[0, 1, 0, ty],[0, 0, 1, tz],[0, 0, 0, 1]]);
				return self;
			},
			
			angle2rad: function(angle) {
				angle=angle.toLowerCase();
				if (String(angle).indexOf("deg")!=-1)
					angle=angle.substr(0,angle.length-3)*Math.PI/180;
				else if (String(angle).indexOf("grad")!=-1)
					angle=angle.substr(0,angle.length-4)*Math.PI/200;
				else if (String(angle).indexOf("rad")!=-1)
					angle=angle.substr(0,angle.length-3)*1.0;
				return angle;
			},
			
			'T':function(){return T.M},
			object:function(){return parent;}
		});
}
