Win.hero={
	iam:'James',email:'james.counihan@evenbase.com',lat:0,lon:0,
	skills:['Manual Dexterity','Moral Support','Technical Expertise','Transport','Food & Drink'],
	hash:function(){
		var a=jss.hash,b=(a.place||'Home').ux(),c='',d=b.split('/');
		if(!d[1]){ // stage 1: basic list
			for(var i=0;i<hero.skills.length;i++)
				c+='<div class="butlink" data-klik="jss.hash.go2(\''+b+'/'+hero.skills[i]+'\');">'+hero.skills[i]+'</div>'
			if(b=='Help')b='I can help with:';
			if(b=='Need')b='I need:';
		}else if(!d[2]){ // stage 2: more details
			if(!hero.iam)b='Please Log In',c='using Facebook or Twitter';
			else{
				b='Okay '+hero.iam;
				if(d[0]=='Help'){
					var mytag=d[1];
					c='ur@'+hero.lat+','+hero.lon+'<br>nobody wants your '+mytag+' help';
				}else if(d[0]=='Need'){
					c='ur@'+hero.lat+','+hero.lon+hero.c_NeedDetails;
				}else if(d[0]=='Details')
					return jss.ajax('/Requests/Details/'+d[1],0,"ihtml('field',a.text);");
				else if(d[0]=='Requests')return jss.ajax('/Requests',
					'latitude='+(+hero.lat)+'&longitude='+(+hero.lon),
					"ihtml('field',a.text);"
				);
			}
		}else{
			c=b;
			b=(d[0]=='Help'
				?'Thanks!'
				:'Stay calm. Help is on its way. Probably.')
				+'<br>Updating server...';
			jss.ajax('/','act='+d[0],"eek(a.text);");
		}
		ihtml('field','<h1>'+b+'</h1><article>'+c+'</article>');
	},
	setupgeo:function(a,e){
		if(!e&&!a&&'geolocation' in N)N.geolocation.getCurrentPosition(hero.setupgeo);
		else if(!e&&a)hero.lat=a.coords.latitude,hero.lon=a.coords.longitude;
	},
	newPlea:function(){
		var addinfo=fval('addinfo'),duration=+fval('duration');
		$.userTable.where({ email: hero.email }).read()
		.done(function (results) {
			if (results.length == 1) {
				var user = results[0], startDate = new Date(), endDate = startDate;
				endDate.setHours(startDate.getHours()+duration);
				var request = {
					userId: parseInt(user.id),
					title: addinfo, description: addinfo,
					address: '10 King Road',
					latitude: hero.lat, longitude: hero.lon,
					tags: jss.hash.place.split('/')[1],
					startDate: startDate, endDate: endDate
				};
				$.requestTable.insert(request).done(function () {
						updateLatest10Requests();
				});
			} else {
					ihtml('field',hero.c_CreateAccount);
			}
		});
	},
	newUser:function() {
		var email=fval('email'),sname=fval('name').split(' '),fname=sname.shift();
		sname=sname.join(' ');
		$.userTable.where({ email: email }).read().done(function(results) {
			if (results.length > 0) {
					ihtml('field',"User " + email + " already exists!");
			} else {
				var user = {
					identifier: randy(99999),
					firstName: fname, lastName: sname,
					email: email, phoneNumber: fval('phone')
				};
				$.userTable.insert(user).done(function () {
					ihtml('field',"Created user!"); 
				});
			}
		});
	},
	getTags:function(){
		$.tagsTable.orderBy("tagName").read()
			.done(function(tags) {
				hero.skills=[];
				for(var i=0;i<tags.length;i++)
					hero.skills.push(tags[i].tagName);
				jss.hash.hashish();
			});
	},
	lookAtMap:function() {
		$.requestTable.orderByDescending("createdOn").take(10).read().done(function(requests) {
			var people='';
			for(var i=0; i<requests.length; i++) {
				var r = requests[i],sd=r.startDate;
				people+=r.title+" ("+sd.getHours()+":"+pad(sd.getMinutes(),2,0)+')<br>'
			}
			ihtml("field",people);
		});
	}
};

hero.home=ihtml('field');
hero.c_About=ihtml('c_About');
hero.c_NeedDetails=ihtml('c_NeedDetails');
hero.c_CreateAccount=ihtml('c_CreateAccount');
jss.b3d.attach3d();
hero.setupgeo();

xtend('jss.hash.deal',{
	Home:function(){ihtml('field',hero.home)},
	Help:hero.hash,
	Need:hero.hash,
	Local:function(){hero.lookAtMap()},
	About:function(){ihtml('field',hero.c_About)}
});

$.mobileClient = new WindowsAzure.MobileServiceClient(
	"https://casualheroes.azure-mobile.net/",
	"LjjlwWXmUrgfNWDYduASKkZDtIOTGq99"
);
$.userTable = $.mobileClient.getTable("Users");
$.requestTable = $.mobileClient.getTable("Requests");
$.tagsTable = $.mobileClient.getTable("Tags");

hero.getTags();

