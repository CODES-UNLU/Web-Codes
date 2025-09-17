<?php
// Habilitar logging de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Log de inicio
error_log("Verificando pago - Inicio");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$paymentId = $input['paymentId'] ?? '';

error_log("Payment ID recibido: " . $paymentId);

if (empty($paymentId)) {
    error_log("Error: Payment ID vacío");
    echo json_encode(['success' => false, 'message' => 'Número de operación requerido']);
    exit;
}

// Cargar configuración
$config = include 'config.php';

// Configuración de MercadoPago
$accessToken = $config['mercadopago_token'];
$baseUrl = 'https://api.mercadopago.com/v1/payments/' . $paymentId;

// Headers para la petición a MercadoPago
$headers = [
    'Authorization: Bearer ' . $accessToken,
    'Content-Type: application/json'
];

// Inicializar cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $baseUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

error_log("MercadoPago Response Code: " . $httpCode);
error_log("MercadoPago Response: " . $response);

if ($error) {
    error_log("cURL Error: " . $error);
    echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $error]);
    exit;
}

if ($httpCode === 404) {
    echo json_encode(['success' => false, 'message' => 'Número de operación no encontrado']);
    exit;
}

if ($httpCode !== 200) {
    echo json_encode(['success' => false, 'message' => 'Error al verificar el pago']);
    exit;
}

$paymentData = json_decode($response, true);

// Verificar que el pago esté aprobado
if ($paymentData['status'] !== 'approved') {
    echo json_encode(['success' => false, 'message' => 'El pago no está aprobado']);
    exit;
}

// Verificar fecha de creación del pago (debe ser a partir del 17/9/2025)
$dateCreated = $paymentData['date_created'] ?? '';
$minDate = $config['min_date'];

if (!empty($dateCreated)) {
    // Convertir fechas a timestamps para comparar
    $paymentTimestamp = strtotime($dateCreated);
    $minTimestamp = strtotime($minDate);
    
    if ($paymentTimestamp < $minTimestamp) {
        $formattedDate = date('d/m/Y', $paymentTimestamp);
        echo json_encode([
            'success' => false, 
            'message' => "El pago del {$formattedDate} no es válido. Debe ser a partir del 17/09/2025"
        ]);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se pudo verificar la fecha del pago']);
    exit;
}

// Verificar que no se haya usado antes
$usedPaymentsFile = 'used_payments.json';
$usedPayments = [];

if (file_exists($usedPaymentsFile)) {
    $usedPayments = json_decode(file_get_contents($usedPaymentsFile), true) ?? [];
}

if (in_array($paymentId, $usedPayments)) {
    echo json_encode(['success' => false, 'message' => 'Este número de operación ya fue utilizado']);
    exit;
}

// Verificar monto mínimo (opcional)
$amount = $paymentData['transaction_amount'] ?? 0;
if ($amount < $config['min_amount']) {
    echo json_encode(['success' => false, 'message' => 'El monto del pago es insuficiente']);
    exit;
}

// Pago válido - agregar a la lista de usados
$usedPayments[] = $paymentId;
file_put_contents($usedPaymentsFile, json_encode($usedPayments, JSON_PRETTY_PRINT));

$formattedPaymentDate = date('d/m/Y H:i', strtotime($dateCreated));
echo json_encode([
    'success' => true, 
    'message' => "Pago verificado correctamente (del {$formattedPaymentDate})",
    'paymentData' => [
        'id' => $paymentData['id'],
        'amount' => $amount,
        'status' => $paymentData['status'],
        'date_created' => $paymentData['date_created'],
        'formatted_date' => $formattedPaymentDate
    ]
]);
?>
