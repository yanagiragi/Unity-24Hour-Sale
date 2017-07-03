<?php

	$filepath = "dump/" . date("Y-m-d") . ".json";

	$data = json_decode(file_get_contents($filepath));

	$to      = 'YOUR_MAIL';
	$subject = 'Daily Offer: ' . $data->title . "(" . $data->percentage . "% Off!)";
	$headers = "From: yanagi\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	system("php generate.php > test.php");
	$message = file_get_contents("test.php");

	mail($to, $subject, $message, $headers);	
?>
