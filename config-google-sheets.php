<?php
/**
 * CONFIGURACIÓN GOOGLE SHEETS
 * 
 * IMPORTANTE: 
 * 1. Despliega tu Google Apps Script como Web App
 * 2. Copia la URL aquí
 * 3. Configura tu ID de hoja de cálculo
 */

// ==================== CONFIGURACIÓN ====================

// URL de tu Google Apps Script desplegado como Web App
// Obtén esta URL después de desplegar el script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymkkxb5ooIn0kqfiJIOBZzJkZCOcPqUKMHRn6BQcIYSRBPJidIDkprq5waXwPZb2jnjw/exec';

// ID de tu hoja de Google Sheets
// Encuéntralo en la URL de tu hoja: https://docs.google.com/spreadsheets/d/[ESTE_ES_TU_ID]/edit
const GOOGLE_SHEET_ID = '1gWzL3GrLhwdOfZer_1SRS80Cq13btFq8H2Mm__B-8MU';

// Configuración del sorteo
const SORTEO_CONFIG = [
    'precio_giro' => 25,
    'simbolos' => ['🍀', '💎', '🍒', 'CODES'],
    'multiplicadores' => [
        '🍀' => 3,  // Trébol (3 en línea)
        '💎' => 5,  // Diamante (3 en línea)
        '🍒' => 2,  // Cereza (3 en línea)
        'CODES' => 10  // CODES (3 en línea) - JACKPOT
    ]
];

// ==================== FUNCIONES DE INTEGRACIÓN ====================

/**
 * Envía un giro a Google Sheets
 * @param array $giroData Datos del giro
 * @return array Respuesta de Google Sheets
 */
function enviarGiroAGoogleSheets($giroData) {
    $postData = [
        'action' => 'guardarGiro',
        'data' => $giroData
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

/**
 * Obtiene estadísticas de Google Sheets
 * @return array Estadísticas
 */
function obtenerEstadisticasDeGoogleSheets() {
    $url = GOOGLE_SCRIPT_URL . '?action=obtenerEstadisticas';
    
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

/**
 * Obtiene giros por número de pago
 * @param string $paymentNumber Número de pago
 * @return array Lista de giros
 */
function obtenerGirosPorPagoDeGoogleSheets($paymentNumber) {
    $postData = [
        'action' => 'obtenerGirosPorPago',
        'data' => ['paymentNumber' => $paymentNumber]
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

/**
 * Prueba la conexión con Google Sheets
 * @return array Resultado de la prueba
 */
function probarConexionGoogleSheets() {
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
        return [
            'success' => false,
            'error' => 'CURL Error: ' . $error,
            'message' => 'No se pudo conectar con Google Sheets'
        ];
    }
    
    if ($httpCode !== 200) {
        return [
            'success' => false,
            'error' => 'HTTP Error: ' . $httpCode,
            'message' => 'Error de conexión con Google Sheets',
            'response' => $response
        ];
    }
    
    $decodedResponse = json_decode($response, true);
    
    if (!$decodedResponse || !$decodedResponse['success']) {
        return [
            'success' => false,
            'error' => 'Invalid response',
            'message' => 'Respuesta inválida de Google Sheets',
            'response' => $response
        ];
    }
    
    return [
        'success' => true,
        'message' => 'Conexión exitosa con Google Sheets',
        'data' => $decodedResponse
    ];
}

// ==================== FUNCIÓN DE PRUEBA ====================

/**
 * Función para probar la integración completa
 */
function probarIntegracionCompleta() {
    echo "<h2>🧪 Prueba de Integración Google Sheets</h2>\n";
    
    // 1. Probar conexión
    echo "<h3>1. Probando conexión...</h3>\n";
    $conexion = probarConexionGoogleSheets();
    if ($conexion['success']) {
        echo "✅ <strong>Conexión exitosa:</strong> " . $conexion['message'] . "<br>\n";
    } else {
        echo "❌ <strong>Error de conexión:</strong> " . $conexion['error'] . "<br>\n";
        return;
    }
    
    // 2. Probar envío de giro
    echo "<h3>2. Probando envío de giro...</h3>\n";
    $giroPrueba = [
        'timestamp' => date('c'),
        'paymentNumber' => 'TEST_' . time(),
        'symbol1' => '🍄',
        'symbol2' => '🍄',
        'symbol3' => '🍄',
        'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Test User Agent'
    ];
    
    $resultadoGiro = enviarGiroAGoogleSheets($giroPrueba);
    if ($resultadoGiro['success']) {
        echo "✅ <strong>Giro enviado exitosamente:</strong> " . $resultadoGiro['message'] . "<br>\n";
        echo "ID del giro: " . $resultadoGiro['giroId'] . "<br>\n";
    } else {
        echo "❌ <strong>Error enviando giro:</strong> " . $resultadoGiro['error'] . "<br>\n";
    }
    
    // 3. Probar estadísticas
    echo "<h3>3. Probando estadísticas...</h3>\n";
    $estadisticas = obtenerEstadisticasDeGoogleSheets();
    if ($estadisticas['success']) {
        echo "✅ <strong>Estadísticas obtenidas:</strong><br>\n";
        echo "Total de giros: " . $estadisticas['totalGiros'] . "<br>\n";
        echo "Giros ganadores: " . $estadisticas['girosGanadores'] . "<br>\n";
        echo "Tasa de ganancia: " . $estadisticas['tasaGanancia'] . "%<br>\n";
    } else {
        echo "❌ <strong>Error obteniendo estadísticas:</strong> " . $estadisticas['error'] . "<br>\n";
    }
    
    echo "<h3>🎉 Prueba completada</h3>\n";
}

// ==================== INSTRUCCIONES ====================

/**
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. CONFIGURAR GOOGLE SHEETS:
 *    - Crear una nueva hoja de cálculo
 *    - Copiar el ID de la hoja desde la URL
 *    - Reemplazar 'TU_SHEET_ID_AQUI' arriba
 * 
 * 2. CONFIGURAR GOOGLE APPS SCRIPT:
 *    - Ir a script.google.com
 *    - Crear nuevo proyecto
 *    - Pegar el código de sorteo-giros.gs
 *    - Reemplazar 'TU_SPREADSHEET_ID_AQUI' en el script
 *    - Guardar y ejecutar setup()
 * 
 * 3. DESPLEGAR COMO WEB APP:
 *    - En Apps Script, ir a Desplegar > Nueva implementación
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo
 *    - Acceso: Cualquier usuario
 *    - Copiar la URL de la aplicación web
 *    - Reemplazar 'TU_SCRIPT_ID_AQUI' arriba
 * 
 * 4. PROBAR INTEGRACIÓN:
 *    - Ejecutar probarIntegracionCompleta() en tu navegador
 *    - Verificar que todo funcione correctamente
 * 
 * 5. INTEGRAR CON TU SISTEMA:
 *    - Los datos se enviarán automáticamente a Google Sheets
 *    - Puedes consultar estadísticas en tiempo real
 *    - Los datos se respaldan automáticamente
 */
?>
