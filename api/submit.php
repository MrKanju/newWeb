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

    $mail->Host = 'mail.vismayakitchen.com';
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

    // =============================
    // SAVE TO GOOGLE SHEETS
    // =============================
    $webhook = "https://script.google.com/macros/s/AKfycbwzN6h4RfdXe8IfYwngLSLmE3zVKa3K7_V3uwBCpNL0bbEjzEdrhxnoUwzINn5RWog/exec"; // <-- paste your URL

    $sheetData = [
        "name" => $data['name'] ?? '',
        "phone" => $data['phone'] ?? '',
        "email" => $data['email'] ?? '',
        "propertyType" => $data['propertyType'] ?? '',
        "budget" => $data['budget'] ?? '',
        "deliveryMonth" => $data['deliveryMonth'] ?? '',
        "deliveryYear" => $data['deliveryYear'] ?? '',
        "message" => $data['message'] ?? ''
    ];

    $payload = json_encode($sheetData);

    $ch = curl_init($webhook);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

    $response = curl_exec($ch);
    $error = curl_error($ch);

    curl_close($ch);

    // Optional: log error (don’t break flow)
    if ($error) {
        error_log("Sheets Error: " . $error);
    }

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