
/* global variables */
var houses = [];
var housesIds = [];
var chosenHouse1 = "";
var chosenHouse2 = "";
var locationResend = true;
var A_DOTS = String.fromCharCode(513);
var EURO = String.fromCharCode(513);
var first_min_max_show = true;
var mode = "Vertaa omistusasuntoja";

function setForChosen(code, rowElement) {

	//alert("code: " + code + ", element: " + rowElement.html());

	if ($.inArray(code, housesIds) == -1) {
		return;
	}
	
	if (code != chosenHouse1
		&& code != chosenHouse2) {
		if (chosenHouse1 == "") {
			chosenHouse1 = code;
		}
		else if (chosenHouse2 == "") {
			chosenHouse2 = code;
		}
		else {
			return;
		}
		rowElement.css("color", "red");
	}
	else if (code == chosenHouse1
			|| code == chosenHouse2) {
		if (chosenHouse1 == code) {
			chosenHouse1 = "";
		}
		else if (chosenHouse2 == code) {
			chosenHouse2 = "";
		}
		rowElement.css("color", "black");		
	}
}

function showMinsMaxs() {
	if (houses.length <= 1) {
		return;
	}
	if (first_min_max_show == true) {
		sortByParameter($("#totalHeader"));
		first_min_max_show = false;
	}
	
	var curPriceMin = houses[0].price;
	var curRentMin = houses[0].rent;
	var curDurationMin = houses[0].duration;
	var curDistanceMin = houses[0].distance;
	var curSizeMin = houses[0].size;
	var curYearMin = houses[0].constructionYear;
	var curPriceMinPos = 0;
	var curRentMinPos = 0;
	var curDurationMinPos = 0;
	var curDistanceMinPos = 0;
	var curSizeMinPos = 0;
	var curYearMinPos = 0;
		
	for (var i = 1; i < houses.length; i++) {
		if (houses[i].price < curPriceMin) {
			curPriceMin = houses[i].price;
			curPriceMinPos = i;
		}
		if (houses[i].rent < curRentMin) {
			curRentMin = houses[i].rent;
			curRentMinPos = i;
		}
		if (houses[i].duration < curDurationMin) {
			curDurationMin = houses[i].duration;
			curDurationMinPos = i;
		}
		if (houses[i].distance < curDistanceMin) {
			curDistanceMin = houses[i].distance;
			curDistanceMinPos = i;
		}
		if (houses[i].size < curSizeMin) {
			curSizeMin = houses[i].size;
			curSizeMinPos = i;
		}	
		if (houses[i].constructionYear < curYearMin) {
			curYearMin = houses[i].constructionYear;
			curYearMinPos = i;
		}			
	}	
	
	curPriceMinPos = curPriceMinPos+2;
	$("#houseHandleTable tr:eq("+curPriceMinPos+") label:eq(0)").css("color", "green");
	for (var i = 0; i < houses.length; i++) {
		if (houses[i].price == curPriceMin) {
			$("#houseHandleTable tr:eq("+(i+2)+") label:eq(0)").css("color", "green");
		}
	}
	
	curRentMinPos = curRentMinPos+2;
	$("#houseHandleTable tr:eq("+curRentMinPos+") label:eq(5)").css("color", "green");
	
	curDurationMinPos = curDurationMinPos+2;
	$("#houseHandleTable tr:eq("+curDurationMinPos+") label:eq(3)").css("color", "green");

	curDistanceMinPos = curDistanceMinPos+2;
	$("#houseHandleTable tr:eq("+curDistanceMinPos+") label:eq(4)").css("color", "green");

	curSizeMinPos = curSizeMinPos+2;
	$("#houseHandleTable tr:eq("+curSizeMinPos+") label:eq(6)").css("color", "red");

	curYearMinPos = curYearMinPos+2;
	$("#houseHandleTable tr:eq("+curYearMinPos+") label:eq(7)").css("color", "red");	
	for (var i = 0; i < houses.length; i++) {
		if (houses[i].constructionYear == curYearMin) {
			$("#houseHandleTable tr:eq("+(i+2)+") label:eq(7)").css("color", "red");
		}
	}
	
	
	var curPriceMin = houses[0].price;
	var curRentMin = houses[0].rent;
	var curDurationMin = houses[0].duration;
	var curDistanceMin = houses[0].distance;
	var curSizeMin = houses[0].size;
	var curYearMin = houses[0].constructionYear;
	var curPriceMinPos = 0;
	var curRentMinPos = 0;
	var curDurationMinPos = 0;
	var curDistanceMinPos = 0;
	var curSizeMinPos = 0;
	var curYearMinPos = 0;	
	for (var i = 1; i < houses.length; i++) {
		if (houses[i].price > curPriceMin) {
			curPriceMin = houses[i].price;
			curPriceMinPos = i;
		}
		if (houses[i].rent > curRentMin) {
			curRentMin = houses[i].rent;
			curRentMinPos = i;
		}
		if (houses[i].duration > curDurationMin) {
			curDurationMin = houses[i].duration;
			curDurationMinPos = i;
		}
		if (houses[i].distance > curDistanceMin) {
			curDistanceMin = houses[i].distance;
			curDistanceMinPos = i;
		}
		if (houses[i].size > curSizeMin) {
			curSizeMin = houses[i].size;
			curSizeMinPos = i;
		}	
		if (houses[i].constructionYear > curYearMin) {
			curYearMin = houses[i].constructionYear;
			curYearMinPos = i;
		}			
	}	
	
	curPriceMinPos = curPriceMinPos+2;
	$("#houseHandleTable tr:eq("+curPriceMinPos+") label:eq(0)").css("color", "red");
	for (var i = 0; i < houses.length; i++) {
		if (houses[i].price == curPriceMin) {
			$("#houseHandleTable tr:eq("+(i+2)+") label:eq(0)").css("color", "red");
		}
	}
	
	curRentMinPos = curRentMinPos+2;
	$("#houseHandleTable tr:eq("+curRentMinPos+") label:eq(5)").css("color", "red");
	
	curDurationMinPos = curDurationMinPos+2;
	$("#houseHandleTable tr:eq("+curDurationMinPos+") label:eq(3)").css("color", "red");

	curDistanceMinPos = curDistanceMinPos+2;
	$("#houseHandleTable tr:eq("+curDistanceMinPos+") label:eq(4)").css("color", "red");

	curSizeMinPos = curSizeMinPos+2;
	$("#houseHandleTable tr:eq("+curSizeMinPos+") label:eq(6)").css("color", "green");

	curYearMinPos = curYearMinPos+2;
	$("#houseHandleTable tr:eq("+curYearMinPos+") label:eq(7)").css("color", "green");	
	for (var i = 0; i < houses.length; i++) {
		if (houses[i].constructionYear == curYearMin) {
			$("#houseHandleTable tr:eq("+(i+2)+") label:eq(7)").css("color", "green");
		}
	}	
	
}

function showLivedExpensions() {
	if (houses.length < 1) {
		return;
	}
	if (first_min_max_show == true) {
		sortByParameter($("#totalHeader"));
		first_min_max_show = false;
	}

	if ($("#showLivedExpensions").val() == 0) {
		$("#showLivedExpensions").val(1);
		$("#showLivedExpensions").text("Piilota menot");
		for (var i = 0; i < houses.length; i++) {
			$("#houseHandleTable tr:eq("+(i+2)+") label:eq(9)").text(houses[i].locationDurationRanking+" ("+houses[i].getLocationExpenses()+")");	
			$("#houseHandleTable tr:eq("+(i+2)+") label:eq(11)").text(houses[i].getRentRanking()+" ("+houses[i].getRentExpenses()+")");	
			
		}
	}
	else if ($("#showLivedExpensions").val() == 1) {
		$("#showLivedExpensions").val(0);
		$("#showLivedExpensions").text("N"+A_DOTS+"yt"+A_DOTS+" menot");
		for (var i = 0; i < houses.length; i++) {
			$("#houseHandleTable tr:eq("+(i+2)+") label:eq(9)").text(houses[i].locationDurationRanking);
			$("#houseHandleTable tr:eq("+(i+2)+") label:eq(11)").text(houses[i].getRentRanking());	
						
		}		
	}
}

function recalculate() {
	$("#criteriaWarn").text("");
	$("#houseHandleTable tr:gt(1)").remove();
	$("#houseComparisionTable tr:gt(1)").remove();
	chosenHouse1 = "";
	chosenHouse2 = "";
	for (var i = 0; i < houses.length; i++) {
		$("#houseHandleTable tr:last").after(getEmptyRowString(houses[i].targetIdForEtuovi));
		sendRequest($("#houseHandleTable tr:last"), houses[i].targetIdForEtuovi);
	}
}

function feedHouseCodes(codeStrings) {
	var codes = codeStrings.split("\n");
	var code;
	for (var i = 0; i < codes.length; i++) {
		code = $.trim(codes[i]);
		if (/^[0-9a-zA-Z]+$/.test(code)
		&& code.length < 10) {
			//alert("code: " + codes[i] + ", element: " + $("#houseHandleTable tr:last").html());
			$("#houseHandleTable tr:last").after(getEmptyRowString(code));
			sendRequest($("#houseHandleTable tr:last"), code);
		}
	}
}

function addHouseRow(element) {
	element.after(getEmptyRowString(""));
}

function removeAll() {
	$("#houseHandleTable tr:gt(1)").remove();
	houses = [];
	housesIds = [];
	$("#houseComparisionTable tr:gt(1)").remove();
	chosenHouse1 = "";
	chosenHouse2 = "";
}

function sortByParameter(sortingParameter) {
	if (houses.length == 0) {
		return;
	}
		
	switch (sortingParameter.text()) {
		case "hinta":
		houses.sort(function(a, b) {
			return b.getPriceRanking()-a.getPriceRanking();
		});
		break;
		case "kesto":
		houses.sort(function(a, b) {
			return b.locationDurationRanking-a.locationDurationRanking;
		});
		case "pituus":
		houses.sort(function(a, b) {
			return b.locationDistanceRanking-a.locationDistanceRanking;
		});		
		break;
		case "vuokra":
		houses.sort(function(a, b) {
			return b.getRentRanking()-a.getRentRanking();
		});
		break;
		case "koko":
		houses.sort(function(a, b) {
			return b.getSizeRanking()-a.getSizeRanking();
		});
		break;
		case "vuosi":
		houses.sort(function(a, b) {
			return b.getConstructionYearRanking()-a.getConstructionYearRanking();
		});
		break;
		/*case "kunto":
		houses.sort(function(a, b) {
			return a.-b.;
		});
		break;*/	
		case "yhteispisteet":
		houses.sort(function(a, b) {
			return b.getTotalRanking()-a.getTotalRanking();
		});
		break;		
	}
	
	sortingParameter.parent().parent().children().children().css("font-weight", "normal");
	sortingParameter.css("font-weight", "bold");
	
	$("#showLivedExpensions").val(0);
	$("#showLivedExpensions").text("N"+A_DOTS+"yt"+A_DOTS+" menot");
	
	chosenHouse1 = "";
	chosenHouse2 = "";
	
	$("#houseHandleTable tr:gt(1)").remove();
	
	for (var i = 0; i < houses.length; i++) {
		$("#houseHandleTable tr:last").after(printHouseRow(houses[i]));
	}
}

function updatePipeRepairYear(houseId, pipeRepairYear) {
	for (var i = 0; i < houses.length; i++) {
		if (houseId == houses[i].targetIdForEtuovi) {
			houses[i].lastPlumbingReinnovationYear = pipeRepairYear;
			break;
		}
	}
	compareTwoHouses();
}

function compareTwoHouses() {
	if (chosenHouse1 == ""
		|| chosenHouse2 == "") {
		return;
	}

	$("#houseComparisionTable tr:gt(1)").remove();
	
	var firstHouse = "";
	var secondHouse = "";
	for (var i = 0; i < houses.length; i++) {
		if (chosenHouse1 == houses[i].targetIdForEtuovi
			|| chosenHouse2 == houses[i].targetIdForEtuovi) {
			if (firstHouse == "") {
				firstHouse = houses[i];
			}
			else if (secondHouse == "") {
				secondHouse = houses[i];
			}
			$("#houseComparisionTable tr:last").after(printHouseRowForComparision(houses[i]));
		}
	}
	$("#houseComparisionTable tr:last").after(printHouseValuesDifference(firstHouse, secondHouse));
}

function parseTargetBuyHousePage(urlType, code, baseElement) {
	$.ajax({
		type: "POST",
		url: "proxyParseHousePage.php",
		data: {urlName: urlType, codeName: code}
	})
		.done(function(data) {  
		
		var price = $("dt:contains('Velaton hinta')", $(data)).next().find("label:first").html();
		var location = $("dt:contains('Sijainti:')", $(data)).next().find("label:eq(1)").html();		
		var district = $("dt:contains('Sijainti:')", $(data)).next().find("label:first").html();	
		var rent = $("label:contains('Hoitovastike')", $(data)).html();
		var size = $("dt:contains('Asuinpinta-ala:')", $(data)).next().find("label:first").html();		
		var year = $("dt:contains('Rakennusvuosi:')", $(data)).next().find("label:first").html();		
		
		//alert("price: " + price + ", rent: " + rent + ", size: " +size);
		
		/*price = trimHouseInputData(price);
		rent = trimRent(rent);
		size = trimHouseInputData(size);*/
		price = $.trim(price.replace(/\u20ac/g, ""));
		price = price.replace(/ /g, "");
		rent = $.trim(rent.replace(/\u20ac/g, ""));
		rent = $.trim(rent.substring(rent.indexOf("e")+1, rent.indexOf("/")));
		size = $.trim(size.substring(0, size.indexOf("m")));
		price = price.replace(/,/g, ".");
		rent = rent.replace(/,/g, ".");
		size = size.replace(/,/g, ".");
		
		//alert("price: " + price + ", rent: " + rent + ", size: " +size);
		
		// update HTML-tags information
		$("#price:first", $(baseElement)).text(price);
		$("#location:first", $(baseElement)).text(location);
		$("#district:first", $(baseElement)).text(district);
		$("#rent:first", $(baseElement)).text(rent);
		$("#size:first", $(baseElement)).text(size);
		$("#year:first", $(baseElement)).text(year);
		
		// form a House object
		var house = new House();
		house.targetIdForEtuovi = $("#code", $(baseElement)).val();
		house.price = price;
		house.location = location;
		house.district = district;
		house.rent = rent;
		house.size = size;
		house.constructionYear = year;
		house.lastPlumbingReinnovationYear = year;
		
		$("#priceRank:first", $(baseElement)).text(house.getPriceRanking());
		house.getLocationDistanceOrDurationRanking(baseElement);
		$("#rentRank:first", $(baseElement)).text(house.getRentRanking());
		$("#sizeRank:first", $(baseElement)).text(house.getSizeRanking());
		$("#yearRank:first", $(baseElement)).text(house.getConstructionYearRanking());
		house.getTotalRanking(baseElement);
		
		if ($.inArray(house.targetIdForEtuovi, housesIds) != -1) {
			for (var i = 0; i < houses.length; i++) {
				if (houses[i].targetIdForEtuovi == $("#code", $(baseElement)).val()) {
					houses[i] = house;
					break;
				}
			}
		}
		else {
			houses.push(house);
			housesIds.push(house.targetIdForEtuovi);
		}
		
		$("#code", $(baseElement)).prop('disabled', true);
	})
		.fail(function( jqXHR, textStatus ) {  
		alert( "Request failed: " + textStatus );
	});
}

function parseTargetRentHousePage(urlType, code, baseElement) {
	$.ajax({
		type: "POST",
		url: "proxyParseHousePage.php",
		data: {urlName: urlType, codeName: code}
	})
		.done(function(data) {  
		
		var district = $("th:contains('Sijainti:')", $(data)).next().html();
		var locationStreet = $("th:contains('Sijainti:')", $(data)).next().find("span:first").html();
		var locationCity = $("th:contains('Sijainti:')", $(data)).next().find("span:eq(1)").html();
		var rent = $("th:contains('Vuokra:')", $(data)).next().html();	
		var size = $("th:contains('Asuinpinta-ala:')", $(data)).next().html();				
		
		var location = locationStreet + ", " + $.trim(locationCity.replace(/\d+/g, ''));
		district = district.substring(0, district.indexOf("<br>"));
		rent = trimRentRent(rent);
				
		size = size.substring(0, size.indexOf("m"));
		
		// update HTML-tags information
		$("#location:first", $(baseElement)).text(location);
		$("#district:first", $(baseElement)).text(district);
		$("#rent:first", $(baseElement)).text(rent);
		$("#size:first", $(baseElement)).text(size);
		
		// form a House object
		var house = new House();
		house.targetIdForEtuovi = $("#code", $(baseElement)).val();
		house.price = -1;
		house.location = location;
		house.district = district;
		house.rent = rent.replace(/,/g, ".");
		house.size = size.replace(/,/g, ".");
		house.constructionYear = -1;
		house.lastPlumbingReinnovationYear = year;
		
		house.getLocationDistanceOrDurationRanking(baseElement);
		$("#rentRank:first", $(baseElement)).text(house.getRentRanking());
		$("#sizeRank:first", $(baseElement)).text(house.getSizeRanking());
		house.getTotalRanking(baseElement);
		
		if ($.inArray(house.targetIdForEtuovi, housesIds) != -1) {
			for (var i = 0; i < houses.length; i++) {
				if (houses[i].targetIdForEtuovi == $("#code", $(baseElement)).val()) {
					houses[i] = house;
					break;
				}
			}
		}
		else {
			houses.push(house);
			housesIds.push(house.targetIdForEtuovi);
		}
		
		$("#code", $(baseElement)).prop('disabled', true);
	})
		.fail(function( jqXHR, textStatus ) {  
		alert( "Request failed: " + textStatus );
	});
}

function trimRent(rent) {
	var trimedRent = rent.substring(rent.indexOf(" ")+1, rent.indexOf("€"));
	trimedRent = trimedRent.replace(/,/g, ".");
	trimedRent = trimedRent.replace(/ /g, "");
	return trimedRent;
}

function trimRentRent(rent) {
	rent = rent.replace(/&nbsp;/g, '');
	rent = rent.replace(/ /g, '');
	rent = rent.substring(0, rent.indexOf("€"));
	return rent;
}

function trimHouseInputData(str) {

	str = str.replace(/\u20ac/g, "");
	str = str.replace(/²/g, "");
	str = str.replace(/m/g, "");
	str = str.replace(/,/g, ".");
	str = str.replace(/ /g, "");
	return str;
} 

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function checkControlPanelValues() {
	$("#criteriaTable input").css("color", "black");
	if (parseInt($("#priceMin").val()) > parseInt($("#priceMax").val())) {
		$("#priceMin").css("color", "red");
		$("#priceMin").focus();
		alert("Minimihinnan pit"+A_DOTS+A_DOTS+" olla pienempi kuin maksimihinta!");
		return false;
	}
	if (parseInt($("#rentMin").val()) > parseInt($("#rentMax").val())) {
		$("#rentMin").css("color", "red");
		$("#rentMin").focus();
		alert("Minimivastikkeen pit"+A_DOTS+A_DOTS+" olla pienempi kuin maksimivastike!");
		return false;
	}
	if (parseInt($("#durationMin").val()) > parseInt($("#durationMax").val())) {
		$("#durationMin").css("color", "red");
		$("#durationMin").focus();
		alert("Minimimatkakeston pit"+A_DOTS+A_DOTS+" olla pienempi kuin maksimimatkakesto!");
		return false;
	}
	if (parseInt($("#arrivalHour").val()) > 24) {
		$("#arrivalHour").css("color", "red");
		$("#arrivalHour").focus();
		alert("Saapumisaikatunti on v"+A_DOTS+A_DOTS+"rin!");
		return false;
	}
	if (parseInt($("#arrivalMinutes").val()) > 60) {
		$("#arrivalMinutes").css("color", "red");
		$("#arrivalMinutes").focus();
		alert("Saapumisaikaminuutit ovat v"+A_DOTS+A_DOTS+"rin!");
		return false;
	}
	
	var wasEmpty = false;
	$("#criteriaTable input").each(function() { 
		if ($( this ).val() == "") {
			$(this).focus;
			//alert("Tyhjä");
			wasEmpty = true;
			return true;
		}
	});
	if (wasEmpty == true) {
		alert("T"+A_DOTS+"yt"+A_DOTS+ " kaikki arvot!");
		return false;
	}
	
	if (parseInt($("#arrivalHour").val()) < 10) {
		$("#arrivalHour").val("0"+parseInt($("#arrivalHour").val()));
	}
	if (parseInt($("#arrivalMinutes").val()) < 10) {
		$("#arrivalMinutes").val("0"+parseInt($("#arrivalMinutes").val()));
	}

	WORK_ARRIVAL_TIME = ""+$("#arrivalHour").val()+$("#arrivalMinutes").val();
	
	var stepNum = 10;
	var step = parseInt($("#priceMax").val()) - parseInt($("#priceMin").val());
	$("#priceStep").text("askel: " + Math.round(step/stepNum*100)/100 + " 000 \u20AC");
	//$("#priceRankHeader").html("price rank <br>" + Math.round(step/stepNum*100)/100 + " 000");
	
	step = parseInt($("#rentMax").val()) - parseInt($("#rentMin").val());
	$("#rentStep").text("askel: " + Math.round(step/stepNum*100)/100 + " \u20AC");

	step = parseInt($("#durationMax").val()) - parseInt($("#durationMin").val());
	$("#durationStep").text("askel: " + Math.round(step/stepNum*100)/100 + " min");
	
	step = parseInt($("#distanceMax").val()) - parseInt($("#distanceMin").val());
	$("#distanceStep").text("askel: " + Math.round(step/stepNum*100)/100 + " m");
	
	step = parseInt($("#sizeMax").val()) - parseInt($("#sizeMin").val());
	$("#sizeStep").text("askel: " + Math.round(step/stepNum*100)/100 + " m*m");	

	step = parseInt($("#yearMax").val()) - parseInt($("#yearMin").val());
	$("#yearStep").text("askel: " + Math.round(step/stepNum*100)/100);

	
	
	return true;
}
	
function sendRequest(baseElement, code) {
	//var code = $("#code", $(baseElement)).val();
	if (checkControlPanelValues() == false) {
		return;
	}
		
	setStepValuesToHouseConstants();
	
	if (code == "code") {
		
	}
	
	if (/^[0-9a-zA-Z]+$/.test(code)
		&& code.length < 10) {
		first_min_max_show = true;
		locationResend = true;
		$("#coordDurationTo", $(baseElement)).val("default");
		$("#coordDurationFrom", $(baseElement)).val("default");
		if (mode == "Vertaa omistusasuntoja") {
			var urlType = "etu";		
			parseTargetBuyHousePage(urlType, code, baseElement);
		}
		else if (mode == "Vertaa vuokra-asuntoja") {
			var urlType = "vuokra";
			parseTargetRentHousePage(urlType, code, baseElement);			
		}
	}
	else {
		alert(code + " was invalid code for Etuovi.");
	}
}

function warnOnExistingHouses() {
	if (houses.length > 0) {
		$("#criteriaWarn").text("Kynnysarvoja oli muutettu! Asteikot eiv"+A_DOTS+"t kerro asuntojen todellista sijoitusta. Laske kohteet uudestaan.");
		$("#criteriaWarn").css("color", "red");
	}
}

function changeMode(element) {
	if (element.text() == "Vertaa omistusasuntoja") {
		removeAll();
		mode = "Vertaa omistusasuntoja";
		element.css("color", "black");
		element.css("font-size", "200%");
		element.next().css("color", "#BDBDBD");
		element.next().css("font-weight", "normal");
		element.next().css("font-size", "100%");
		$( "button" ).each(function( index ) {
			$( this ).css("background-color", "black");
			$( this ).css("color", "white");
		});
		$( ".headerRow" ).each(function( index ) {
			$( this ).css("background-color", "black");
			$( this ).css("color", "white");
		});
		$( ".buyHouseInfo" ).each(function( index ) {
			$( this ).css("visibility", "visible");
		});	
	}
	else if (element.text() == "Vertaa vuokra-asuntoja") {
		removeAll();
		mode = "Vertaa vuokra-asuntoja";
		element.css("color", "olive");
		element.css("font-size", "200%");
		element.prev().css("color", "#BDBDBD");
		element.prev().css("font-weight", "normal");
		element.prev().css("font-size", "100%");
		$( "button" ).each(function( index ) {
			$( this ).css("background-color", "olive");
			$( this ).css("color", "white");
		});
		$( ".headerRow" ).each(function( index ) {
			$( this ).css("background-color", "olive");
			$( this ).css("color", "white");
		});	
		$( ".buyHouseInfo" ).each(function( index ) {
			$( this ).css("visibility", "hidden");
		});			
	}
}

