<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ONLY allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method not allowed"
    ]);
    exit();
}
// =============================
// Get input (JSON or form)
// =============================
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST;
}

// =============================
// Validation
// =============================
if (empty($data['name']) || empty($data['phone'])) {
    echo json_encode([
        "success" => false,
        "error" => "Name and phone are required"
    ]);
    exit;
}

// =============================
// Load config (email credentials)
// =============================
$config = require __DIR__ . '/config.php';

// =============================
// Load PHPMailer
// =============================
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';
require __DIR__ . '/phpmailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// =============================
// Create Mail instance
// =============================
$mail = new PHPMailer(true);

try {
    // SMTP config
    $mail->isSMTP();
    $mail->SMTPAuth = true;

    $mail->Host = 'localhost';
    $mail->SMTPAuth = true;

    $mail->Username = $config['email'];
    $mail->Password = $config['password'];

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    // Encoding (for emojis)
    $mail->CharSet = 'UTF-8';

    // Sender & Receiver
    $mail->setFrom($config['email'], 'Website Leads');
    $mail->addAddress('chimnayyyy@gmail.com');

    // Subject
    $mail->Subject = 'New Consultation Request';

    // =============================
    // Email Body (HTML)
    // =============================
    $mail->isHTML(true);
    $mail->Body = "
    <h2>📌 NEW CONSULTATION REQUEST</h2>

    <b>Property Type:</b> " . ($data['propertyType'] ?? '') . "<br>
    <b>Budget Preference:</b> " . ($data['budget'] ?? '') . "<br>
    <b>Expected Delivery:</b> " . ($data['deliveryMonth'] ?? '') . " " . ($data['deliveryYear'] ?? '') . "<br><br>

    <h3>👤 CLIENT DETAILS</h3>
    <b>Name:</b> {$data['name']}<br>
    <b>Phone:</b> {$data['phone']}<br>
    <b>Email:</b> " . ($data['email'] ?? 'Not provided') . "<br>
    <b>Message:</b> " . ($data['message'] ?? 'Not provided') . "
    ";

    // Send mail
    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Email sent successfully"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $mail->ErrorInfo
    ]);
}