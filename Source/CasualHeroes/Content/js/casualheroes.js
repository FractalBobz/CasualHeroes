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
			b='I need:'
		}
		ihtml('field','<h1>'+b+'</h1><article>'+c+'</article>');
	}
};
hero.home=ihtml('field');
jss.b3d.attach3d();
jss.hash.deal.Help=hero.hash;
jss.hash.deal.Need=hero.hash;
jss.hash.hashish();