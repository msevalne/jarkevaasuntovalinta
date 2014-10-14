
/* global variables */
var ROW_ID_RUNNING_NUMBER = 0;


function getEmptyRowString(houseCode) {
	var rowId;
	var codeInputTextPart;
	
	if (isEmpty(houseCode)) {
		ROW_ID_RUNNING_NUMBER++;
		rowId = "rowEmpty" + ROW_ID_RUNNING_NUMBER;
		codeInputTextPart = 
			"<input id=\"code\" type=\"text\" value=\"code\" style=\"width: 65px\" maxlength=\"9\" "+
			"onfocus=\"if ($(this).val() == \'code\') {$(this).val(\'\');} "+ 
			"$(this).focusout(function() { if (isEmpty($(this).val())) {$(this).val(\'code\');}})\"></input>";
	}
	else {
		rowId = "row" + houseCode;
		codeInputTextPart = 
			"<input id=\"code\" disabled=\"true\" type=\"text\" value=\""+ 
			houseCode +
			"\" style=\"width: 65px\"></input>";
	}
	
	var emptyRow = 
	"<tr id=\""+rowId+"\" onclick=\"setForChosen($(this).find(\'input:first\').val(), $(this))\" onmouseover=\"$(this).css(\'background-color\', \'#5F9EA0\');\" onmouseout=\"$(this).css(\'background-color\', \'white\');\">"+
		"<td>"+
			"<button id=\"sendRequest\" type=\"button\" " +
				"onclick=\"sendRequest($(this).parent().parent(), $(this).parent().parent().find(\'#code:first\').val());\">"+
				"Laske"+
			"</button>"+
		"</td>"+
		"<td>"+
		codeInputTextPart +
		"</td>"+
		"<td>"+			
			"<label id=\"price\" class=\"buyHouseInfo\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"location\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"district\">-</label>"+
		"</td>"+
		"<td>"+
			"<label id=\"duration\">-</label>"+
		"</td>"+
		"<td>"+
			"<label id=\"distance\">-</label>"+
		"</td>"+		
		"<td>"+
			"<label id=\"rent\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"size\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"year\" class=\"buyHouseInfo\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"priceRank\" class=\"buyHouseInfo\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"locationDurationRank\">-</label>"+
			"<input id=\"coordDurationFrom\" type=\"hidden\" value=\"default\"/>"+
			"<input id=\"coordDurationTo\" type=\"hidden\" value=\"default\"/>"+
		"</td>"+
		"<td>"+
			"<label id=\"locationDistanceRank\">-</label>"+
		"</td>"+		
		"<td>"+
			"<label id=\"rentRank\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"sizeRank\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"yearRank\" class=\"buyHouseInfo\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"totalRank\">-</label>"+
		"</td>"+
	"</tr>";
	
	return emptyRow;
}

function getOwnHouseInformationEmptyRowString(houseCode) {
	var rowId;
	var codeInputTextPart;
	
	if (isEmpty(houseCode)) {
		ROW_ID_RUNNING_NUMBER++;
		rowId = "rowEmpty" + ROW_ID_RUNNING_NUMBER;
		codeInputTextPart = 
			"<input id=\"code\" type=\"text\" value=\"code\" style=\"width: 65px\" maxlength=\"9\" "+
			"onfocus=\"if ($(this).val() == \'code\') {$(this).val(\'\');} "+ 
			"$(this).focusout(function() { if (isEmpty($(this).val())) {$(this).val(\'code\');}})\"></input>";
	}
	else {
		rowId = "row" + houseCode;
		codeInputTextPart = 
			"<input id=\"code\" disabled=\"true\" type=\"text\" value=\""+ 
			houseCode +
			"\" style=\"width: 65px\"></input>";
	}
	
	var emptyRow = 
	"<tr id=\""+rowId+"\" onclick=\"setForChosen($(this).find(\'input:first\').val(), $(this))\" onmouseover=\"$(this).css(\'background-color\', \'#5F9EA0\');\" onmouseout=\"$(this).css(\'background-color\', \'white\');\">"+
		"<td>"+
			"<button id=\"sendRequest\" type=\"button\" " +
				"onclick=\"sendRequest($(this).parent().parent(), $(this).parent().parent().find(\'#code:first\').val());\">"+
				"Laske"+
			"</button>"+
		"</td>"+
		"<td>"+
		codeInputTextPart +
		"</td>"+
		"<td>"+	
			"<input id=\"ownPrice\" class=\"buyHouseInfo\" type=\"text\" style=\"width: 65px\" maxlength=\"6\"></input>"+		
		"</td>"+	
		"<td>"+
			"<input id=\"ownLocation\" type=\"text\" style=\"width: 125px\" maxlength=\"60\"></input>"+
		"</td>"+	
		"<td>"+
			"<label id=\"district\">-</label>"+
		"</td>"+
		"<td>"+
			"<label id=\"duration\">-</label>"+
		"</td>"+
		"<td>"+
			"<label id=\"distance\">-</label>"+
		"</td>"+		
		"<td>"+
			"<input id=\"ownRent\" type=\"text\" style=\"width: 65px\" maxlength=\"5\"></input>"+
		"</td>"+	
		"<td>"+
			"<input id=\"ownSize\" type=\"text\" style=\"width: 65px\" maxlength=\"5\"></input>"+
		"</td>"+	
		"<td>"+
			"<input id=\"ownYear\" class=\"buyHouseInfo\" type=\"text\" style=\"width: 45px\" maxlength=\"4\"></input>"+
		"</td>"+	
		"<td>"+
			"<label id=\"ownPriceRank\" class=\"buyHouseInfo\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"ownLocationDurationRank\">-</label>"+
			"<input id=\"coordDurationFrom\" type=\"hidden\" value=\"default\"/>"+
			"<input id=\"coordDurationTo\" type=\"hidden\" value=\"default\"/>"+
		"</td>"+
		"<td>"+
			"<label id=\"ownLocationDistanceRank\">-</label>"+
		"</td>"+		
		"<td>"+
			"<label id=\"ownRentRank\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"ownSizeRank\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"ownYearRank\" class=\"buyHouseInfo\">-</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"ownTotalRank\">-</label>"+
		"</td>"+
	"</tr>";
	
	return emptyRow;
}
	
function printHouseRow(house) {

	var rowId = house.targetIdForEtuovi;
	var houseRow = 
	"<tr id=\"row"+rowId+"\" onclick=\"setForChosen($(this).find(\'input:first\').val(), $(this))\" onmouseover=\"$(this).css(\'background-color\', \'#5F9EA0\');\" onmouseout=\"$(this).css(\'background-color\', \'white\');\">"+
		"<td>"+
			"<button id=\"sendRequest\" type=\"button\" "+
				"onclick=\"sendRequest($(this).parent().parent())\">"+
				"Laske"+
			"</button>"+
		"</td>"+
		"<td>"+
			"<input id=\"code\" disabled=\"true\" type=\"text\" value=\""+ house.targetIdForEtuovi +"\" style=\"width: 65px\"></input>"+
		"</td>"+
		"<td>"+			
			"<label id=\"price\" class=\"buyHouseInfo\">"+house.price+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"location\">"+house.location+"</label>"+
		"</td>"+
		"<td>"+
			"<label id=\"district\">"+house.district+"</label>"+
		"</td>"+			
		"<td>"+
			"<label id=\"duration\">"+house.duration+"</label>"+
		"</td>"+
		"<td>"+
			"<label id=\"distance\">"+house.distance+"</label>"+
		"</td>"+		
		"<td>"+
			"<label id=\"rent\">"+house.rent+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"size\">"+house.size+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"year\" class=\"buyHouseInfo\">"+house.constructionYear+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"priceRank\" class=\"buyHouseInfo\">"+house.getPriceRanking()+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"locationDurationRank\">"+house.locationDurationRanking+"</label>"+
			"<input id=\"coordDurationFrom\" type=\"hidden\" value=\"default\"/>"+
			"<input id=\"coordDurationTo\" type=\"hidden\" value=\"default\"/>"+
		"</td>"+
		"<td>"+
			"<label id=\"locationDistanceRank\">"+house.locationDistanceRanking+"</label>"+
		"</td>"+		
		"<td>"+
			"<label id=\"rentRank\">"+house.getRentRanking()+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"sizeRank\">"+house.getSizeRanking()+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"yearRank\" class=\"buyHouseInfo\">"+house.getConstructionYearRanking()+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"totalRank\">"+house.getTotalRanking()+"</label>"+
		"</td>"+		
	"</tr>";

	return houseRow;
}

var firstOrSecondHouse = 0;
function printHouseRowForComparision(house) {	

	var rowId = house.targetIdForEtuovi;
	var houseRow = 
	"<tr>"+
		"<td>"+
			"<label id=\"code\">"+ house.targetIdForEtuovi +"</label>"+
		"</td>"+
		"<td>"+			
			"<label id=\"price\">"+house.price+"</label>"+
		"</td>"+				
		"<td>"+
			"<label id=\"duration\">"+house.duration+
			"<br>("+house.getLocationExpenses()+")</label>"+
		"</td>"+		
		"<td>"+
			"<label id=\"rent\">"+house.rent+
			"<br>("+house.getRentExpenses()+")</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"size\">"+house.size+
			"<br>("+house.size*parseInt($("#squareMeterInvestments").val())+")</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"year\">"+house.constructionYear+"</label>"+
			"<br>"+
			"edellinen putkiremontti: "+
			"<input id=\"previousPipeRepair\" onchange=\"updatePipeRepairYear("+rowId+", $(this).val());\" onkeypress=\"return isNumberKey(event);\" type=\"text\" value=\""+ house.lastPlumbingReinnovationYear +"\" maxlength=\"4\" style=\"width: 50px\"></input>"+			
			"<br>"+
			"<label id=\"pipeRepairPrice"+firstOrSecondHouse+"\"></label>"+
		"</td>"+
		"<td>"+
			"<label id=\"total"+firstOrSecondHouse+"\"></label>"+
		"</td>"+		
	"</tr>";

	firstOrSecondHouse++;
	firstOrSecondHouse = firstOrSecondHouse%2;
	
	return houseRow;
}

function printHouseValuesDifference(house1, house2) {

	var priceDiff = (house1.price-house2.price);
	var durationDiff = (house1.getLocationExpenses()-house2.getLocationExpenses());
	var rentDiff = (house1.getRentExpenses()-house2.getRentExpenses());
	var sizeDiff = (house1.size-house2.size)*parseInt($("#squareMeterInvestments").val());
	var yearsBetweenPipeRepair = 55;
	var curYear = parseInt(new Date().getFullYear());
	var firstHousePipeRepairPrice = 
		Math.round((curYear - parseInt($("#houseComparisionTable tr:eq(2) input:first").val())) *
		(parseInt($("#squareMeterPipeRepairPrice").val()) * house1.size / yearsBetweenPipeRepair));
	$("#pipeRepairPrice0").text(firstHousePipeRepairPrice);
	
	var secondHousePipeRepairPrice = 
		Math.round((curYear - parseInt($("#houseComparisionTable tr:eq(3) input:first").val())) *
		(parseInt($("#squareMeterPipeRepairPrice").val()) * house2.size / yearsBetweenPipeRepair));	
	$("#pipeRepairPrice1").text(secondHousePipeRepairPrice);
	
	var housePipeRepairPriceDiff = firstHousePipeRepairPrice-secondHousePipeRepairPrice;
	
	var firstHouseTotalPrice = 
		Math.round(parseInt(house1.price)+house1.getLocationExpenses()+house1.getRentExpenses()-
		house1.size*parseInt($("#squareMeterInvestments").val())+firstHousePipeRepairPrice);
	var secondHouseTotalPrice = 
		Math.round(parseInt(house2.price)+house2.getLocationExpenses()+house2.getRentExpenses()-
		house2.size*parseInt($("#squareMeterInvestments").val())+secondHousePipeRepairPrice);

	
	$("#total0").text(firstHouseTotalPrice);
	$("#total1").text(secondHouseTotalPrice);
	
	var totalDiff = firstHouseTotalPrice-secondHouseTotalPrice;
		
	var houseRow = 
	"<tr id=\"expensesAndInvestments\">"+
		"<td>"+
		"</td>"+
		"<td>"+			
			"<label id=\"price\">"+priceDiff+"</label>"+
		"</td>"+				
		"<td>"+
			"<label id=\"duration\">"+durationDiff+"</label>"+
		"</td>"+		
		"<td>"+
			"<label id=\"rent\">"+rentDiff+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"size\">"+sizeDiff+"</label>"+
		"</td>"+	
		"<td>"+
			"<label id=\"year\">"+housePipeRepairPriceDiff+"</label>"+
		"</td>"+
		"<td>"+
			"<label id=\"total\">"+totalDiff+"</label>"+
		"</td>"+		
	"</tr>";

	return houseRow;
}



	