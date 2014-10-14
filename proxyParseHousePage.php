<?php

$urlType = $_POST['urlName'];
$code = $_POST['codeName'];

if ($urlType == "etu") {
	$url = "http://www.etuovi.com/kohde/" . $code;
}
else if () {
	$url = "http://www.etuovi.com/kohde/" . $code;
}

$file_headers = @get_headers($url);
if($file_headers[0] == "HTTP/1.1 404 Not Found") {
    $exists = false;
}
else {
    $exists = true;
}

if ($exists == true) {  
	$handle = fopen($url, "r");  
	if ($handle) {    
		while (!feof($handle)) {        
			$buffer = fgets($handle, 4096);        
		echo $buffer;    
	}    

	fclose($handle);}
} 
else {    
	echo "<html><body>empty page, the url given wasn't found</body></html>";
}

?>
