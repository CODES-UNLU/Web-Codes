<?php
// Versión simplificada que debería funcionar
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Leer datos
$input = json_decode(file_get_contents('php://input'), true);
$paymentId = $input['paymentId'] ?? '';

// Validación básica
if (empty($paymentId)) {
    echo json_encode(['success' => false, 'message' => 'Número de operación requerido']);
    exit;
}

// Simular verificación (reemplazar con API real cuando funcione)
if (strlen($paymentId) >= 5) {
    // Simular que el pago es válido solo si el ID contiene "2025" o es muy largo
    if (strpos($paymentId, '2025') !== false || strlen($paymentId) >= 10) {
        echo json_encode([
            'success' => true,
            'message' => 'Pago verificado correctamente (simulación)',
            'paymentId' => $paymentId,
            'date_created' => date('Y-m-d\TH:i:s.000\Z')
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'El pago debe ser a partir del 17 de septiembre de 2025'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Número de operación no válido'
    ]);
}
?>
