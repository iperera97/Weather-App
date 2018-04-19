//whether api
let whether = new WhetherApi();

//create ui
class Ui {

	constructor(){

		this.contentEle = $("#content");
		this.detailEle = $("<table>");
		this.image = $("<img>");
		this.errors = [];
		this.errorEle = $(".errors");
		this.detailEle.attr("id", "details");
	}//constructor

	shoWhether(data){
		
		//clear parentElement
		this.contentEle.html(null);

		//create td 
		for( let prop in data ){
		let tr, td1, td2;

			//create tr
			tr = $("<tr>");
			
			//create td
			td1 = $("<td>");
			td2 = $("<td>");

			if( prop === "wind_speed" ){

				td1.html("Wind Speed");
				td2.html(data[prop] + " miles/hour");
			}else if( prop === "wind_deg" ){

				td1.html("Wind Degrees");
				td2.html(data[prop] + " Deg");
			}else if( prop === "temp"){

				td1.html("temperature");
				td2.html(data[prop] + " Celsius");
			}else if( prop === "pressure" ){

				td1.html("pressure");
				td2.html(data[prop] + " hpa");
			}else{

				td1.html(prop);
				td2.html(data[prop]);
			}

			//append td element to tr
			tr.append(td1);
			tr.append(td2);
			this.detailEle.append(tr);
			this.contentEle.append(this.detailEle);
		}
	}//shoWhether

	showErrors(errors){
		
		this.errorEle.removeClass("hide_errors");
		this.errorEle.addClass("show_errors");
		this.errorEle.html(null);

		for( let err in errors ){
		let para;

			//err para
			para = $("<p>");
			para.attr("class", "err");

			para.html(errors[err]);

			//append it to err div
			this.errorEle.append(para);
		}

		//clear errors
		setTimeout(function(){

			this.errorEle.removeClass("show_errors");
			this.errorEle.addClass("hide_errors");

		}.bind(this), 3000);
	}
}

//dom is load
$(document).ready(function(){




/*

	get geo location coords => whether api

*/

//when geolocation err
geo.catch(function(err){

	//show errors
	let ui = new Ui();
	ui.showErrors(err);
})

//get geographic location
geo.then(function(data){

	let lat = data.coords.latitude;
	let long = data.coords.longitude;

	let whetherByGeo = {
		name : "coords",
		lat,
		long
	}

	whether.createEndPoint(whetherByGeo)
	return whether.getWether();

//when whether api error
}).catch(function(err){
	
	//show errors
	let ui = new Ui();
	ui.showErrors(err);

//if all successfully get response
}).then(function(data){

	//create ui object
	let ui = new Ui();
	ui.shoWhether(data);
})


/*
	get user inputs => whether api

*/
$("#whether form").submit(function(event){
event.preventDefault();
let that, city, country, encodeCity, pattern;

	that = $(this);
	city = that.find("#city").val();
	country = that.find("#country").val();

	pattern = /^[a-z\s]+$/i;
	//valid user input only letters
	if( country.match(pattern) && city.match(pattern) ){

		city = city.trim();
		country = country.trim();
	
		encodeCity = encodeURI(city);

		//create whether inputs
		let whetherByInputs = {
			name: "inputs",
			encodeCity,
			country
		}
		
		//create endpoint and catch the data
		whether.createEndPoint(whetherByInputs);
		let whetherData = whether.getWether();
	
		whetherData.then(function(data){
	
			let ui = new Ui();
			ui.shoWhether(data);
		});
	
		whetherData.catch(function(err){
	
			//show errors
			let ui = new Ui();
			ui.showErrors(err);
		});
	}else{

		let err = {
			cod: "invalid inputs",
			message: "invalid city or country name"
		}

		//show errors;
		let ui = new Ui();
		ui.showErrors(err);
	}
});

});
