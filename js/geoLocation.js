//get geographi loacation
class GeoLocation {

	constructor(){

		let hasSupport = ( "geolocation" in navigator)? this.support(): this.unsupport();
		return hasSupport;
	}

	support(){

		return new Promise(function(resolve, reject){

			navigator.geolocation.getCurrentPosition(function(geoSuccess, geoErr){

				//has error
				if( geoErr !== undefined ){

					reject(geoErr);
				}else{
				//success

					resolve(geoSuccess);
				}
			});
		});
	}

	unsupport(){

		let err = "you browser cannot support geoloaction api ! please update the browser or try different browser";
		alert(err)
		throw new Error(err);
	}
}

