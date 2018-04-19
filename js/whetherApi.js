//get geoloaction
let geo = new GeoLocation();

//whether app goes here
class WhetherApi {

	constructor(){

		this.appid = "5414e68fa9f61bc8f8a1051fb85bc6d6";
	}

	createEndPoint(opt){

		if( opt.name === "coords" ){

			this.endPoint = "http://api.openweathermap.org/data/2.5/weather?";
			this.endPoint += "lat=" + opt.lat + "&lon=" + opt.long + "&APPID=" + this.appid + "&" + "units=metric";
		}else if( opt.name === "inputs" ){

			this.endPoint = "http://api.openweathermap.org/data/2.5/weather?";
			this.endPoint += "q=" + opt.encodeCity + "," + opt.country + "&APPID=6b9812f07c318c0d269b86feb47cf829&units=metric";
		}
	}

	//get current whether
	getWether(){

		return new Promise(function(resolve, reject){
			
			//ajax request to end point
			return $.ajax({
				url: this.endPoint,
				type: "get",
				dataType: "json"
			}).then(function(success){

				let weather = success.hasOwnProperty("weather");
				let temp = success.main.hasOwnProperty("temp");

				//not change api stucture
				if( weather && temp ){

					var createData = {
						place: success.name,
						whether: success.weather[0].description,
						temp: success.main.temp,
						pressure: success.main.pressure,
						wind_speed: success.wind.speed,
						wind_deg: success.wind.deg
					}

					resolve(createData);
				}else{
				//api response data structre has been changed
					let err = {
						cod: "404",
						message: "the api response data structre has been changed"
					}

					reject(err);
				}
				
			}).fail(function(err){

				reject(err.responseJSON);
			});

		}.bind(this));
	}



}

