<?php
header('content-type: application/json');

if(empty($_POST["first_name"]) || empty($_POST["last_name"]) || empty($_POST["email"]) || empty($_POST["message"])){
	$c="0";
	$errorMessage .="<li>You haven't completed a required field. Please note all fields are required except budget.</li>";
}
if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL) && (!empty($_POST["email"]))) {
    $c="0";
    $errorMessage .="<li>Invalid Email Address Format</li>";
}

//eliminate every char except 0-9
$justNums = preg_replace("/[^0-9]/", '', $_POST["phone"]);

//eliminate leading 1 if its there
if (strlen($justNums) == 11) $justNums = preg_replace("/^1/", '',$justNums);

//if we have 10 digits left, it's probably valid.
if (strlen($justNums) == 10) $isPhoneNum = true;
if(!$isPhoneNum && (!empty($_POST["phone"]))){
$c="0";
$errorCode = "P1";
$errorMessage .="<li>Invalid Phone Number Format</li>";
}


if($c=="0"){
	http_response_code(403);
	$return["success"]="n";
	$return["errorCode"] = $errorCode;
	$return["finalMessage"]=$errorMessage;
} else {
	http_response_code(200);
	$return["success"]="y";
	$return["finalMessage"]="Thank you for emailing me!  I will get back to you within the next 24 hours.";

	$to      = 'jayson@jaysonkadlecek.me';
	$subject = 'Message from ' . $_POST["first_name"] . ' ' . $_POST['last_name'];
	$message = '<p>A message was sent to you via the contact form on jaysonkadlecek.me. </p><p> Name: ' . $_POST["first_name"] . ' ' . $_POST["last_name"] . '</p><p> Phone Number: ' . $_POST["phone"] . ' </p><p>Email: ' . $_POST["email"] . '</p><p>Message:<br>' . $_POST["message"] . '</p><p></p>';
	$headers = 'From: hi@jaysonkadlecek.me' . "\r\n" .
    'Content-type:text/html' . "\r\n";
    
	mail($to, $subject, $message, $headers);

}

echo json_encode($return);
 

?>