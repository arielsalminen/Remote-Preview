<?php
if(!empty($_POST['url'])) {
	$filename = '../url';
	$pattern = "/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/";
	if(is_writable($filename) && preg_match($pattern, $_POST['url']) == 1) {
		$h = fopen($filename, 'w');
		fwrite($h, $_POST['url']);
		fclose($h);
		echo "Success! Go check your devices.";
		exit;
	} else {
    	echo "Error: The URL file is not writable.";
	}
}
?>