"use strict";

Win.WDL=WD.location;
xtend('jss.boot',{stak:[],plugs:{}});
if(!jss.boot.after)jss.boot.after=[];
if(!jss.boot.start)jss.boot.start=+new Date();
xtend('jss',{
	nav:{
		touch:!!('ontouchstart' in Win),agent:navigator.userAgent,IE:0,OP:0,iP:0,lecacy:false
	},
	resizers:[],
	resize:function(){
		var n=jss.nav,w=Win.innerWidth||WD.documentElement.clientWidth,h=Win.innerHeight||WD.documentElement.clientHeight;
		jss.x1=w;jss.y1=h;jss.ratio=jss.x1/jss.y1;
		if(!n.mobile||!n.touchRS) // touchRS: only resize mobile text once, as scrolling resizes their viewport
			n.touchRS=true,jss.fontsize=.1*Math.round(67*Math.log(.013*Math.sqrt(w*w+h*h))),WD.body.style.fontSize=jss.fontsize+'px';
		n=jss.resizers.length;for(w=0;w<n;w++)jss.resizers[w]();
	}
});

// shorthand functions
'Includes code from meta-os.com and sizzlejs.com',
Win.dge=Fun("WD.getElementById(a)",1);
Win.ihtml=Fun("if(tof(a,'s'))a=[dge(a)];else if(!tof(a,'a'))a=[a];if(!a[0])return '';c=tof(b);return c?a[0].innerHTML=(c=='a'?b.J():b)||'':a[0].innerHTML||''");
Win.attr=Fun("if(tof(a,'s'))a=[dge(a)];else if(!tof(a,'a'))a=[a];d=a.length;while(d--){if(a[d]&&a[d].getAttribute)e=tof(c)?c===false?a[d].removeAttribute(b):a[d].setAttribute(b,c):a[d].getAttribute(b)}return e||''");
// form element values; getting and setting inputs, selects, textareas etc
Win.fval=function(a,b){
	if(tof(a,'s'))a=[dge(a)];else if(!tof(a,'a'))a=[a];if(!a[0])return '';
	var setr=tof(b),ops=attr(a[0],'data-options'),labs=attr(a[0],'data-labels')||ops,
		i=0,v=tof(a[0].value)?a[0].value:ihtml(a[0])||'';
	if(labs)labs=labs.S();else labs=[v];
	if((i=attr(a[0],'data-selected')))v=ops[+i];else if(ops&&(i=inar(ihtml(a[0]),labs)))v=ops[i-1];
	if(setr)return (tof(a[0].value)?a[0].value=b:ihtml(a[0],b));
	return v||''
}
// heidi: block/none an element
Win.heidi=Fun("e=tof(a,'s')?dge(a):a;if(!e)return false;c='block';d='none';f=e.style.display;if(b==3)return f!=d;return (e.style.display=b==2?(f==d?c:d):(b?(b==4?'inline-'+c:c):d))==c");
// vize: visibility of an element
// (element,num):1=visible,2=hidden,3=switch
Win.vize=Fun("e=tof(a,'s')?dge(a):a;if(!e)return false;c='visible';d='hidden';g=e.style.visibility;if(b==3)return g!=d;return e.style.visibility=b==2?(g==d?c:d):(b?c:d)");
// ovre: visibility of overflow

// DocGetbyClass is set up for older IE versions by IE69.js
if(!Win.dgc)Win.dgc=function(cn,tag,elm){elm=elm||WD;
	var elz=elm.getElementsByClassName(cn),n=(tag)?new RegExp('\\b'+tag+'\\b','i'):null,re=[],c,i=0,il=elz.length;
	for(;i<il;i+=1){c=elz[i];if(!n||n.test(c.n))re.push(c);}return re;
};
// micro-Sizzle
if(!Win.$)Win.$=Fun("tof(a,'o')?a:!a.indexOf('#')?[dge(a.substr(1))]:!a.indexOf('.')?dgc(a.substr(1),'',b||WD):/^\\w+$/.test(a)?(b||WD).getElementsByTagName(a):[]",1);
// XXX use eg. WD.querySelectorAll('.myclass li:first-child') for complex selectors, when available
Win.navAgent(jss.nav);
Win.WDB=jss.nav.WK?WD.body:WD.documentElement;

jss.resize(),Win.onresize=jss.resize;

if((!(jss.nav.FF>1||jss.nav.IE>8||jss.nav.iP>3||jss.nav.WK>1||jss.nav.OP>10))&&dge(T)){
	jss.nav.legacy=Fun("'<a href=\"http://'+b+'/\">'+a+'</a>'+(c?', ':'')",1);T='greet'
	dge(T).style.display='block';if(dge('nos')){T='nos';qw='For the best experience,'}else qw='This apps runs on modern browsers. To access,';if(!dge('alt'))dr(qw+' try viewing with '+jss.nav.legacy('Firefox','firefox.com',1)+jss.nav.legacy('Opera','opera.com',1)+jss.nav.legacy('Safari','apple.com/safari')+' or '+jss.nav.legacy('Chrome','google.com/chrome'),T)
}else(function(){
	jss.root=(''+WD.location).replace(/[#\?].*$/,'').replace(/\/[^\/]+$/,'').replace(/\/+$/,'');
	
	// JC: tiny Add Event method
	Win.adEv=Fun("if(tof(b,'a')){for(d in b)adEv(a,b[d],c);return}if(tof(c,'s'))c=Fun('a=a||Win.event;if(a.preventDefault)a.preventDefault();'+c+';return false');"+(WD.addEventListener?"a.addEventListener(b,c,false);"
		:"a.attachEvent('on'+b,function(){return c.call(a,Win.event)});"));

	jss.ajaxOb=function(a,b,c,d){
		this.url=a;if(b=='HEAD'){this.type=b;this.data=null}else{if(b)this.data=b;this.type=this.data?'POST':'GET'};
		if(tof(c,'o')){this.cb=tof(c.cb,'s')?Fun(c.cb):c.cb;if(c.pf);if(c.pf)this.pf=c.pf;if(c.lf)this.lf=c.lf}
		else this.cb=tof(c,'s')?Fun(c):c;
		this.errtxt=tof(d,'s')?d:'Not available';this.req();return this
	};
	jss.ajaxOb.prototype={
		XML:null,text:'',state:1,status:0,header:{},headers:[],url:'',data:null,cb:0,
		cancel:Fun("this.XML.abort();"),
		req:function(){var o=this;
			if(Win.XMLHttpRequest)o.XML=new XMLHttpRequest;
			else{try{o.XML=new ActiveXObject("Msxml2.XMLHTTP")}catch(c){
				try{o.XML=new ActiveXObject("Microsoft.XMLHTTP")}catch(cc){}}
			}if(!o.XML)return;
			if(o.url){o.XML.open(o.type,o.url,o.cb?true:false);var Rs=o.data===true;
				if(Rs)o.data=false;else if(o.data)try{o.XML.setRequestHeader('Content-Type','application/x-www-form-urlencoded;')}catch(e){};
				if(o.pf)adEv(o.XML,'progress',tof(o.pf,'s')?Fun(o.pf):o.pf);
				if(o.lf)adEv(o.XML,'load',tof(o.lf,'s')?Fun(o.lf):o.lf);
				o.XML.send(o.data||null);
				if(o.cb){
					o.XML.onreadystatechange=function(){
						o.state=o.XML.readyState;if((o.state==4||o.state==1)&&o.XML){
							var ss=500;try{ss=o.XML.status}catch(e){}o.status=ss;
							var ttt;try{ttt=o.XML.responseText}catch(e){}
							if(o.status==200||o.status==304)o.text=ttt||'';
							else o.text=o.errtxt;if(!Rs)o.text=(''+o.text).spin('\r','');
							if(o.type=='HEAD')o._h();if(o.cb)o.cb(o)
					}}
					o.state=o.XML.readyState;if(o.state==4){
						var ss=500;try{ss=o.XML.status}catch(e){}o.status=ss;
						try{ss=o.XML.responseText}catch(e){}
						if(o.status==200){
							o.text=ss;if(o.type=='HEAD')o._h();if(o.cb)o.cb(o)
						}else o.text=o.errtxt;
					}
		}}},
		_h:function(){
			if(typeof this.XML.getAllResponseHeaders=='undefined')return;		
			try{this.heads=this.XML.getAllResponseHeaders().split(/[\r\n]+/g)}catch(e){this.heads={}}
			for(var hi in this.heads)if(hi){
				var c=this.heads[hi].indexOf(':');
				this.headers.push((this.heads[hi].substr(0,c++)).toLowerCase());
				this.header[this.headers[this.headers.length-1]]=this.heads[hi].substr(c+1,this.heads[hi].length-c-1)
		}	}
	};
	jss.ajax=function(a,b,c){return new jss.ajaxOb(a,b,c)};
	// lS: access local storage
	Win.lsok=0;try{lsok=Win.localStorage?1:0}catch(e){};Win.localStore={};Win.fileStore={};Win.tempStore={};
	Win.lS=Fun("if(a=='?')return !!lsok;if(c)fileStore[a]=true;c=lsok?Win.localStorage:localStore;d=typeof(b);if(b===false)d=b;else if(d=='number'||d=='string')c[a]=b;else if(c[a])b=c[a];e=tempStore;if(d===false){delete c[a];delete e[a]}else if(b&&!e[a])e[a]=b;return b==='0'?0:b");
	// JC require: load additional scripts in sequence
	jss.require=function(a,b,c){
		var jb=jss.boot,i=0,jp=[],r=live?'js/':'/',q=[];
		if(a){a=a.S();for(;i<a.length;i++)if(a[i])jb.stak.push(a[i])}
		if(b)jb.after[c?'unshift':'push'](tof(b,'f')?b:Fun(b));
		if(jb.stak.length){
			while(mat(';',jb.stak[0]))Fun(jb.stak.shift())();
			if(jb.loading)return;
			while(/^[\w\/\-]+$/.test(jb.stak[0]||'')){c=jb.stak.shift();q.push(c);
				if(!jb.plugs[c])jb.plugs[c]=1,jp.push(c.spin('/','~'));
			}erk('[get] '+q.J(' '))
			if(jp.length)jb.loading=true,jss.ajax(r+jp.J('$')+'.js',0,
				"Fun((a.status==200?a.text:'')+'\\njss.require();')();",'');
			else return jss.require()
		}else while((c=jb.after.shift()))c();
		jb.loading=false;if(jss.hash&&!jss.hash.start)jss.hash.hashish();
	};
	// more shorthand functions
	Win.kile=Fun("b=typeof a=='string';if(b&&a.indexOf('\\t')!=-1){c=a.S();e=L(c);while(e--)if(dge(c[e]))d=dge(c[e]).parentNode.removeChild(dge(c[e]));return d||F}b=b?dge(a):a;return b?b.parentNode.removeChild(b):F");
	Win.dce=Fun("e=WD.createElement(a);if(b)e[a=='img'?'src':'innerHTML']=b;if(c)e.id=c;if(d)e.className=d;return e");
	Win.dgt=Fun("WD.getElementsByTagName(a)",1);
	if(jss.boot.bodhid)WD.body.style.overflow='hidden';
	var lh=WD.location.hostname,lp=WD.location.protocol+'/';Win.live=mat('.',lh)&&!mat('node',lh)&&!mat('know',lh);
	Win.erk=Fun("if(live||!Win.console)return a;if(console.hist==a)return a;console.hist=a;if(a||a===0){Win.console.log(a+'\\r\\n')}return a");
	if(jss.boot.seq)jss.require((Win.JSON?'':'c/Platform/json2	')+'1;	'+jss.boot.seq); // env (env.js) no longer called here
}());

Win.require=function(){var z,y=arguments;
	for(var z=0;z<y.length;z++){
		if(tof(y[z],'s')){if(/^s?js\//.test(y[z]))jss.require(y[z])}
		else if(tof(y[z],'f'))jss.boot.after.push(y[z])
		else erk(tof(y[z]))
	}return {};
};

Win.c00k={
	set:Fun("c=365;d=new Date;d.setTime(d.getTime()+c*24*60*60*1000);WD.cookie=a+'='+b+'; expires='+d.toUTCString()+'; path=/';return''"),
	get:Fun("b='';c=WD.cookie.split('; ');d=c.length;while(d--){e=c[d].split('=');if(e[0]==a)return e[1]||''}return''"),
	card:Fun("c='J	L	K	Q'.S();b='D	W	C	S'.S();a=b[randy(4)],d=1+randy(13);if(d>10)d=c[d-11];return a+(d==10?'X':d==1?'A':d)"),
	reset:function(act){ // erase cookies + reload
		var a=WD.cookie.split('; ');
		Win.onbeforeunload=null;if(act!==false)for(var c=0;c<a.length;c++){
			var b=a[c];c00k.set(b.substr(0,b.indexOf('=')),'',-1); // clear all cookies
		}a=tempStore;for(c in a)lS(c,false);
		if(jss.hash)jss.hash.go2('Home');setTimeout("WD.location.reload();",9);
	}
};

/* wylob: managed timeouts; objects have start functions,
	test functions which if return true trigger end functions.
	Also time intervals on per-object basis, lifetimes (number of repeats; 0=infinite)
*/
jss.wylob={
	speed:1,to:0,last:0,nex:9E4,stop:Fun("cT(jss.wylob.to);"),
	kontrol:function(a,b,c){cT(jss.wylob.to);
		var w=jss.wylob,y=w.wiles,act=[],i=0;
		if(tof(a,'s')){var o=y[a];if(b===true)o.count=0; // start
			o.left=0;i=w.last?new Date()-w.last:0; // check if we interupted
			if(!o.count){act.push(a);Fun(o.startf)(o)}
		}else i=w.nex;w.nex=9E4;
		for(c in y)if(y[c].count&&!y[c].halt){y[c].left-=i; // reduce wait time by T-delta
			if(y[c].left<1)act.push(c);else w.nex=M.min(y[c].left,w.nex)
		}c=act.length;while(c--){
			var o=y[act[c]];o.count++;var x=o.lifetime&&o.count>o.lifetime;
			// requestAnimationFrame using "anim" function
			if(o.anim&&!x){var pf=jss.nav.pf,r='request',q='cancel',af='AnimationFrame';
			 if(o.af)(Win[q+af]||Win[pf+uc(q,1)+af])(o.af),o.af=0;
			 if((i=Win[r+af]||Win[pf+uc(r,1)+af]))o.af=i(function(){o.anim(o)},o.ael)||1;
			}if(x||Fun(o.testf+'\nreturn false;')(o)){ // life over or test succeeded
				Fun(o.endf+'\na.count=0;')(o);if(o.tmp)delete y[act[c]];
			}else{x=o.inter*w.speed;w.nex=M.min(x,w.nex);o.left+=x} // decide appropriate timeout 
		}w.last=new Date()-0;if(w.nex<9E4)w.to=setTimeout(w.kontrol,w.nex);
	},
	wiles:{},halt:Fun("if(jss.wylob.wiles[a])jss.wylob.wiles[a].halt=true;"),
	defob:{
		id:'wyD',inter:500,count:0,lifetime:10,halt:false, // to:0,
		startf:'',testf:"return true;",endf:'',left:0,
		trytry:function(start,b){jss.wylob.kontrol(this.id,start)}
	},
	make:function(a,b,c,d){
		if(!tof(a,'o'))return;for(var o in a)this[o]=a[o];
		for(b in jss.wylob.defob)if(!(b in a)&&!(b in this))this[b]=jss.wylob.defob[b];
		this.go=Fun("d=jss.wylob.wiles['"+this.id+"'];d.halt=false;d.trytry(!b,typeof a=='object'?a:null);");
		this.inter=~~this.inter
	}
};
Win.wyle=Fun("b=new jss.wylob.make(a),jss.wylob.wiles[a.id]=b",1);
Win.ww=jss.wylob.wiles;

xtend('arty',{cancan:false,paint:Fun(),
	font:{face:'binary',faces:{}},brushes:{},fontem:Fun(),drawTO:0,
	typeface:Fun("b=a.familyName;if(b){arty.font.face=b;xtend('arty.font.faces.'+b,a);arty.font.faces[b].glyphs['\u200B']={x_min:0,x_max:1,ha:2,o:''}}")
});Win._typeface_js={loadFace:Fun("arty.typeface(a)")};

// Dimensions

Win.dimCalc=function(e,t,s){
	// get+set DIV properties related to position, size and scroll
	if(!e)return 0;switch(t){
		case 'd':return s||s===0?pI(e.style.width=~~s+'px'):e.offsetWidth; // width Dimension of DIV
		case 'D':return s||s===0?pI(e.style.height=~~s+'px'):e.offsetHeight; // height Dimension of DIV
		case 'c':return (s||s===0?pI(e.style.left=~~s+'px'):dimXY(e))||0;			// left Co-ord
		case 'C':return (s||s===0?pI(e.style.top=~~s+'px'):dimXY(e,true))||0;	// top  Co-ord
		case 'k':return s?(e.width=~~s):e.width; // width Dimension of CANVAS
		case 'K':return s?(e.height=~~s):e.height; // height Dimension of CANVAS
		case 'o':return e.offsetWidth; 											// Offset-width  - getter only
		case 'O':return e.offsetHeight;											// Offset-height - getter only
		case 'S':return e.scrollHeight;											// Scrollarea-height - getter only
		case 's':return e.scrollWidth; 											// Scrollarea-width  - getter only
		case 'r':return s||s===0?(pI(e.style.left=~~s+'px')):(e.offsetLeft||0);	// left relative Co-ord
		case 'R':return s||s===0?(pI(e.style.top =~~s+'px')):(e.offsetTop||0);	// top  relative Co-ord		
		case 'p':return s||s===0?(e.scrollLeft=~~s):e.scrollLeft;	// scroll Pixels-x
		case 'P':return s||s===0?(e.scrollTop =~~s):e.scrollTop;	// scroll Pixels-y
		case 'b':return bgc(e,s,'Position'); // backgroundOffset
		case 't': // e.style[cpo+'transformOrigin']='50% 50%;'; // simple transforms - setter
			// var t=['translate('],p=['px ','px) rotate','deg) scale'];
			// erk('rotate('+s[0]+'deg) translate('+s[1]+'px '+s[2]+'px) scale('+s[3]+' '+s[4]+')');
			return C('transform',''
				+(tof(s[1],'n')?' translate('+s[1]+'px, '+s[2]+'px)':'')
				+(tof(s[3],'n')?' scale('+s[3]+', '+(s[4]||s[3])+')':'')
				+(tof(s[0],'n')?' rotate('+s[0]+'deg)':''),
				e);
		case 'T':return C('transform','matrix('+s+')',e); // a b c d tx ty - setter for array s
		// case 'z':return s||s===0?(e.style.opacity=s):e.style.opacity;					// opacity
		// case 'Z':return s||s===0?(e.style.zIndex=s):e.style.zIndex;						// Zindex		
	}return 0
};
Win.dimXY=function(a,b){
	var f=a,d=0;while(f){d+=b?f.offsetTop:f.offsetLeft;f=f.offsetParent};
	f=a;while(f.offsetParent){f=f.parentNode;d-=b?f.scrollTop:f.scrollLeft}
	return d||(b?a.offsetTop:a.offsetLeft);
};
Win.dims=function(a,b,c){
	if(!(tof(a,'s')?(a=dge(a)):a))return [0];var e=b.length;
	if(e==1)return [dimCalc(a,b,c||c===0?c:false)];var d=b.split('');
	c=tof(c,'a')?c:[c];while(e--)c[e]=dimCalc(a,d[e],c[e]);return c
};

Win.swapclass=function(div,to,from){
	if(tof(div,'s'))div=[dge(div)];else if(!tof(div,'a'))div=[div];if(!div[0])return;
	var i=div.length;while(i--){
		var cn=div[i].className||'';
		if(from===false) // remove class
			cn=cn.split(/\s+/),inar(to,cn,false),cn=cn.J(' ');
		else if(from===true) // add class
			cn=cn.split(/\s+/),inar(to,cn,true),cn=cn.J(' ');
		else if(from) // regular expressions
			cn=cn.replace(new RegExp(from.spin('~','\\')),to);
		else
			cn+=' '+to;
		div[i].className=cn;
	}
};if(lS('theme'))swapclass(dgt('body')[0],'G_'+lS('theme'),'^(G_[^ ]+)?');

// dynamically add styles (not presently required)

xtend('jss',{
	css:'',gotcss:false,
	addcss:function(sty,p){
		var he=dgt('HEAD')[0],ss=he.lastChild,tx=nav.AD||nav.FF>4&&!nav.Ad,
			s=tof(sty,'a')?sty.join(''):sty;
		if(s){if(p)jss.css=s;else jss.css+=s;return false}s=jss.css;
		// WD.body.style.fontSize=bios.fontsize+'px';
		if(jss.gotcss){
			if(nav.IE)ss.cssText=s;
			else if(tx)ss.replaceChild(WD.createTextNode(s),ss.firstChild);
			else ss.href='data:text/css;charset=utf-8,'+ex(s,1);
		}else{jss.gotcss=true;
			if(nav.IE)WD.createStyleSheet().cssText=s;
			else if(tx){ss=dce('style');
				ss.setAttribute('rel','stylesheet');ss.setAttribute('type','text/css');
				he.appendChild(ss);ss.appendChild(WD.createTextNode(s));
			}else{
				ss=dce('link');ss.id='SS';ss.rel='stylesheet';ss.type='text/css';
				ss.href='data:text/css;charset=utf-8,'+ex(s,1);
				if(he)he.appendChild(ss);
			}
		}return true;
	}
});
