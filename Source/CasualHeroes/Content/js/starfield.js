"use strict";
// bitsnbites.eu

// NB. uses serverside to convert (("..."))) into one-line strings

jss.b3d={
	mVertexSrcs:[(("\
		attribute vec2 p;\
		void main(){\
			gl_Position=vec4(p,0,1);\
		}\
")),(("\
		uniform float t,mx,my;\
		attribute vec3 p;\
		void main(){\
			vec3 q=p;\
			q.x=fract(q.x+mx);q.y=fract(q.y+my); q.z=fract(q.z-t/19.);\
			gl_PointSize=5.-5.*q.z;\
			gl_Position=vec4(2.*q.xy-1.,q.z,q.z);\
		}\
"))],
	mFragmentSrcs:[(("\
		precision highp float;uniform float t;uniform vec2 r;\
		void main(){\
			vec2 p=gl_FragCoord.xy/r.xy-.5;\
			float s=length(p), a=atan(p.y,p.x), c=cos(19.*a+8.3*t)+cos(7.*a-.7*t)+cos(3.*a-3.3*t);\
			vec3 col=vec3(1,.8,.6)*min(1.,t)*max(0.,c)*s*s*s;\
			gl_FragColor=vec4(col*1.,1);\
		}\
")),(("\
		precision highp float;uniform float t;\
		void main(){\
			gl_FragColor=vec4(.7, .6, 1, min(124.,t-3.));\
		}\
"))],
	mProgramSrcs:[ [0,0],[1,1] ], // Raster & background; Stars
	// Misc global variables
	gl:null, mCanvas:dce('canvas',0,'b3dC','pfx zero'),
	mWidth:0, mHeight:0, mVertBuf1:null, mVertBuf2:null,
	mVertBuf3:null, mVertBuf4:null, mNumStarVertices:5000,
	mPrograms:[],
	VERTEX_SHADER:0x8B31, FRAGMENT_SHADER:0x8B30, ARRAY_BUFFER:0x8892, STATIC_DRAW:0x88E4,
	POINTS:0, TRIANGLE_STRIP:5, FLOAT:0x1406, BLEND:0x0BE2,
	SRC_ALPHA:0x0302, ONE_MINUS_SRC_ALPHA:0x0303, DEPTH_BUFFER_BIT:0x00000100,
	getLoc:function(prog, id) {return jss.b3d.gl.getUniformLocation(prog, id)},
	mStartT:0,
	getTime:function(){
		var t=(new Date()).getTime()*0.001;if(jss.b3d.mStartT<1)jss.b3d.mStartT=t;return t-jss.b3d.mStartT;
	},
	main:function() {
		var b3=jss.b3d,anim=Win[jss.nav.pf+'RequestAnimationFrame'||Win.requestAnimationFrame];
		if(anim)anim(jss.b3d.main);else setTimeout(jss.b3d.main,22);
		var w=jss.x1,h=jss.y1;
		if(w!=b3.mWidth||h!=b3.mHeight) {
			b3.mCanvas.width=w; b3.mCanvas.height=h; b3.gl.viewport(0,0,w,h); b3.mWidth=w; b3.mHeight=h;
		}
		var t=b3.getTime(),prog=b3.mPrograms[0];
		b3.gl.clear(b3.DEPTH_BUFFER_BIT);
		// Draw background screen
		b3.gl.useProgram(prog);
		b3.gl.uniform1f(b3.getLoc(prog,"t"), t);
		b3.gl.uniform2f(b3.getLoc(prog,"r"), w, h);
		b3.gl.enableVertexAttribArray(0);

		b3.gl.bindBuffer(b3.ARRAY_BUFFER, b3.mVertBuf1);
		b3.gl.vertexAttribPointer(0, 2,b3.FLOAT, false, 0, 0); // position
		b3.gl.drawArrays(b3.TRIANGLE_STRIP, 0, 4);

		// Draw stars
		b3.gl.useProgram(b3.mPrograms[1]);
		b3.gl.uniform1f(b3.getLoc(b3.mPrograms[1], "mx"), -.03*((mice.x/jss.x1)-.5));
		b3.gl.uniform1f(b3.getLoc(b3.mPrograms[1], "my"), .01*((mice.y/jss.x1)-.5));
		b3.gl.uniform1f(b3.getLoc(b3.mPrograms[1],"t"), t);
		b3.gl.bindBuffer(b3.ARRAY_BUFFER, b3.mVertBuf3);
		b3.gl.vertexAttribPointer(0, 3,b3.FLOAT, false, 0, 0); // 3D position
		b3.gl.drawArrays(b3.POINTS, 0, b3.mNumStarVertices);
	}
};

// App startup
jss.b3d.attach3d=function(){
	var b3=jss.b3d;
	// Init WebGL context
	b3.mCanvas.style.zIndex=-99;WD.body.appendChild(b3.mCanvas);
	try{b3.gl=b3.mCanvas.getContext('experimental-webgl')||b3.mCanvas.getContext('webgl')}
	catch(e){b3.gl=false}if(!b3.gl)return kile('b3dC');
	// Init shaders
	for(var k=0;k<b3.mProgramSrcs.length;++k){
		var prg = b3.gl.createProgram();
		var j = b3.gl.createShader(b3.VERTEX_SHADER);
		b3.gl.shaderSource(j, b3.mVertexSrcs[b3.mProgramSrcs[k][0]]);
		b3.gl.compileShader(j); b3.gl.attachShader(prg, j);

		j = b3.gl.createShader(b3.FRAGMENT_SHADER);
		b3.gl.shaderSource(j,b3.mFragmentSrcs[b3.mProgramSrcs[k][1]]);
		b3.gl.compileShader(j); b3.gl.attachShader(prg, j);

		b3.gl.linkProgram(prg); b3.mPrograms[k]=prg;
	}
	// Init vertex buffer for a regular screen-sized quad
	var vertices = [-1,-1, -1,1, 1,-1, 1,1];
	b3.mVertBuf1 = b3.gl.createBuffer();
	b3.gl.bindBuffer(b3.ARRAY_BUFFER, b3.mVertBuf1);
	b3.gl.bufferData(b3.ARRAY_BUFFER, new Float32Array(vertices), b3.STATIC_DRAW);

	// Init vertex buffer for the 3D star field
	vertices=[]; for(k=0;k<b3.mNumStarVertices*3;++k)vertices.push(Math.random());
	b3.mVertBuf3 = b3.gl.createBuffer();
	b3.gl.bindBuffer(b3.ARRAY_BUFFER, b3.mVertBuf3);
	b3.gl.bufferData(b3.ARRAY_BUFFER, new Float32Array(vertices), b3.STATIC_DRAW);
	// Enable blending
	b3.gl.enable(b3.BLEND);b3.gl.blendFunc(b3.SRC_ALPHA, b3.ONE_MINUS_SRC_ALPHA);
	jss.b3d.main();
};
