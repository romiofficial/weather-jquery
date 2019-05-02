$(document).ready(function(){
	$('.short').hide();
	if(navigator.geolocation){
		var currentPosition = '';
		navigator.geolocation.getCurrentPosition(function(position){
			currentPosition = position;
			var latitude = currentPosition.coords.latitude;
			var longitude = currentPosition.coords.longitude;
			
			var url = 'http://api.apixu.com/v1/current.json?key=9050e6d23c864bf0a4d71826191202&q=';

			$.getJSON(url + latitude + ',' + longitude, function(data){
				
				//getting values and storing it in variables
				var data = JSON.stringify(data);
				var json = JSON.parse(data);
				
				var country = json.location.country;
				var city = json.location.name;
				var state = json.location.region;

				var temp = json.current.temp_c;
				var tempf = json.current.temp_f;
				var last_updated = json.current.last_updated.replace('-', '');

				var wind = json.current.wind_kph;
				var humidity = json.current.humidity;
				var time = json.location.localtime.split(' ')[1];
				var cloud = json.current.cloud;
			
				$('#weather').html(city + ', ' + state + ', ' + country);

				if(temp < 18){
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/03/27/16/50/beach-2179624_960_720.jpg)'

					});
					$('#temp').html("<h1>It's a pretty cool day today...<hr></h1>");
				}
				else if(temp > 10 && temp < 28){
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/01/02/01/51/clouds-1117584_960_720.jpg)'
						
					});
					$('#temp').html("<h1>It's a sunny  day today...<hr></h1>");
				}
				else if(temp > 28){
					$('.grey-jumbo').css({
						backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/09/08/13/58/desert-1654439_960_720.jpg)'

					});
					$('#temp').html("<h1>It's a sunny  day today...<hr></h1>");
				}





				//toggle temperature
				$('#info1').html(time);
				$('#info2').html('Wind ' + wind + ' kph');

				$('#info3').html(temp + '&#8451');

				$('.short').show();

				var yes = true;
				$('#switch').on('click',function(){
					if(yes){
						$('#info3').html(tempf + '&#8457');
						$('#switch').html("Show in Celsius");
						yes = false;

					}
					else{
						$('#info3').html(temp + '&#8451');
						$('#switch').html("Show in Farenheight");
						yes = true;
					}
				});
				//sky status
				if(cloud <= 30){
					$('#info5').html('Clear Sky');
				}else{
					$('#info5').html('Cloudy Sky');
				}
				$('#info6').html('Humidity ' + humidity + ' %')


			});


		});
	}
});


