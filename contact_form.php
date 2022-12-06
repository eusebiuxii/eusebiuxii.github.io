<html>
    <head>
		<title>Contact</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
	</head>
</html>

<?php
if (isset($_POST['submit'])) {

    $email_to = "eusebiuxii@gmail.com";
    $email_subject = "New Portfolio Message";

    function problem($error)
    {
        echo "<body class='is-preload'><div id='wrapper'><header id = 'header'><div class = 'inner'><a href='index.html' class='logo'><span class='symbol'><img src='images/logo.svg' alt='' /></span><span class='title'>Portfolio</span></a>";
        echo "<div id = 'main'><div class = 'inner'><p>We're sorry, but there were error(s) found with the form you submitted.<br>These errors appear below:<ul>{$error}</ul><br>Make sure the details you enter are correct.<br><br></p></div></div></div>";
        die();
    }

    // validation expected data exists
    if (
        !isset($_POST['Name']) ||
        !isset($_POST['Email']) ||
        !isset($_POST['Message'])
    ) {
        problem("We're sorry, but there appears to be a problem with the form you submitted.");
    }

    $name = $_POST['Name']; // required
    $email = $_POST['Email']; // required
    $message = $_POST['Message']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if (!preg_match($email_exp, $email)) {
        $error_message .= '<li>The Email address you entered does not appear to be valid.</li>';
    }

    $string_exp = "/^[A-Za-z .'-]+$/";

    if (!preg_match($string_exp, $name)) {
        $error_message .= '<li>The Name you entered does not appear to be valid.</li>';
    }

    if (strlen($message) < 2) {
        $error_message .= '<li>The Message you entered do not appear to be valid.</li>';
    }

    if (strlen($error_message) > 0) {
        problem($error_message);
    }

    $email_message = "Form details below.\n\n";

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Name: " . clean_string($name) . "\r\n";
    $email_message .= "Email: " . clean_string($email) . "\r\n";
    $email_message .= "Message: " . clean_string($message) . "\r\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
}
 
?>
<html>
    <body class="is-preload">
        <!-- Wrapper -->
        <div id="wrapper">
            <!-- Header -->
            <header id = "header">
                <div class = "inner">
                    <!-- Logo -->
                        <a href="index.html" class="logo">
                            <span class="symbol"><img src="images/logo.svg" alt="" /></span><span class="title">Portfolio</span>
                        </a>

                    <!-- Nav -->
                        <nav>
                            <ul>
                                <li><a href="#menu">Menu</a></li>
                            </ul>
                        </nav>
                </div>
            </header>
        <!-- Menu -->
            <nav id="menu">
                <h2>Menu</h2>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <!-- <li><a href="about_myself.html">About Me</a></li> -->
                    <li><a href="other_projects.html">Other Projects</a></li>
                    <li><a href="uni_modules.html">University Modules</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
            
        <!-- Main -->
            <div id = "main">
                <div class = "inner">
                    <h1>Thanks for getting in touch.</h1>
                </div>
            </div>
        </div>

        <!-- Scripts -->
            <script src="assets/js/jquery.min.js"></script>
            <script src="assets/js/browser.min.js"></script>
            <script src="assets/js/breakpoints.min.js"></script>
            <script src="assets/js/util.js"></script>
            <script src="assets/js/main.js"></script>
    </body>
</html>
<?php

?>
