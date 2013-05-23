"use strict";
// JC: Shared client/server kernel functions
if(this.window){window.Win=window;Win.global=Win;Win.exports={};Win.client=!0} // we are on the client
else{global.Win=global;Win.client=!1} // we are on a node.js server
Win.T=!0;Win.F=!1;
Win.erk=function(a){if(Win.console)console.log(a+'\r\n');return a};

// Fun: shorthand stringy functions
global.Fun=function(f,r){return Function('a','b','c','d','e','f','g',(r===1?'return ':'')+(f||'false').toString())};
// global methods used on client and server alike
// these ALONE live outside the jss namespace object
// NEVER create a one or two letter uppercase variable - they are reserved for shorthand methods created here
(function(){
	var globs={
		M:Math,S:'/',D:'./',rE:Win['Reg'+'Exp'],sT:setTimeout,cT:clearTimeout,
		m_m:{}, // multimedia
		tof:function(a,b,c,d,e){ // shorthand typeof function
			if(a===null)return (c||b)=='z'&&'z';d=typeof a;
			if(typeof c!=='undefined'){d=typeof a[b];if(d===null)return c==='z'&&'z';b=c}
			switch(d){case'number':d='n';break;case'boolean':d='b';break;case'string':d='s';break;
				case'object':d='o';if(typeof a.length==='number'&&typeof a.splice==='function')d='a';
					else if(typeof a.readyState==='number')d='x';break;
				case'undefined':d='u';break;case'function':d='f';break
			}if(d==='f'||d==='o')if(a.test)d='r';
			return b?d==b:(d==='u'?false:d)
		},
		L:Fun("b=tof(a);if(b=='s'||b=='a')return a.length;if(b=='o'){d=0;for(e in a)if(hop(a,e))d++;return d}return 0"),
		J:Fun("a.join(b||'')",1),
		NL:'\n',BS:'\\',
		cl0k:new Date,clok:Fun("Win.cl0k=new Date;return(+cl0k)*1E-3"),
		keyvals:Fun("if(!tof(a,'o'))return [];c=[];for(d in a)if(!tof(a[d],'f'))c.push(b==2?d+':'+a[d]:b?a[d]:d);return c"),
		// if string a is a substring of string b, return at which character, or '^' if match is at the beggining
		// if one of strings a is a substring of string b, return that string
		mat:Fun("e=tof(a,'a');if(!e)a=[a];c=a.length;while(c--){d=(b||'').indexOf(''+(a[c]||''));if(d!=-1)return e?a[c]:d||'^'}return e?'':false"),
		pI:Fun("parseInt(a,10)",1),
		hop:Fun("Object.prototype.hasOwnProperty.call(a,b)",1), //  var uninheritingOb = Object.create(null);
		uc:Fun("b?uc(a.charAt(0))+a.substr(1):a.toUpperCase()",1),lc:Fun("b?uc(a.charAt(0))+lc(a.substr(1)):a.toLowerCase()",1),
		Q:function(a,b,c,d,e,f,g){g=tof(a);
			if(g=='o'){
				c=[];for(f in a)c.push(f.ex(3)+'='+(''+a[f]).ex(3));c.sort();return c.J('&')
			}else if(g=='s'&&mat('=',a)){
				c=a.S('&');d=c.length;f={};while(d--){e=c[d].split('=');if(b&&b==e[0].ux(3))return e[1].ux(3);f[e[0].ux(3)]=e[1].ux(3)}return b?'':f
			}else return b?'':{};
		},
		clone:Fun("b=tof(a,'o')?{}:[];for(c in a)if(hop(a,c)&&tof(a[c]))d=tof(a[c]),b[c]=d=='o'||d=='a'?clone(a[c]):a[c];return b"),
		// attach stuff in object b onto object a, which may be a string stemming from window eg. of the form 'document.location'
		xtend:Fun("if(typeof a=='string'){d=a.split('.');a=d.shift();if(!(a in Win))Win[a]={};a=Win[a];for(e in d)if(hop(d,e)){if(!(d[e] in a))a[d[e]]={};a=a[d[e]]}}if(tof(b,'a')||tof(b,'o'))for(e in b)if(hop(b,e))if(!c||!(e in a))a[e]=b[e]"),
		emptyob:Fun("if(!tof(a,'o'))return true;for(b in a)return false;return true;"),
		// is a in array b? if not and c=true, put it in. if so and c=false, take it out
		inar:Fun("e=b.length;while(e--)if(a==b[e]){if(c===false)b.splice(e,1);return e+1}if(c===true)b.push(a);return 0"),
		randy:Fun("~~(M.random()*a)",1),
		tubby:Fun("b=''+M.round(a*1000.0)*.001;c=b.split('.');d=c[0]+(c[1]?'.'+c[1].substr(0,3):'');return d-0"),
		// fill array - a:array or value, b:required length, c:make blanks zeros instead of empty strings
		far:Fun("if(tof(a,'s')||!a)return far([a],b,c);else{if(tof(a,'n')){b=a;a=[];d=''}else  d=a.length?a[0]:0;while(a.length<b)a.push(c?d:'');a.length=b}return a"),
		// morg: infect a with object b, c flag stops overwrites, d forces clean
		morg:Fun("for(e in b)if(hop(b,e))if(tof(b[e],'o')){if(!a[e]||d)if(tof( a,e,'u'))a[e]={};morg(a[e],b[e],c,d)}else if(tof(b[e],'a')){if(tof(a,e,'u'))a[e]=[];morg(a[e],b[e],c,d)}else if(!c||tof(a,e,'u'))a[e]=b[e];"),
		// obj:Fun("function F(){};F.prototype=clone(a);d=new F();if(b){for(c in b)d[c]=b[c]}return d"),
		pad:Fun("a=a.toString();if(!c)c=c===0?0:' ';if(b>a.length)while(a.length<b){a=c+a}return a"), // pad a to length b with c
		// spin:Fun("(''+(a||'')).split(b||'').join(c||'')",1),
		hypot:Fun("d=M.sqrt(a*a+b*b);if(!c)return d;return .1*M.round(10*d);"),
		dec2hex:Fun("e='0123456789ABCDEF';c=0xf;d='';while(a){d=e.charAt(a&c)+d;a>>>=4}while(d.length<(b||2))d='0'+d;return d"),
		// global strings
		eD:'</div>',
		blnk:'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', // 1x1 transparent image
		// global regular expressions
		R_space:/\s+/g,R_ltspc:/^\s*|\s*$/g
	},i;
	for(i in globs)Win[i]=globs[i];
	
	// built-in extensions
	var strEx={
		// upper/lower accepts argument for additional formatting
		uc:Fun("a?uc(this.charAt(0))+this.substr(1):this.toUpperCase()",1),
		lc:Fun("if(!a)return this.toLowerCase();b=this.S(' ');c=b.length;while(c--)b[c]=b[c].charAt(0).uc()+b[c].substr(1).lc();return b.J(' ')"),
		// shorthand
		ux:Fun("a==2?unescape(this):a==3?decodeURIComponent(this).spin('+',' '):a?decodeURI(this):decodeURIComponent(this)",1),
		ex:Fun("a==2?escape(this):a==3?encodeURIComponent(this).spin('%20','+'):a?encodeURI(this):encodeURIComponent(this)",1),
		// string match returns 0 if no match, '^' if match at beginning
		mat:Fun("b=this.indexOf(''+(a||'')),b?(b==-1?false:b):'^'",1),
		// split, join in one function
		spin:Fun("(''+(this||'')).split(a||'').join(b||'')",1),
		// split - defaults to tab character
		S:Fun("this.split(!tof(a)?'\\t':a)",1),
		xQ:function(a){return a=='sql'?this.spin("'","''"):
			a=='html'?this.replace(/&([^#\w]|$)/g,'&amp;$1').spin('<','&lt;').spin('>','&gt;').spin('"','&quot;')
			:this.spin("'","\\'")}
	},arrEx={
		J:Fun("this.join(a||'')",1)
	};
	for(i in strEx)String.prototype[i]=strEx[i];
	for(i in arrEx)Array.prototype[i]=arrEx[i];
}());

// JC navAgent: find all useful properties contained within the navigator useragent
Win.navAgent=function(a,b,c){
	// browser
	c=(a.agent||'').lc();
	if(mat('opera',c)&&(b=/version\/([\d\.]+)/.exec(c))){ // opera
		a.OP=+b[1];a.op=a.OP&&!~c.indexOf(' mini');if(a.OP<10)a.basic=true;
	}else if((b=/msie (\d+)/.exec(c))){	// internet explorer
		a.IE=+b[1];if(a.IE<6)a.basic=true;
	}else{
		a.WK=mat('khtml',c); // chrome, safari, 
		if(a.WK){
			if((b=/(version|chrome|crmo)\/(\d+\.?\d?)/.exec(c)))a.WK=+b[2];
			a.iP=/iphone|ip[ao]d/.test(c);a.SF=mat('safari',c)&&!mat(['chrome','crmo','android'],c);
			if(a.iP&&(b=/os (\d+)_(\d+)/.exec(c)))a.iP=+(b[1]+'.'+b[2]);
			else if(!tof(a.WK,'n'))
				if((b=/playstation 3 (\d+\.\d+)/.exec(c)))a.WK=+b[1];
				else if((b=/qupzilla/.exec(c)))a.WK=23;
		}else if((b=/(firefox|minefield)\/(\d+\.\d)/.exec(c))){
			a.FF=+b[2];if(a.FF<3.6)a.basic=true;
		}
		if((b=/android (\d+\.\d+)/.exec(c)))a.AD=+b[1];else a.AD=0;a.Ad=a.AD&&a.AD<2.2;
		a.BB=/blackberry/.test(c);
		b=mat('konqueror',c);a.KN=b?parseFloat(c.substr(b+10,3)):0;
	}
	// style pre-fixes
	a.Pf=a.WK?'Webkit':a.KN?'Khtml':a.OP?'O':a.IE?'ms':'Moz';a.pf=a.Pf.lc();a.cpf='-'+a.pf+'-';
	// platform
	a.plat='Robot';if(a.AD)a.plat='Android';if(a.iP)a.plat='iOS';
	else if(mat('windows',c))a.plat='Windows';else if(mat('macintosh',c))a.plat='Macintosh';
	else if(mat('linux	x11'.S(),c))a.plat='UNIX';
	if(mat('tablet',c))a.tablet=true;
	else if(a.IE){if(mat('windows ce	windows mobile	windows phone	mspie'.S(),c))a.mobile=true}
	else if(a.iP){b=mat('iPad',c);if(b)a.tablet=true;else a.mobile=true}
	else if(a.AD||mat('mobile',c))a.mobile=true;
	a.v=a.IE||a.FF||a.WK||a.OP;
	if(!a.v){
		a.basic=true;if(mat('ericsson	nokia	samsung	j2me	up.	lg-'.S(),c))a.mobile=true;
	}return a
};

// JC forAs: Asynchronous for-loop
// usage: forAs.call(ob,['one','two'],function(loop,key){erk(key);loop.next(1)});
// * make care to use an ob which will not be running 2 of these at once!
// * remember to loop.next(1) or the next/final steps will not happen
Win.forAs=function(me,a,b,c,d,e){ // me=scope,a=object or array, b=loop fun, c=callback fun
	if(me.forAsBuf)d=me.forAsBuf;else{
		me.forAsBuf={ob:a,len:L(a),i:0,fun:b,cb:tof(c,'f')?c:Fun(),last:false};
		d=me.forAsBuf;d.item=[];if(tof(d.ob,'o')){for(e in d.ob)d.item.push(e)}
		else{e=d.len;while(e)d.item.push(d.len-e--)}
		d.next=function(n,o){o=me.forAsBuf;
			if(n)o.i=n===true?o.len:o.i+n;if(o.i==o.len)o.last=true;forAs(me);
	}}d[!d.last&&d.i<d.len?'fun':'cb'].call(me,d,d.item[d.i]);if(d.last)delete me.forAsBuf
};

// boot-up variables are passed in the script name
if(Win.client)(function(){
	Win.WD=Win.document;Win.N=navigator;Win.require=Fun("{}",1);
	var lh,lp,s,ps=WD.getElementsByTagName('script'),i=ps.length;Win.live=mat('.',WD.location.host);
	while(i--)if(!lh&&ps[i].src){
		lp=ps[i].src.S('?');if(lp[1])lh=lp[1].S('&');
		if((s=L(lh)))for(var j=0;j<s;j++)lp=lh[j].split('='),jss.boot[lp[0]]=unescape(lp[1])
	}if((ps=jss.boot.scripts)){
		var s=ps.S(' '),i=0,sl=L(s);for(;i<sl;i++)WD.write('<script src="'+'/'+s[i]+'.js"></script>\n');
	}
}());

Win.R_commasep=/\s*\,\s*/g;

