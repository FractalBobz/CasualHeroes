"use strict";
Win.jareas={};Win.jarea={frame:Fun("''",1)};
xtend('mice',{
	jumpon:Fun(),cord:[0,0],x:0,y:0,but:0,bwoz:0,cansel:false,mustmove:false,on:false,down:Fun("true",1)
});
xtend('UP',{time:0,
	speed:[0,0],scrlz:{},sxp:3,syp:3,sx:-jss.x1*.3,sy:-jss.y1*.3,sto:0,
	boom:Fun(),defbuts:Fun("''",1),ops:Fun("''",1),
	butname:function(n){
		var nn='',i=0,iL=n.length;for(i=0;i<iL;i++){var z=n.charCodeAt(i);
			if((z>64&&z<91)||(z>94&&z<123)||(z>47&&z<58))nn+=n.charAt(i);else if(z==32)nn+='_'
		}return nn.split(' ').join(' ')
	},
	scram:function(a,h,v,p){if(a===true)h=true; // scroll to (or p=by) x=h,y=v in frame a (bool p prevents hov set)
		else if(a&&!tof(p,'b'))jarea.hov=a;a=jarea.hov||jarea.alive;
		var j=jss.hash.place+'/'+a,ra=jareas[a];if(!ra)return 0;if(!hop(UP.scrlz,j))UP.scrlz[j]=[0,0];
		var s=UP.scrlz[j],x=tof(h,'n')?h:s[0],y=tof(v,'n')?v:s[1],uf=dge('scr_c_'+a);
		if(!uf||!ra)return 0;
		if(p){if(h)x=s[0]+h;if(v)y=s[1]+v}
		p='scr_n_'+a;
		var e='',f=[],wh=dims(uf.parentNode,'dDC'),r=dims(uf,'dDcC'),bx=wh[0]-r[0],by=wh[1]-r[1],
			bd=dims(p,'dD'),pv=bd[1]+marge(p,1);
		if(my(p).on&&mice.y>r[3])
			if(mice.y<r[3]+r[1]-pv)y=by*(mice.y-wh[2])/(wh[1]-pv);
		if(x>0)x=0;if(x&&x<bx)x=bx;if(r[0]<wh[0])x=ra.centre?~~(.5*(wh[0]-r[0])):0;
		if(y>0)y=0;if(y&&y<by)y=by;if(r[1]<wh[1])y=ra.centre?~~(.5*(wh[1]-r[1])):0;
		if(s[0]!==x||x!=r[2]){e+='c';s[0]=x;f.push(x)}if(s[1]!==y||y!=r[3]){e+='C';s[1]=y;f.push(y)}
		if(e||h===true)dims('scr_c_'+a,e,f);
		// eek(y+'/'+by+' * '+wh[1]+'-'+pv);
		dims(p,'cC',[r[0]-bd[0]-marge(p),(wh[1]-pv)*y/by]);
		a=heidi(p,3),h=r[1]>wh[1]*3,y=by&&(!y||y==by);
		if(a!=h||y)heidi(p,h&&!y?1:0);
		return pI(f.join(''))
	},
	aftertouch:function(a){
		var ups=UP.speed,d=jareas[jarea.hov];if(!d)return;
		a=UP.scrlz[jss.hash.place+'/'+jarea.hov];
		a[0]+=ups[0]*(33/1000);a[1]+=ups[1]*(33/1000);
		UP.scram(jarea.hov,tubby(a[0],null,false),tubby(a[1]));ups[0]*=.8;ups[1]*=.8;
		if(M.abs(ups[0])<10&&M.abs(ups[1])<10){
			UP.speed=[0,0];cT(UP.sto)
		}else UP.sto=setTimeout(UP.aftertouch,50);
	}
});
Win.onbeforeunload=Fun("cT(UP.sto);");

xtend('mice',{
	x:0,y:0,origin:[0,0],but:0,downon:{},overon:{},
	xdist:0,ydist:0,
	from:WD.body.firstChild,							 // top mouse element
	// mouse down executes each active things down func,
	down:function(e,t,s){s=e.target||e.srcElement
		if(s.tagName=='HTML')return true;
		var m=mice,f=m.from,b=e.button||e.which;if(t)m.but=2;
		else{if(!jss.nav.IE)m.but+=b==2?4:2;else m.but=b==2?4:b}
		m.origin=clone(m.cord);m.downtime=+new Date;
		while(f){
			if(!f.id||!f.getAttribute){f=f.parentNode;continue}
			if(m.overon[f.id]){
				var g=attr(f,'data-group'),d=attr(f,'data-down'),k=attr(f,'data-klik');
				if(g||d||k){
					m.downon[f.id]=true;s=null;
					if(g){
						var c=$('*[data-group='+g+'].chosen');
						if(c[0])s=c[0],swapclass(c,'chosen',false);
						swapclass(f,'chosen',true);
					}else swapclass(f,'_down_',true);
					if(d)Fun(d.ux()).call(f,f,e,m.from,s);
				}
			}if(t&&jarea.hov){
				m.last=clone(m.cord);
				if(jareas[jarea.hov])UP.speed=[0,0];
			}f=f.parentNode;
		}
		if(jss.cds&&!mat('precoghold',m.from.className))jss.precog.hide();
		return m.cansel;
	},
	// mouse up executes active DIVs up functions, if mouse was pressed down on it too
	up:function(e,t){
		var m=mice,time=+new Date-m.downtime,act=time<999?'klik':'press',
			up,end=m.cord,dist=[end[0]-m.origin[0],end[1]-m.origin[1]];
		m.but=0;
		UP.speed=[dist[0]/(time*.001),dist[1]/(time*.001)]; // pixels per second
		dist=hypot(dist[0],dist[1]);
		for(var i in m.overon){
			swapclass(i,'_down_',false);
			if((up=attr(i,'data-up')))Fun(up.ux()).call(dge(i),dge(i),e,m.from);
		}for(var i in m.downon)
			if(m.overon[i]&&(up=attr(i,'data-'+act)))Fun(up.ux()).call(dge(i),dge(i),e,m.from);
		m.downon={};
		if(t&&(UP.speed[0]||UP.speed[1]))UP.aftertouch();
		return m.cansel;
	},
	idz:0,
	move:function(e,t){
		var m=mice,f=m.from,sc=[],rval=false,sel=true,nowover={};
		jarea.hov=0;for(var s in jareas)jareas[s].on=false;
		while(f){
			if(!f.getAttribute){f=f.parentNode;continue}
			var fid=f.id,fcn=f.className||'',nn=f.nodeName,
				fover=attr(f,'data-over').ux(),fmove=attr(f,'data-move').ux(),
				fdown=(attr(f,'data-down')||attr(f,'data-group')).ux(),
				fklik=attr(f,'data-klik').ux(),fup=attr(f,'data-up').ux(),fout=attr(f,'data-out').ux();
			if((nn=='A'&&!fdown&&!fklik)||nn=='INPUT'||nn=='PASSWORD'||nn=='TEXTAREA'||nn=='SELECT'||nn=='BUTTON')rval=true;
			if(fover||fdown||fklik||fmove||fup||fout){
				if(!f.id)f.id='ACT__'+mice.idz++;
				nowover[f.id]=m.overon[f.id]?1:2;m.overon[f.id]=true;
			}if(tof(fcn,'s')){
				if(!fcn.indexOf('cansel'))rval=sel;
				if(!fcn.indexOf('nosel'))rval=sel=false;
				if(!fcn.indexOf('frame')){s=fid.substr(6);jareas[s].on=true;if(!jarea.hov)jarea.hov=jarea.alive=s}
			}f=f.parentNode; // NB. mouse selection enabling "can-sel" and disabling "no-sel" MUST be first in the className
		}
		for(var i in m.overon) // change of actionable element
			if(nowover[i]){
				if(nowover[i]==2&&(f=attr(i,'data-over')))Fun(f.ux()).call(dge(i),dge(i),e,m.from);
				else if((f=attr(i,'data-move')))Fun(f.ux()).call(dge(i),dge(i),e,m.from);
			}else{
				if((f=attr(i,'data-out')))Fun(f.ux()).call(dge(i),dge(i),e,m.from);
				if(attr(i,'data-up')&&m.downon[i]){if((f=attr(i,'data-move')))Fun(f.ux()).call(dge(i),dge(i),e,m.from)}
				else{swapclass(i,'_down_',false);delete m.overon[i]}
			}
		// scrollable areas (like overflow:auto but works on iOS3/Android 1.5)
		if(jarea.hov&&dge('scr_c_'+jarea.hov)){if(t){if(mice.but){
				UP.scram(jarea.hov,(mice.x-mice.last[0]||null),(mice.y-mice.last[1]||null),1);mice.last=[mice.x,mice.y];
			}}else if(!ww.hvs||(ww.hvs&&!ww.hvs.count))
				wyle({id:'hvs',tmp:true,inter:31,lifetime:0,xy:dims('scr_h_'+jarea.hov,'cCdD'),
					testf:"if(!jarea.hov||!dge('scr_h_'+jarea.hov))return true;if(!(a.count%4))a.xy=dims('scr_h_'+jarea.hov,'cCdD');b=a.xy;if(mice.x<b[0]||mice.y<b[1]||mice.x>b[0]+b[2]||mice.y>b[1]+b[3]){jarea.hov=0;return true}return jarea.surf(mice.x,mice.y,jarea.paddle(jarea.hov),jarea.hov);"}).go();
		}return(m.cansel=rval);
	},
	coords:function(e,t,m){m=mice;m.from=e.target||e.srcElement;
		m.cord=t?[e.touches[0].clientX,e.touches[0].clientY]:[e.clientX,e.clientY];
		m.x=m.cord[0];m.y=m.cord[1];return m.cord // XXX no multitouch
	},
	simulate:Fun("if(tof(a,'s'))a=dge(a);if(!a)return;d=mice;d.from=a,d.move(),d.down({button:1,target:a});if(b!='down')d.up({button:1,target:a});")
});

if(jss.nav.touch){
	Win.ontouchstart=function(e){e=e||Win.event;mice.coords(e,1);mice.move(e,1);return mice.down(e,1)};
	Win.ontouchmove=Win.ontouchenter=function(e){e=e||Win.event;mice.coords(e,1);return mice.move(e,1)};
	Win.ontouchend=Win.ontouchcancel=function(e){e=e||Win.event;mice.move(e,1);return mice.up(e,1)};
}
WD.onmousemove=function(e){e=e||Win.event;mice.coords(e);return mice.move(e)};
WD.onmousedown=function(e){e=e||Win.event;mice.coords(e);return mice.down(e)};
WD.onmouseup=function(e){e=e||Win.event;mice.coords(e);return mice.up(e)};
WD.onclick=WD.ondblclick=Fun('mice.cansel',1);
if(jss.nav.IE){WD.onselectstart=Fun('mice.cansel',1);WD.oncontextmenu=WD.ondrag=Fun('mice.cansel',1)}

// if(!jss.boot.scrolls)adEv(WD,jss.nav.FF?'DOMMouseScroll':'mousewheel',"d=0;if(a.detail)d=-a.detail;else if(a.wheelDelta)d=a.wheelDelta/120;")

