<?php
// Habilitar logging de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

// Validar datos requeridos
$requiredFields = ['paymentNumber', 'winAmount', 'multiplier', 'results', 'timestamp'];
foreach ($requiredFields as $field) {
    if (!isset($input[$field])) {
        echo json_encode(['success' => false, 'message' => "Campo requerido faltante: {$field}"]);
        exit;
    }
}

// Preparar datos del resultado
$slotResult = [
    'timestamp' => $input['timestamp'],
    'paymentNumber' => $input['paymentNumber'],
    'winAmount' => (float)$input['winAmount'],
    'multiplier' => (float)$input['multiplier'],
    'won' => $input['winAmount'] > 0,
    'results' => $input['results'],
    'symbol1' => $input['symbol1'] ?? '',
    'symbol2' => $input['symbol2'] ?? '',
    'symbol3' => $input['symbol3'] ?? '',
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
];

// Cargar resultados existentes
$resultsFile = '../data/slot-results.json';
$results = [];

if (file_exists($resultsFile)) {
    $results = json_decode(file_get_contents($resultsFile), true) ?? [];
}

// Agregar nuevo resultado
$results[] = $slotResult;

// Guardar en archivo JSON
if (file_put_contents($resultsFile, json_encode($results, JSON_PRETTY_PRINT))) {
    echo json_encode([
        'success' => true, 
        'message' => 'Resultado guardado correctamente',
        'result' => $slotResult
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Error al guardar el resultado'
    ]);
}
?>
