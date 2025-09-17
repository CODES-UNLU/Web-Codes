<?php
/**
 * PRUEBA DEL MULTIPLICADOR - ENVÍO A GOOGLE SHEETS
 * 
 * Este archivo prueba que los datos del multiplicador lleguen correctamente
 * a Google Sheets usando la misma estructura que el sorteo.
 */

// Configuración
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymkkxb5ooIn0kqfiJIOBZzJkZCOcPqUKMHRn6BQcIYSRBPJidIDkprq5waXwPZb2jnjw/exec';
const GOOGLE_SHEET_ID = '1gWzL3GrLhwdOfZer_1SRS80Cq13btFq8H2Mm__B-8MU';

echo "<h1>🧪 Prueba del Multiplicador - Google Sheets</h1>\n";

// Función para enviar datos a Google Sheets
function enviarMultiplicadorAGoogleSheets($datos) {
    $postData = [
        'action' => 'guardarGiro',
        'data' => $datos
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, GOOGLE_SCRIPT_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen(json_encode($postData))
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
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

// Probar conexión básica
echo "<h2>1. Probando conexión con Google Apps Script...</h2>\n";
$url = GOOGLE_SCRIPT_URL . '?action=obtenerInfoSistema';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "❌ <strong>Error de conexión:</strong> " . $error . "<br>\n";
} elseif ($httpCode !== 200) {
    echo "❌ <strong>Error HTTP:</strong> " . $httpCode . "<br>\n";
} else {
    $data = json_decode($response, true);
    if ($data && $data['success'] !== false) {
        echo "✅ <strong>Conexión exitosa</strong><br>\n";
        echo "📊 <strong>Hoja configurada:</strong> " . $data['configuracion']['SPREADSHEET_ID'] . "<br>\n";
        echo "📋 <strong>Hojas disponibles:</strong> " . implode(', ', $data['hojasDisponibles']) . "<br>\n";
    } else {
        echo "❌ <strong>Respuesta inválida:</strong> " . $response . "<br>\n";
    }
}

// Probar envío de giro del multiplicador
echo "<h2>2. Probando envío de giro del multiplicador...</h2>\n";

$giroMultiplicador = [
    'timestamp' => date('c'),
    'paymentNumber' => 'TEST_MULTIPLICADOR_' . time(),
    'symbol1' => 'CODES',
    'symbol2' => 'CODES', 
    'symbol3' => 'CODES',
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Test Multiplicador'
];

echo "📤 <strong>Enviando datos:</strong><br>\n";
echo "<pre>" . json_encode($giroMultiplicador, JSON_PRETTY_PRINT) . "</pre>\n";

$resultado = enviarMultiplicadorAGoogleSheets($giroMultiplicador);

if ($resultado['success']) {
    echo "✅ <strong>Giro enviado exitosamente:</strong><br>\n";
    echo "🆔 <strong>ID del giro:</strong> " . $resultado['giroId'] . "<br>\n";
    echo "🎯 <strong>Ganó:</strong> " . ($resultado['gano'] ? 'SÍ' : 'NO') . "<br>\n";
    echo "🔢 <strong>Multiplicador:</strong> " . $resultado['multiplicador'] . "<br>\n";
    echo "💰 <strong>Monto ganado:</strong> $" . $resultado['montoGanado'] . "<br>\n";
} else {
    echo "❌ <strong>Error enviando giro:</strong> " . $resultado['error'] . "<br>\n";
    if (isset($resultado['response'])) {
        echo "📄 <strong>Respuesta del servidor:</strong> " . $resultado['response'] . "<br>\n";
    }
}

// Probar envío de giro perdedor
echo "<h2>3. Probando envío de giro perdedor...</h2>\n";

$giroPerdedor = [
    'timestamp' => date('c'),
    'paymentNumber' => 'TEST_PERDEDOR_' . time(),
    'symbol1' => '🍀',
    'symbol2' => '💎', 
    'symbol3' => '🍒',
    'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
    'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Test Multiplicador'
];

$resultadoPerdedor = enviarMultiplicadorAGoogleSheets($giroPerdedor);

if ($resultadoPerdedor['success']) {
    echo "✅ <strong>Giro perdedor enviado exitosamente:</strong><br>\n";
    echo "🆔 <strong>ID del giro:</strong> " . $resultadoPerdedor['giroId'] . "<br>\n";
    echo "🎯 <strong>Ganó:</strong> " . ($resultadoPerdedor['gano'] ? 'SÍ' : 'NO') . "<br>\n";
    echo "🔢 <strong>Multiplicador:</strong> " . $resultadoPerdedor['multiplicador'] . "<br>\n";
    echo "💰 <strong>Monto ganado:</strong> $" . $resultadoPerdedor['montoGanado'] . "<br>\n";
} else {
    echo "❌ <strong>Error enviando giro perdedor:</strong> " . $resultadoPerdedor['error'] . "<br>\n";
}

// Obtener estadísticas
echo "<h2>4. Obteniendo estadísticas actualizadas...</h2>\n";

$urlStats = GOOGLE_SCRIPT_URL . '?action=obtenerEstadisticas';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $urlStats);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$responseStats = curl_exec($ch);
$httpCodeStats = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCodeStats === 200) {
    $stats = json_decode($responseStats, true);
    if ($stats) {
        echo "✅ <strong>Estadísticas obtenidas:</strong><br>\n";
        echo "🎰 <strong>Total de giros:</strong> " . $stats['totalGiros'] . "<br>\n";
        echo "🏆 <strong>Giros ganadores:</strong> " . $stats['girosGanadores'] . "<br>\n";
        echo "💸 <strong>Giros perdedores:</strong> " . $stats['girosPerdedores'] . "<br>\n";
        echo "📊 <strong>Tasa de ganancia:</strong> " . $stats['tasaGanancia'] . "%<br>\n";
        echo "💰 <strong>Total ganado:</strong> $" . $stats['totalGanado'] . "<br>\n";
        echo "💵 <strong>Total recaudado:</strong> $" . $stats['totalRecaudado'] . "<br>\n";
        echo "📈 <strong>Ganancia neta:</strong> $" . $stats['gananciaNeta'] . "<br>\n";
    } else {
        echo "❌ <strong>Error parseando estadísticas:</strong> " . $responseStats . "<br>\n";
    }
} else {
    echo "❌ <strong>Error obteniendo estadísticas:</strong> HTTP " . $httpCodeStats . "<br>\n";
}

echo "<h2>🎉 Prueba completada</h2>\n";
echo "<p><strong>Instrucciones:</strong></p>\n";
echo "<ol>\n";
echo "<li>Revisa tu hoja de Google Sheets: <a href='https://docs.google.com/spreadsheets/d/" . GOOGLE_SHEET_ID . "/edit' target='_blank'>Abrir hoja</a></li>\n";
echo "<li>Verifica que aparezcan los giros de prueba en la hoja 'Giros del Sorteo'</li>\n";
echo "<li>Revisa las estadísticas en la hoja 'Estadísticas'</li>\n";
echo "<li>Si todo funciona, el multiplicador ya está configurado correctamente</li>\n";
echo "</ol>\n";
?>
