Win.hero={
	iam:lS('name'),email:lS('email'),lat:0,lon:0,
	skills:['Manual Dexterity','Moral Support','Technical Expertise','Transport','Food & Drink'],
	hash:function(){
		var a=jss.hash,b=(a.place||'Home').ux(),c='',d=b.split('/');
		if(!d[1]){ // stage 1: basic list
			for(var i=0;i<hero.skills.length;i++)
				c+='<div class="butlink dib" data-klik="jss.hash.go2(\''+b+'/'+hero.skills[i]+'\');">'+hero.skills[i]+'</div>'
			if(b=='Help')b='I can help with:';
			if(b=='Need')b='I need:';
		}else if(!d[2]){ // stage 2: more details
			if(!hero.iam)return ihtml('field',hero.c_CreateAccount);
			else{
				b='Okay '+hero.iam;
				if(d[0]=='Help'){
					var mytag=d[1];
					// c='ur@'+hero.lat+','+hero.lon+'<br>nobody wants your '+mytag+' help';
					return hero.lookAtMap(mytag);
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
	checkMe:function() {
		$.userTable.where({ email: hero.email }).read().done(function(results) {
			if (results.length!=1)return;
			var r=results[0];
			lS('name',r.fname+' '+r.sname);
			lS('email',r.email);
		});
	},
	newUser:function() {
		var email=fval('email'),sname=fval('name').split(' '),fname=sname.shift();
		sname=sname.join(' ');
		$.userTable.where({ email: email }).read().done(function(results) {
			if (results.length > 0) {
					var r=results[0];
					hero.iam=lS('name',r.firstName+' '+r.lastName);
					hero.email=lS('email',r.email);
					ihtml('field',"Created user! Go back and try again."); 
			} else {
				var user = {
					tags: jss.hash.place.split('/')[1],
					identifier: randy(99999),
					firstName: fname, lastName: sname,
					email: email, phoneNumber: fval('phone')
				};
				$.userTable.insert(user).done(function () {
					hero.iam=lS('name',fname+' '+sname);
					hero.email=lS('email',email);
					ihtml('field',"Created user! Go back and try again."); 
				});
			}
		});
	},
	getTags:function(){
		$.tagsTable.orderBy("tagName").read()
			.done(function(tags) {
				hero.skills=[];
				for(var i=0;i<tags.length;i++)
					hero.skills.push(tags[i].tagName.replace(/^\s+|\s+$/g,''));
				jss.hash.hashish();
			});
	},

	lookAtMap:function(tag) {
		ihtml("field",'<div class="wide" style="height:'+(jss.y1-12)+'px" id="map_canvas"></div>');	
		var infos=[];
		var marker=[],
			mapOptions = {
				center: new google.maps.LatLng(hero.lat, hero.lon),
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.HYBRID 
			};
		var map = new google.maps.Map(dge("map_canvas"),mapOptions);

		$.requestTable.orderByDescending("createdOn").take(10).read().done(function(requests) {
			var people='';
			for(var i=0; i<requests.length; i++) {
				var r = requests[i],sd=r.startDate;
				if(tag && r.tags!=tag)continue;
				people+=r.title+" ("+sd.getHours()+":"+pad(sd.getMinutes(),2,0)+')<br>';
				marker[marker.length] = new google.maps.Marker({
					 animation: google.maps.Animation.DROP,
					 title: r.title,
					 position: new google.maps.LatLng(r.latitude,r.longitude),
					 map:map
				});
				infos[infos.length] = new google.maps.InfoWindow({
					content: r.description
				});
				google.maps.event.addListener(marker[marker.length-1], 'click', function() {
				    map.setCenter(marker.getPosition());
				    infos[infos.length-1].open({map:map, anchor:[marker.length-1]});
				  });
							
			}
		});
	}
};

var updateLatest10Requests=hero.lookAtMap;

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


