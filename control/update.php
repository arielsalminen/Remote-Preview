<?php
if(!empty($_POST['url'])) {
	$filename = '../url';
	if(is_writable($filename)) {
		$h = fopen($filename, 'w');
		fwrite($h, $_POST['url']);
		fclose($h);
		echo "Go check your devices";
		exit;
	}
}
?>