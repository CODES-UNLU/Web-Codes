<?php
// Evitar cualquier output antes del JSON
ob_start();

try {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');

    // Test simple
    $input = json_decode(file_get_contents('php://input'), true);
    $paymentId = $input['paymentId'] ?? '';

    echo json_encode([
        'success' => true,
        'message' => 'Test endpoint funcionando',
        'received_payment_id' => $paymentId,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

ob_end_flush();
?>
