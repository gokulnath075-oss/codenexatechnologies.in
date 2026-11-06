<?php
/**
 * Codenexa Technologies - Official Server-Side Mail Dispatcher
 * For deployment on cPanel / Apache / PHP Hosting
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Read JSON input or POST form data
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true) ?: $_POST;

$name = trim($data['name'] ?? 'Client');
$phone = trim($data['phone'] ?? 'Not Provided');
$email = trim($data['email'] ?? '');
$service = trim($data['service'] ?? ($data['services'] ?? 'General Inquiry'));
$message = trim($data['message'] ?? ($data['scope'] ?? ''));

$to_email = 'codenexatechnologies26@gmail.com';
$subject = "Official Website Inquiry: {$name} - {$service}";

$mail_body = "Dear Codenexa Technologies Team,\n\n";
$mail_body .= "A new project inquiry has been received through codenexatechnologies.in:\n\n";
$mail_body .= "==================================================\n";
$mail_body .= "CLIENT DETAILS\n";
$mail_body .= "==================================================\n";
$mail_body .= "• Name: {$name}\n";
$mail_body .= "• Phone: {$phone}\n";
$mail_body .= "• Email: " . ($email ?: 'Not Provided') . "\n";
$mail_body .= "• Service / Scope: {$service}\n\n";
$mail_body .= "==================================================\n";
$mail_body .= "REQUIREMENTS / DETAILS\n";
$mail_body .= "==================================================\n";
$mail_body .= "{$message}\n\n";
$mail_body .= "• Received: " . date('Y-m-d H:i:s') . " IST\n";
$mail_body .= "==================================================\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/plain; charset=UTF-8';
$headers[] = 'From: Codenexa Inquiries <inquiries@codenexatechnologies.in>';
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = "Reply-To: {$name} <{$email}>";
    $headers[] = "Cc: {$email}";
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to_email, $subject, $mail_body, implode("\r\n", $headers));

// Also send confirmation auto-response to client
if ($sent && !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $client_subject = "We received your inquiry - Codenexa Technologies";
    $client_body = "Hello {$name},\n\nThank you for reaching out to Codenexa Technologies.\n\nWe have received your project inquiry for \"{$service}\". Our engineering team will review your requirements and get in touch with you at {$phone} or {$email} shortly.\n\nFor immediate assistance, you can also contact us on WhatsApp at +91 75581 43975.\n\nBest regards,\nCodenexa Technologies Development Team\nhttps://codenexatechnologies.in";
    $client_headers = "From: Codenexa Technologies <codenexatechnologies26@gmail.com>\r\nReply-To: codenexatechnologies26@gmail.com\r\nX-Mailer: PHP/" . phpversion();
    @mail($email, $client_subject, $client_body, $client_headers);
}

echo json_encode([
    'success' => $sent,
    'message' => $sent ? 'Inquiry delivered successfully to codenexatechnologies26@gmail.com' : 'Mail queued'
]);
