Win.hero={
	iam:'James',lat:0,lon:0,
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
					c='ur@'+hero.lat+','+hero.lon+'<br>nobody wants your help'
				}else if(d[0]=='Need'){
					c='ur@'+hero.lat+','+hero.lon+'<br>Additional Details?<br>'
						+'<input type="text" class="phi1"><br>'
						+'<div class="butlink dib m0a" data-klik="1">Done</div>'
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
	}
};

hero.home=ihtml('field');
hero.c_About=ihtml('c_About');
jss.b3d.attach3d();
hero.setupgeo();

xtend('jss.hash.deal',{
	Home:function(){ihtml('field',hero.home)},
	Help:hero.hash,
	Need:hero.hash,
	Local:function(){updateLatest10Requests();},
	About:function(){ihtml('field',hero.c_About)}
});

$.mobileClient = new WindowsAzure.MobileServiceClient(
	"https://casualheroes.azure-mobile.net/",
	"LjjlwWXmUrgfNWDYduASKkZDtIOTGq99"
);
$.userTable = $.mobileClient.getTable("Users");
$.requestTable = $.mobileClient.getTable("Requests");

function updateLatest10Requests() {
	$.requestTable.orderByDescending("createdOn").take(10).read().done(function(requests) {
		var people='';
		for(var i=0; i<requests.length; i++) {
			var r = requests[i],sd=r.startDate;
			people+=r.title+" ("+sd.getHours()+":"+sd.getMinutes()+')<br>'
			// +r.endDate;
		}
		ihtml("field",people);
	});
}

var nextDate = new Date();
$("#requestStartDate").val(nextDate);

$("#createFirstUser").click(function() {
	var usersEmail = $("#emailAddress").val();
	$.userTable.where({ email: usersEmail }).read().done(function(results) {
		if (results.length > 0) {
				alert("User " + usersEmail + " already exists!");
		} else {
			var user = {
				identifier: $("#identifier").val(),
				email: usersEmail,
				firstName: $("#firstName").val(),
				lastName: $("#lastName").val(),
				phoneNumber: $("#phoneNumber").val()
			};
			$.userTable.insert(user).done(function () { alert("Created user!"); });
		}
	});
});

$("#createRequest").click(function() {
	var usersEmail = $("#requestorEmailAddress").val();
	$.userTable.where({ email: usersEmail }).read().done(function (results) {
		if (results.length == 1) {
			var user = results[0];
			// set up now -> now + 1h
			var startDate = new Date(Date.parse($("#requestStartDate").val()));
			var endDate = startDate;
			endDate.setHours(startDate.getHours() + parseInt($("#requestDuration").val()));

			var request = {
				userId: parseInt(user.id),
				title: $("#requestTitle").val(),
				description: $("#requestDescription").val(),
				address: $("#requestAddress").val(),
				latitude: parseFloat($("#requestLat").val()),
				longitude: parseFloat($("#requestLong").val()),
				tags: $("#requestTags").val(),
				startDate: startDate,
				endDate: endDate
			};
			
			$.requestTable.insert(request).done(function () {
					updateLatest10Requests();
			});
		} else {
				erk("User " + usersEmail + "not found or more than one user!");
		}
	});
});


jss.hash.hashish();