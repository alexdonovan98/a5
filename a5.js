var root_url = "http://comp426.cs.unc.edu:3001/";

let homemenu = $("<h1>FlightSearch</h1><ul class='menu'>"+
	"<li id='home'><a href='#' class='active'>Home</a></li>"+
	"<li id='flights'><a href='#'>Flights</a></li>"+
	"<li id='map'><a href='#'>Map</a></li id='about'>"+
	"<li id='about'><a href='#'>About</a></li><li class='slider'></li></ul>");

let flightsmenu = $("<h1>FlightSearch</h1><ul class='menu'>"+
	"<li id='home'><a href='#'>Home</a></li>"+
	"<li id='flights'><a href='#' class='active'>Flights</a></li>"+
	"<li id='map'><a href='#'>Map</a></li id='about'>"+
	"<li id='about'><a href='#'>About</a></li><li class='slider'></li></ul>");

let mapmenu = $("<h1>FlightSearch</h1><ul class='menu'>"+
	"<li id='home'><a href='#'>Home</a></li>"+
	"<li id='flights'><a href='#'>Flights</a></li>"+
	"<li id='map'><a href='#' class='active'>Map</a></li id='about'>"+
	"<li id='about'><a href='#'>About</a></li><li class='slider'></li></ul>");

let aboutmenu = $("<h1>FlightSearch</h1><ul class='menu'>"+
	"<li id='home'><a href='#'>Home</a></li>"+
	"<li id='flights'><a href='#'>Flights</a></li>"+
	"<li id='map'><a href='#'>Map</a></li id='about'>"+
	"<li id='about'><a href='#' class='active'>About</a></li><li class='slider'></li></ul>");
$(document).ready(() => {
	build_home();
   	/*$('#login_btn').on('click', () => {

	let user = $('#user').val();
	let pass = $('#pass').val();

	console.log(user);
	console.log(pass);

	$.ajax(root_url + "sessions",
	       {
		   type: 'POST',
		   xhrFields: {withCredentials: true},
		   data: {
		       user: {
			   username: user,
			   password: pass
		       }
		   },
		   success: () => {
		       build_airlines_interface();
		   },
		   error: (jqxhr, status, error) => {
		       alert(error);
		   }
	       });
    });*/
});

var build_home = function() {
    let body = $('body');

    body.empty();
    body.append(homemenu);

    let dailyflights = $("<h2>Day by Day Flights</h2>");
    body.append(dailyflights);

    //change calendar to one day
	let calendar = $("<input type='text' name='calendar' value='01/01/2018 - 01/15/2018' />")
	body.append(calendar);



	$.ajax(root_url + "flights",
    {
    	type: 'GET',
    	xhrFields: {withCredentials: true},
	    success: (instances) => {
	    for (let i=0; i<instances.length; i++) {

	    	airport_list.push(airports[i].name);
	    	console.log(airport_list);
	    	airport_list_html.append("<li>" + airports[i].name + "</li>");
	    }
	    }
    });


    $('#flights').on('click', () => {
    	build_flights();
    });

     $('#map').on('click', () => {
    	build_map();
    });

    $('#about').on('click', () => {
    	build_about();
    });
};

var build_flights = function() {
    let body = $('body');

    body.empty();
    body.append(flightsmenu);

    let flightselector = $("<div id='selector>")
	let calendar = $("<input type='text' name='daterange' value='01/01/2018 - 01/15/2018' />")
	$(function() {
  		$('input[name="daterange"]').daterangepicker({
    		opens: 'left'
  		}, function(start, end, label) {
    		console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    		console.log('start'+start);
    		console.log('end'+end);
  		});
	});



    //body.append(calendar);

    //airports
    var airport_list = [];
    body.append("<h2>Airports</h2>");

    let airport_list_html = $("<ul id='airport_list_html'></ul>");
    body.append(airport_list_html);

    //let airport_add_div = $("<div>Name: <input id='new_airport_name' type='text'><br>" +
	//		    "<button id='make_airline'>Create</button></div>");

    $.ajax(root_url + "airports",
    {
    	type: 'GET',
    	xhrFields: {withCredentials: true},
	    success: (airports) => {
	    for (let i=0; i<airports.length; i++) {
	    	airport_list.push(airports[i].name);
	    	console.log(airport_list);
	    	airport_list_html.append("<li>" + airports[i].name + "</li>");
	    }
	    }
    });

    console.log('outside function'+airport_list);
    //SEARCH FORM
    let form = $("<div id='selector'>"+
  			"<div id='from'>"+
    			"From:<br>"+
    			"<select id='from-select'></select>"+
  			"</div>"+
  			"<div id='to'>"+
    			"To:<br>"+
    			"<select id='to-select'></select>"+
  			"</div>"+
  			"<center><input type='text' name='daterange' id='date' value='01/01/2018 - 01/15/2018' /><br>"+
  			"<button type='button' id='search-flights'>Search Flights</button></center>"+
        "<button type='button' id='edit-flights'>Edit Flights</button></center>"+
 		"</div>");

    body.append(form);

    console.log(airport_list.length);

    var fromlist = ['test','test1'];

	var select = document.getElementById("from-select");
	for(index in fromlist) {
    	select.options[select.options.length] = new Option(fromlist[index], index);
	}

	var tolist = ['test','test1'];

	var toselect = document.getElementById("to-select");
	for(index in tolist) {
    	toselect.options[toselect.options.length] = new Option(tolist[index], index);
	}

	$('#search-flights').on('click', () => {
      searchFlights();
	});

  $('#edit-flights').on('click', () => {
      editFlights();
      //console.("Hi");
	});

	function searchFlights() {
  		if(select.options.length > 0) {
   			 //alert('cool');
    		var from_select = select.options[select.selectedIndex].text;
    		var to_select = toselect.options[toselect.selectedIndex].text;
    		console.log(from_select);
    		console.log(to_select);
  	}
  		else {
    		alert('nothing selected')
  		}
	}


    //END SEARCH FORM


    //airlines
    var airline_list = [];
    body.append("<h2>Airlines</h2>");

    let airline_list_html = $("<ul id='airlines_list_html'></ul>");
    body.append(airline_list_html);

    //let airline_add_div = $("<div>Name: <input id='new_airline_name' type='text'><br>" +
	//		    "<button id='make_airline'>Create</button></div>");

    //body.append(airline_add_div);

    $.ajax(root_url + "airlines",
	{
	    type: 'GET',
	    xhrFields: {withCredentials: true},
	    success: (airlines) => {
		for (let i=0; i<airlines.length; i++) {
		   	airline_list.push(airlines[i].name);
		    airline_list_html.append("<li>" + airlines[i].name + "</li>");
		}
	    }
	});

	//flights
    var flight_list = [];
    body.append("<h2>Flights</h2>");

    let flight_list_html = $("<ul id='flight_list_html'></ul>");
    body.append(flight_list_html);

    //let airline_add_div = $("<div>Name: <input id='new_airline_name' type='text'><br>" +
	//		    "<button id='make_airline'>Create</button></div>");

    //body.append(airline_add_div);

    $.ajax(root_url + "flights",
	{
	    type: 'GET',
	    xhrFields: {withCredentials: true},
	    success: (flights) => {
		for (let i=0; i<flights.length; i++) {
		   	flight_list.push(flights[i].number);
		    flight_list_html.append("<li>" + flights[i].number + "</li>");
		}
	    }
	});

    $('#home').on('click', () => {
    	build_home();
    });

     $('#map').on('click', () => {
    	build_map();
    });

    $('#about').on('click', () => {
    	build_about();
    });
};

var build_map = function() {
    let body = $('body');

    body.empty();
    body.append(mapmenu);

    $('#flights').on('click', () => {
    	build_flights();
    });

     $('#home').on('click', () => {
    	build_home();
    });

    $('#about').on('click', () => {
    	build_about();
    });
};

var build_about = function() {
    let body = $('body');

    body.empty();
    body.append(aboutmenu);




    $('#flights').on('click', () => {
    	build_flights();
    });

     $('#map').on('click', () => {
    	build_map();
    });

    $('#home').on('click', () => {
    	build_home();
    });
};
