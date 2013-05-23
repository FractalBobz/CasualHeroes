Win.hero={
	skills:['Manual Dexterity','Moral Support','Technical Expertise','Transport','Food & Drink'],
	hash:function(){
		var a=jss.hash,b=(a.place||'Home').ux(),c='',d=b.split('/');
		if(!d[1]){
			for(var i=0;i<hero.skills.length;i++)
				c+='<div class="butlink" data-klik="jss.hash.go2(\''+b+'/'+hero.skills[i]+'\');">'+hero.skills[i]+'</div>'
			if(b=='Help'){
				b='I can help with:';
			}
			if(b=='Need'){
				b='I need:';
			}
			if(b=='Local'){
				b='Local Heroes:';
				c='Map goes here!';
			}
			if(b=='About'){
				b='About';
				c=hero.c_About;
			}
		}else{
			c=b;
			b=(d[0]=='Help'
				?'Thanks!'
				:'Stay calm. Help is on its way. Probably.')
				+'<br>Updating server...';
		}
		
		ihtml('field','<h1>'+b+'</h1><article>'+c+'</article>');
	}
};

hero.home=ihtml('field');
hero.c_About=ihtml('c_About');
jss.b3d.attach3d();
xtend('jss.hash.deal',{
	Home:function(){ihtml('field',hero.home)},
	Help:hero.hash,
	Need:hero.hash,
	Local:hero.hash,
	About:hero.hash
});
jss.hash.hashish();