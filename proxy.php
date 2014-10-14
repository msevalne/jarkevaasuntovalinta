<?php

//header('Content-type: application/xml');

$street = "default"; //"mesenaatinkuja+2+helsinki";
//$street = "mesenaatinkuja+2+espoo";
$GEOCODE_REQUEST = "http://api.reittiopas.fi/hsl/prod/?request=geocode&user=domalyzer&pass=domalyzer&format=xml&key=";
$street = $_POST['streetAddressName'];
$url = $GEOCODE_REQUEST . $street;

//echo "<html><body>url: $url</body></html>";



$array = file_get_contents($url);
if(strpos($array, "xml version=")) {    
	$doc = new DOMDocument();
	$doc->load($url);
	echo $doc->saveXML();
} else {    
	$doc = new DOMDocument('1.0');
	$doc->formatOutput = true;

	$root = $doc->createElement('emptyTag');
	$root = $doc->appendChild($root);
	echo $doc->saveXML();
}




/*$handle = fopen($url, "r");

if ($handle) {    
	while (!feof($handle)) {        
		$buffer = fgets($handle, 4096);        
	echo $buffer;    
}    

fclose($handle);}*/

?>