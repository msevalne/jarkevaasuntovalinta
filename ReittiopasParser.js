
/* global variables */
var GEOCODE_REQUEST = 
	"http://api.reittiopas.fi/hsl/prod/?request=geocode&user=domalyzer&pass=domalyzer&format=xml&key=";

var ROUTE_CYCLING_REQUEST =
	"http://api.reittiopas.fi/hsl/prod/?request=cycling&user=domalyzer&pass=domalyzer&format=xml&from=";

var WORK_ARRIVAL_TIME = "0900";
	
var ROUTE_BUS_REQUEST =
	"http://api.reittiopas.fi/hsl/prod/?request=route&user=domalyzer&pass=domalyzer&format=xml&timetype=arrival&date=20140929&time=";

var RAUTATIETORI_COORDINATES = "2552414,6673664";	
	
var LOCATION_WORK = "";

var LOCATION_HOBBY = "";	


function getLocationInReittiopasFormat(location) {
	if (location.length == 0) {
		return "";
	}
	
	var locationInReittiopasFormat = "";
	
	var city = "";
	if (location.toLowerCase().indexOf("espoo") != -1) {
		city = "espoo";
	}
	else if (location.toLowerCase().indexOf("helsinki") != -1) {
		city = "helsinki";
	}
	else if (location.toLowerCase().indexOf("vantaa") != -1) {
		city = "vantaa";
	}
	
	var street = "";
	if (location.indexOf(",") != -1) {
		street = location.slice(0, location.indexOf(","));
		street = $.trim(street.toLowerCase());
		var firstDigitPosition = street.length;
		for (var i = 0; i < street.length; i++) {
			if (!isNaN(street.charAt(i)) && street.charAt(i) != ' ') {
				firstDigitPosition = i;
				break;
			}
		}
		street = street.substring(0, firstDigitPosition);
	}
	else {
		street = $.trim(location);
	}
	
	street = $.trim(street);
	street = street.replace(/ä/g, "a");
	street = street.replace(/ö/g, "o");
	street = street.replace(/ /g, "+");
	
	var houseNumber = "";
	
	var firstWhiteSpacePosition = location.indexOf(" ");
	var commaPosition = location.indexOf(",");
	var hyphenPosition = location.indexOf("-");
	if (firstWhiteSpacePosition != -1
		&& commaPosition != -1
		&& firstWhiteSpacePosition < commaPosition) {
		if (hyphenPosition != -1
			&& hyphenPosition < commaPosition) {
			houseNumber = location.substring(hyphenPosition, commaPosition);
		}
		else {
			houseNumber = location.substring(firstWhiteSpacePosition, commaPosition);
		}
	}
	for (var i = 0; i < houseNumber.length; i++) {
		if (isNaN(houseNumber.charAt(i))) {
			houseNumber = houseNumber.replace(houseNumber.charAt(i), ' ');
		}
	}
	houseNumber = houseNumber.replace(/ /g, "");
	houseNumber = $.trim(houseNumber);
	
	if (houseNumber.length > 0 && city.length > 0) {
		locationInReittiopasFormat = street+"+"+houseNumber+"+"+city;
	}
	else if (city.length > 0) {
		locationInReittiopasFormat = street+"+"+city;
	}
	else {
		locationInReittiopasFormat = street;
	}
	return locationInReittiopasFormat;
}

function calculateDistanceInMeters(url, baseElement, house) {
	$.ajax({
		type: "POST",
		url: "proxyDistance.php",
		data: {urlName: url}
	})
		.done(function(data) {  
			xmlDoc = $.parseXML( data );		
		if ($(xmlDoc).find("length:first").length > 0) {		
			var distance = $(xmlDoc).find("length:first").text();
			//alert("Distance is: " + distance + ", url: "+url);
			var respondType = "distance";
			$("#locationDistanceRank:first", $(baseElement)).trigger("customLocationChange", [distance, baseElement, house, respondType]);
		}
	})
		.fail(function( jqXHR, textStatus ) {  
		alert( "Request failed: " + textStatus );
	});
}

function calculateDurationInMinutes(url, baseElement, house) {
	$.ajax({
		type: "POST",
		url: "proxyDistance.php",
		data: {urlName: url}
	})
		.done(function(data) {  
			xmlDoc = $.parseXML( data );		
		if ($(xmlDoc).find("duration:first").length > 0) {
			var firstNode = $(xmlDoc).find("node:first");
			var firstDuration = $(firstNode).find("duration:first").text();
			var secondDuration = $(firstNode).next().find("duration:first").text();
			var thirdDuration = $(firstNode).next().next().find("duration:first").text();
			//alert("1: "+firstDuration+", 2: "+secondDuration+", 3: "+thirdDuration);
			
			//var duration = $(xmlDoc).find("duration:first").text();
			//alert("Duration is: " + duration+ ", url: "+url);
			var duration = (parseInt(firstDuration)+parseInt(secondDuration)+parseInt(thirdDuration))/3;
			//alert(duration);
			var respondType = "duration";
			$("#locationDistanceRank:first", $(baseElement)).trigger("customLocationChange", [duration, baseElement, house, respondType]);
		}
	})
		.fail(function( jqXHR, textStatus ) {  
		alert( "Request failed: " + textStatus );
	});
}

function coordinatesReset(baseElement, house) {

	var coordinatesFrom = $("#coordDurationFrom:first", $(baseElement)).val();
	var coordinatesTo = $("#coordDurationTo:first", $(baseElement)).val();
	if (coordinatesFrom != "default"
		&& coordinatesTo != "default") {
			var requestType = ROUTE_BUS_REQUEST;
			var url = requestType + WORK_ARRIVAL_TIME + "&from=" + coordinatesFrom + "&to=" + coordinatesTo;
			calculateDurationInMinutes(url, baseElement, house);

			requestType = ROUTE_CYCLING_REQUEST;
			url = requestType + coordinatesFrom + "&to=" + coordinatesTo;
			calculateDistanceInMeters(url, baseElement, house);
	}
}

function getCoordinatesForAddress(streetAddress, element, baseElement, house) {
	$.ajax({
    	type: "POST",
    	url: "proxy.php",
    	data: {streetAddressName: streetAddress}
    })
    	.done(function(data) {  
		xmlDoc = $.parseXML( data );  
		if ($(xmlDoc).find("coords:first").length > 0
			&& $(xmlDoc).find("matchedName:first").length > 0) {
			
			var coords = $(xmlDoc).find("coords:first").text();
			var matchedName = $(xmlDoc).find("matchedName").text();
			
			matchedName = matchedName.replace(/ä/g, "a");
			matchedName = matchedName.replace(/ö/g, "o");
			matchedName = matchedName.replace(/ /g, "+");
	
			if (streetAddress.indexOf(matchedName.toLowerCase()) == -1) {
				alert("The address: " + streetAddress + " wasn't found in the exact form, the matching suggestion was used");
			}
			element.val(coords);
			coordinatesReset(baseElement, house);
		}
    })
	    .fail(function( jqXHR, textStatus ) {  
    	alert( "Request failed: " + textStatus );
    });
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function calculateDistance(baseElement, streetAddressFrom, streetAddressTo, house) {

	var streetAddressFromFormed = getLocationInReittiopasFormat(streetAddressFrom);

	if (isEmpty(streetAddressTo)) {
		$("#coordDurationTo", $(baseElement)).val(RAUTATIETORI_COORDINATES);
	}
	else {
		var streetAddressToFormed = getLocationInReittiopasFormat(streetAddressTo);
		getCoordinatesForAddress(streetAddressToFormed, $("#coordDurationTo", $(baseElement)), baseElement, house);
	}
	
	getCoordinatesForAddress(streetAddressFromFormed, $("#coordDurationFrom", $(baseElement)), baseElement, house);
}

function isLocationValid(element) {
	str = element.val();
	if (/^[0-9a-zA-Z, äÄöÖ]+$/.test(str)
		&& str.length < 50) {
		if (element.attr("id") == "workingPlaceAddress") {
			LOCATION_WORK = str;
		}
		else if (element.attr("id") == "hobbyPlaceAddress") {
			LOCATION_HOBBY = str;
		}
	}
	else {
		alert("Incorrect characters in the input: " + str);
	}
}



