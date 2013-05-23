"use strict";
xtend('jss.hash',{
	canpush:0&&Win.history&&Win.history.pushState,
	trig:false,start:false,place:'',disable:false,title:WD.title,deal:{},
	getloc:Fun("WDL.href.S('#!')[1]||WDL.pathname.substr(1)||'Home'",1),
	// if(!h){var ls=WDL.search,sl=ls.S('hash=')[1];if(sl)h=sl.S('&')[0]}
	hashish:function(a,b){
		var jh=jss.hash,ph=jh.place,ispop=false,loc=jh.getloc();jh.start=true;
		if(tof(a,'o'))a=loc,ispop=true;
		if(jh.disable&&a)loc=a;
		var s=loc.S('/'),ent=s[0];
		erk('HASHPUSHER '+a+' / '+loc+': '+(jh.deal[ent]?'deal':jh.menu.happsh[ent]?'haps':'gogo'));
		jh.place=loc;
		if(ph==loc&&!b)1; // freeze time unless just loaded code
		else if(jh.deal[ent])jh.deal[ent](s); // we know what to do with this
		else if(jh.menu.happsh[ent]){ // we know what to load for this
			jss.require((Win.atob?'':'c/Tools/atob	')
				+jh.menu.happsh[ent]+(b?'':"	jss.hash.hashish('',true);"));
		}else{ // its a normal page
			// Win.history.replaceState('','',s);
			erk('heading from '+ph+' to '+s);
			if(ph&&ph!=s.J('/'))WDL.replace(WDL.protocol+'//'+WDL.host+'/'+s.J('/'));
		}
		WD.title=ent+': '+jh.title;jh.trig=false;
		if(!jss.boot.ready)jss.boot.ready=+new Date()-jss.boot.start;
		WD.body.scrollTop = WD.documentElement.scrollTop = 0;
	},
	viewer:{}
});

jss.hash.go2=function(a,b){ // WDL.hash unescapes "&" which is bad
	var jh=jss.hash,d=jh.getloc(),f='Home';
	if(jh.disable)d=jh.place;a=a||f;
	var c=a.ux().S('/'),e=c[0]||f;
	if(b&&d==a){
		// erk(a+' Bsame '+e)
		if(jh.deal[e])jh.deal[e](c)
	}else{
		jh.trig=b;
		if(!jh.disable&&d!=a){
			if(jh.canpush)Win.history.pushState('','','/'+a),jh.hashish(a);
			else WDL.hash=a=='Home'?'!':'!'+a
		}
		if(jh.disable)jh.hashish(a);
	}return false
}
xtend('jss.hash.menu',{happsh:{Home:'c/Rom/hash'}});

if(jss.boot.nohash)jss.hash.disable=true;
else if(jss.hash.canpush)Win.onpopstate=jss.hash.hashish;
else if('onhashchange' in Win&&!(jss.nav.IE&&jss.nav.IE<8))Win.onhashchange=jss.hash.hashish;
else{jss.hash.simuto=0;jss.hash.simulate=Fun("cT(jss.hash.simuto);if(jss.hash.hashC!=WD.location.hash){jss.hash.hashC=WD.location.hash;jss.hash.hashish(true)}jss.hash.simuto=setTimeout('jss.hash.simulate()',444);");jss.hash.simulate()}
// if there are no more requirements, process current hash
if(jss.boot.seq&&jss.boot.seq.S().pop()=='c/Rom/hash')jss.hash.hashish();
