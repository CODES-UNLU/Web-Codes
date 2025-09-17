<?php
/**
 * PRUEBA DE INTEGRACIÓN COMPLETA
 * 
 * Este script prueba todo el flujo desde el giro hasta Google Sheets
 */

// Incluir configuración
require_once 'config-google-sheets.php';

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🧪 Prueba de Integración Completa</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .test-result {
            margin: 10px 0;
            padding: 15px;
            border-radius: 8px;
        }
        .success { background-color: #d4edda; border: 1px solid #c3e6cb; }
        .error { background-color: #f8d7da; border: 1px solid #f5c6cb; }
        .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; }
        .info { background-color: #d1ecf1; border: 1px solid #bee5eb; }
        .code { background-color: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">🧪 Prueba de Integración Completa</h1>
        
        <div class="alert alert-info">
            <h4>📋 Configuración Actual:</h4>
            <p><strong>Google Script URL:</strong> <code><?php echo GOOGLE_SCRIPT_URL; ?></code></p>
            <p><strong>Google Sheet ID:</strong> <code><?php echo GOOGLE_SHEET_ID; ?></code></p>
        </div>

        <?php
        // ==================== PRUEBA 1: CONEXIÓN ====================
        echo "<div class='test-result info'>";
        echo "<h3>🌐 Prueba 1: Conexión con Google Sheets</h3>";
        
        try {
            $conexion = probarConexionGoogleSheets();
            
            if ($conexion['success']) {
                echo "<div class='alert alert-success'>✅ <strong>Conexión exitosa</strong></div>";
                echo "<div class='code'>" . json_encode($conexion['data'], JSON_PRETTY_PRINT) . "</div>";
            } else {
                echo "<div class='alert alert-danger'>❌ <strong>Error de conexión:</strong> " . $conexion['error'] . "</div>";
                if (isset($conexion['response'])) {
                    echo "<div class='code'>Respuesta: " . htmlspecialchars($conexion['response']) . "</div>";
                }
            }
        } catch (Exception $e) {
            echo "<div class='alert alert-danger'>❌ <strong>Excepción:</strong> " . $e->getMessage() . "</div>";
        }
        echo "</div>";

        // ==================== PRUEBA 2: ENVÍO DE GIRO ====================
        echo "<div class='test-result info'>";
        echo "<h3>🎰 Prueba 2: Envío de Giro a Google Sheets</h3>";
        
        $giroPrueba = [
            'timestamp' => date('c'),
            'paymentNumber' => 'PRUEBA_' . time(),
            'symbol1' => '🍀',
            'symbol2' => '🍀',
            'symbol3' => '🍀',
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
            'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Prueba de Integración'
        ];
        
        echo "<div class='code'>Datos del giro de prueba:<br>" . json_encode($giroPrueba, JSON_PRETTY_PRINT) . "</div>";
        
        try {
            $resultado = enviarGiroAGoogleSheets($giroPrueba);
            
            if ($resultado['success']) {
                echo "<div class='alert alert-success'>✅ <strong>Giro enviado exitosamente</strong></div>";
                echo "<div class='code'>";
                echo "ID del giro: " . $resultado['giroId'] . "<br>";
                echo "Ganó: " . ($resultado['gano'] ? 'Sí' : 'No') . "<br>";
                echo "Multiplicador: " . $resultado['multiplicador'] . "<br>";
                echo "Monto ganado: $" . $resultado['montoGanado'] . "<br>";
                echo "</div>";
            } else {
                echo "<div class='alert alert-danger'>❌ <strong>Error enviando giro:</strong> " . $resultado['error'] . "</div>";
                if (isset($resultado['response'])) {
                    echo "<div class='code'>Respuesta: " . htmlspecialchars($resultado['response']) . "</div>";
                }
            }
        } catch (Exception $e) {
            echo "<div class='alert alert-danger'>❌ <strong>Excepción:</strong> " . $e->getMessage() . "</div>";
        }
        echo "</div>";

        // ==================== PRUEBA 3: SIMULACIÓN COMPLETA ====================
        echo "<div class='test-result info'>";
        echo "<h3>🔄 Prueba 3: Simulación Completa del Flujo</h3>";
        
        // Simular el flujo completo como lo haría tu sistema
        $giroCompleto = [
            'timestamp' => date('c'),
            'paymentNumber' => 'SIMULACION_' . time(),
            'symbol1' => '💎',
            'symbol2' => '💎',
            'symbol3' => '💎',
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
            'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Simulación Completa'
        ];
        
        echo "<div class='code'>Simulando giro completo:<br>" . json_encode($giroCompleto, JSON_PRETTY_PRINT) . "</div>";
        
        // Simular el cálculo de ganancia
        $gano = ($giroCompleto['symbol1'] === $giroCompleto['symbol2'] && $giroCompleto['symbol2'] === $giroCompleto['symbol3']);
        $multiplicador = 0;
        $montoGanado = 0;
        
        if ($gano) {
            $multiplicador = SORTEO_CONFIG['multiplicadores'][$giroCompleto['symbol1']] ?? 0;
            $montoGanado = SORTEO_CONFIG['precio_giro'] * $multiplicador;
        }
        
        echo "<div class='code'>";
        echo "Ganó: " . ($gano ? 'Sí' : 'No') . "<br>";
        echo "Multiplicador: " . $multiplicador . "<br>";
        echo "Monto ganado: $" . $montoGanado . "<br>";
        echo "</div>";
        
        try {
            $resultadoCompleto = enviarGiroAGoogleSheets($giroCompleto);
            
            if ($resultadoCompleto['success']) {
                echo "<div class='alert alert-success'>✅ <strong>Simulación exitosa</strong></div>";
                echo "<div class='code'>" . json_encode($resultadoCompleto, JSON_PRETTY_PRINT) . "</div>";
            } else {
                echo "<div class='alert alert-danger'>❌ <strong>Error en simulación:</strong> " . $resultadoCompleto['error'] . "</div>";
            }
        } catch (Exception $e) {
            echo "<div class='alert alert-danger'>❌ <strong>Excepción en simulación:</strong> " . $e->getMessage() . "</div>";
        }
        echo "</div>";

        // ==================== PRUEBA 4: VERIFICACIÓN EN GOOGLE SHEETS ====================
        echo "<div class='test-result info'>";
        echo "<h3>📊 Prueba 4: Verificación de Datos en Google Sheets</h3>";
        
        try {
            $estadisticas = obtenerEstadisticasDeGoogleSheets();
            
            if ($estadisticas['success']) {
                echo "<div class='alert alert-success'>✅ <strong>Estadísticas obtenidas</strong></div>";
                echo "<div class='row'>";
                echo "<div class='col-md-6'>";
                echo "<div class='code'>";
                echo "Total de giros: " . $estadisticas['totalGiros'] . "<br>";
                echo "Giros ganadores: " . $estadisticas['girosGanadores'] . "<br>";
                echo "Giros perdedores: " . $estadisticas['girosPerdedores'] . "<br>";
                echo "Tasa de ganancia: " . $estadisticas['tasaGanancia'] . "%<br>";
                echo "</div>";
                echo "</div>";
                echo "<div class='col-md-6'>";
                echo "<div class='code'>";
                echo "Total ganado: $" . $estadisticas['totalGanado'] . "<br>";
                echo "Total recaudado: $" . $estadisticas['totalRecaudado'] . "<br>";
                echo "Ganancia neta: $" . $estadisticas['gananciaNeta'] . "<br>";
                echo "Última actualización: " . $estadisticas['ultimaActualizacion'] . "<br>";
                echo "</div>";
                echo "</div>";
                echo "</div>";
            } else {
                echo "<div class='alert alert-danger'>❌ <strong>Error obteniendo estadísticas:</strong> " . $estadisticas['error'] . "</div>";
            }
        } catch (Exception $e) {
            echo "<div class='alert alert-danger'>❌ <strong>Excepción obteniendo estadísticas:</strong> " . $e->getMessage() . "</div>";
        }
        echo "</div>";

        // ==================== RESUMEN ====================
        echo "<div class='test-result success'>";
        echo "<h3>🎉 Resumen de la Prueba</h3>";
        echo "<p><strong>Si todas las pruebas pasaron, tu sistema está funcionando correctamente.</strong></p>";
        echo "<p>Los datos ahora se enviarán automáticamente a Google Sheets cada vez que alguien haga un giro.</p>";
        echo "<p><a href='https://docs.google.com/spreadsheets/d/" . GOOGLE_SHEET_ID . "/edit' target='_blank' class='btn btn-primary'>Ver tu Hoja de Google Sheets</a></p>";
        echo "</div>";
        ?>
    </div>
</body>
</html>
