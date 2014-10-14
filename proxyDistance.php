<?php

$url = $_POST['urlName'];


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

?>