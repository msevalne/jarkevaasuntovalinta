
var HOUSE_MIN_PRICE;
var HOUSE_MAX_PRICE;
var HOUSE_MIN_RENT;
var HOUSE_MAX_RENT;
var HOUSE_MIN_SIZE;
var HOUSE_MAX_SIZE;
var HOUSE_MIN_YEAR;
var HOUSE_MAX_YEAR;
var HOUSE_MIN_DISTANCE;
var HOUSE_MAX_DISTANCE;
var HOUSE_MIN_DURATION;
var HOUSE_MAX_DURATION;	

function setStepValuesToHouseConstants() {
	HOUSE_MIN_PRICE = parseInt($("#priceMin").val()+"000");
	HOUSE_MAX_PRICE = parseInt($("#priceMax").val()+"000");
	HOUSE_MIN_RENT = parseInt($("#rentMin").val());
	HOUSE_MAX_RENT = parseInt($("#rentMax").val());
	HOUSE_MIN_SIZE = parseInt($("#sizeMin").val());
	HOUSE_MAX_SIZE = parseInt($("#sizeMax").val());
	HOUSE_MIN_YEAR = parseInt($("#yearMin").val());
	HOUSE_MAX_YEAR = parseInt($("#yearMax").val());
	HOUSE_MIN_DISTANCE = parseInt($("#distanceMin").val());
	HOUSE_MAX_DISTANCE = parseInt($("#distanceMax").val());
	HOUSE_MIN_DURATION = parseInt($("#durationMin").val());
	HOUSE_MAX_DURATION = parseInt($("#durationMax").val());	
}

function House() {

	this.targetIdForEtuovi;
	this.price = -1;
	this.location;
	this.district = "";
	this.rent;
	this.size;
	this.constructionYear = -1;
	
	this.roomNumber;
	this.pricePerSquareMeter;
	this.lastPlumbingReinnovationYear;
	
	this.locationDurationRanking = -1;
	this.locationDistanceRanking = -1;
	
	this.totalRanking = -1;
	
	this.distance;
	this.duration; 
	
	this.rentAccumulated;
	this.travellingCostAccumulated;
	this.plumbingReinnovationCostAccumulated;
	this.squareMeterInvestment;
	
	this.ALTERNATIVE_STREET_IN_REITTIOPAS_FORMAT = "leppavaara+espoo";
	this.COMMON_DATE_ARRIVING_TO_WORK = "20140821";
	this.COMMON_TIME_ARRIVING_TO_WORK = "0900";
	
	this.CLASS_AMOUNT = 10;
	/*this.CLASS_AMOUNT = 10;
	this.MIN_PRICE = 120000;
	this.MAX_PRICE = 200000;
	this.MIN_RENT = 100;
	this.MAX_RENT = 400;
	this.MIN_SIZE = 30;
	this.MAX_SIZE = 65;
	this.MIN_YEAR = 1965;
	this.MAX_YEAR = 1995;
	this.MIN_DISTANCE = 7000;
	this.MAX_DISTANCE = 13000;
	this.MIN_DURATION = 1200;
	this.MAX_DURATION = 3600;	
	this.MIN_PRICE_PER_SIZE = 3200;
	this.MAX_PRICE_PER_SIZE = 4200;*/
	
	this.getLocationExpenses = function() {
		return Math.round(this.duration * $("#yearLivedExpensions").val() * $("#timePrice").val()*2);
	}
	
	this.getRentExpenses = function() {
		return Math.round((this.rent * 12 * $("#yearLivedExpensions").val())/100)*100;
	}
	
	this.removeRankingOverflows = function(ranking) {
		if (ranking < 0) {
			return 0;
		}
		else if (ranking > this.CLASS_AMOUNT) {
			return this.CLASS_AMOUNT;
		}
		else {
			return ranking;
		}
	};
	
	this.getPriceRanking = function() {
		stepValue = (HOUSE_MAX_PRICE - HOUSE_MIN_PRICE) / this.CLASS_AMOUNT;
		value = Math.round(10 - ((this.price - HOUSE_MIN_PRICE) / stepValue));
		return this.removeRankingOverflows(value);		
	};
	
	
	this.getRentRanking = function() {
		stepValue = (HOUSE_MAX_RENT - HOUSE_MIN_RENT) / this.CLASS_AMOUNT;
		value = Math.round(10 - ((this.rent - HOUSE_MIN_RENT) / stepValue));
		return this.removeRankingOverflows(value);
	};

	this.getSizeRanking = function() {
		stepValue = (HOUSE_MAX_SIZE - HOUSE_MIN_SIZE) / this.CLASS_AMOUNT;
		value = Math.round((this.size - HOUSE_MIN_SIZE) / stepValue);
		return this.removeRankingOverflows(value);
	};

	this.getConstructionYearRanking = function() {
		stepValue = (HOUSE_MAX_YEAR - HOUSE_MIN_YEAR) / this.CLASS_AMOUNT;
		value = Math.round((this.constructionYear - HOUSE_MIN_YEAR) / stepValue);
		return this.removeRankingOverflows(value);
	};

	this.getLocationDistanceOrDurationRanking = function(baseElement, distanceOrDuration) {
		if ((this.locationDistanceRanking == -1
			|| this.locationDurationRanking == -1)
			&& locationResend == true) {
			this.totalRanking = -1;
			$("#locationDistanceRank:first", $(baseElement)).on("customLocationChange", 
			function(event, distanceOrDuration, baseElement, house, respondType) {
				if (respondType == "distance") {
					stepValue = (HOUSE_MAX_DISTANCE - HOUSE_MIN_DISTANCE) / house.CLASS_AMOUNT;
					value = Math.round(10 - ((distanceOrDuration - HOUSE_MIN_DURATION) / stepValue));
					house.distance = Math.round(distanceOrDuration/100)*100;
					house.locationDistanceRanking = house.removeRankingOverflows(value);
					$("#distance:first", $(baseElement)).text(house.distance);
					$("#locationDistanceRank:first", $(baseElement)).text(house.locationDistanceRanking);
				}
				else if (respondType == "duration") {
					stepValue = (HOUSE_MAX_DURATION - HOUSE_MIN_DURATION) / house.CLASS_AMOUNT;
					value = Math.round(10 - (((distanceOrDuration/60) - HOUSE_MIN_DURATION) / stepValue));
					house.locationDurationRanking = house.removeRankingOverflows(value);
					house.duration = Math.round(distanceOrDuration/60);
					$("#duration:first", $(baseElement)).text(house.duration);					
					$("#locationDurationRank:first", $(baseElement)).text(house.locationDurationRanking);				
				}
				$("#totalRank:first", $(baseElement)).trigger("customChangeTotalRankingCalculation", [baseElement, house]);
			});
		calculateDistance(baseElement, this.location, LOCATION_WORK, this);		
		}
		else if (distanceOrDuration == "distance") {
			return this.locationDistanceRanking;
		}
		else if (distanceOrDuration == "duration") {
			return this.locationDurationRanking;
		}		
	};
	
	this.getTotalRanking = function(baseElement) {
		if (this.totalRanking == -1) {			
			$("#totalRank:first", $(baseElement)).on("customChangeTotalRankingCalculation", 
			function(event, baseElement, house) {
				//alert("We are here: " + house.locationDistanceRanking + ", " + house.locationDurationRanking);
				if (house.locationDistanceRanking == -1
					|| house.locationDurationRanking == -1) {
					return;
				}
				house.locationResend = false;
				var pr;
				if (house.price != -1) {
					pr = house.getPriceRanking();
				}
				else {
					pr = 0;
				}
				var rr = house.getRentRanking();
				var sr = house.getSizeRanking();
				var yr;
				if (house.constructionYear != -1) {
					yr = house.getConstructionYearRanking();
				}
				else {
					yr = 0;
				}
				var ldisr = house.locationDistanceRanking;
				var ldurr = house.locationDurationRanking;
				
				house.totalRanking = (pr + rr + sr + yr + ldisr + ldurr);
				$("#totalRank:first", $(baseElement)).text(house.totalRanking);
			});
		}
		return this.totalRanking;
	}
}


/*function createHouse() {
	
	alert("toimii");
	var newHouse = new House();
	newHouse.district = "sdf";
	newHouse.price = 175000;
	alert(newHouse.getPriceRanking());
	
}*/



