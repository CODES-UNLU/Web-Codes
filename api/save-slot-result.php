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
$jsonSaved = file_put_contents($resultsFile, json_encode($results, JSON_PRETTY_PRINT));

// También enviar a Google Sheets
$googleSheetsResponse = null;
try {
    $googleSheetsResponse = sendToGoogleSheets($slotResult);
} catch (Exception $e) {
    error_log("Error enviando a Google Sheets: " . $e->getMessage());
}

if ($jsonSaved) {
    $response = [
        'success' => true, 
        'message' => 'Resultado guardado correctamente',
        'result' => $slotResult,
        'googleSheets' => $googleSheetsResponse
    ];
    
    // Si Google Sheets falló, agregar advertencia pero no fallar
    if (!$googleSheetsResponse || !$googleSheetsResponse['success']) {
        $response['warning'] = 'Datos guardados localmente, pero no se pudieron enviar a Google Sheets';
    }
    
    echo json_encode($response);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Error al guardar el resultado'
    ]);
}

/**
 * Envía los datos del giro a Google Sheets
 */
function sendToGoogleSheets($giroData) {
    // URL de tu Google Apps Script desplegado como Web App
    // IMPORTANTE: Reemplaza con tu URL real
    $scriptUrl = 'https://script.google.com/macros/s/AKfycbymkkxb5ooIn0kqfiJIOBZzJkZCOcPqUKMHRn6BQcIYSRBPJidIDkprq5waXwPZb2jnjw/exec';
    
    $postData = [
        'action' => 'guardarGiro',
        'data' => $giroData
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $scriptUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen(json_encode($postData))
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); // 10 segundos timeout
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        return [
            'success' => false,
            'error' => 'CURL Error: ' . $error
        ];
    }
    
    if ($httpCode !== 200) {
        return [
            'success' => false,
            'error' => 'HTTP Error: ' . $httpCode,
            'response' => $response
        ];
    }
    
    $decodedResponse = json_decode($response, true);
    return $decodedResponse ?: [
        'success' => false,
        'error' => 'Invalid JSON response',
        'response' => $response
    ];
}
?>
