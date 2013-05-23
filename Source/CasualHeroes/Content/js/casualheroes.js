Win.hero={
	skills:['Manual Dexterity','Moral Support','Technical Expertise','Transport'],
	hash:function(a,b,c){
		a=jss.hash;b=(a.place||'Home').ux();
		if(b=='Home')return ihtml('field',hero.home);
		c='';
		for(var i=0;i<hero.skills.length;i++)
			c+='<div class="butlink" data-link="'+b+'/'+hero.skills[i]+'">'+hero.skills[i]+'</div>'
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
		ihtml('field','<h1>'+b+'</h1><article>'+c+'</article>');
	}
};
hero.home=ihtml('field');
hero.c_About=ihtml('c_About');
jss.b3d.attach3d();
xtend('jss.hash.deal',{
	Help:hero.hash,
	Need:hero.hash,
	Local:hero.hash,
	About:hero.hash
});
jss.hash.hashish();