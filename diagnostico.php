<?php
/**
 * DIAGNÓSTICO DEL SISTEMA DE GOOGLE SHEETS
 * 
 * Este script te ayuda a identificar exactamente qué está fallando
 */

// Incluir configuración
require_once 'config-google-sheets.php';

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔍 Diagnóstico - Sistema Google Sheets</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .diagnostic-section {
            margin: 20px 0;
            padding: 20px;
            border-radius: 8px;
        }
        .success { background-color: #d4edda; border: 1px solid #c3e6cb; }
        .error { background-color: #f8d7da; border: 1px solid #f5c6cb; }
        .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; }
        .info { background-color: #d1ecf1; border: 1px solid #bee5eb; }
        .code { background-color: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; }
    </style>
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">🔍 Diagnóstico del Sistema</h1>
        
        <?php
        // ==================== DIAGNÓSTICO 1: CONFIGURACIÓN ====================
        echo "<div class='diagnostic-section info'>";
        echo "<h3>📋 1. Verificación de Configuración</h3>";
        
        $configurado = true;
        
        // Verificar Google Sheet ID
        if (GOOGLE_SHEET_ID === 'TU_SHEET_ID_AQUI') {
            echo "<div class='alert alert-danger'>❌ <strong>Google Sheet ID no configurado</strong></div>";
            $configurado = false;
        } else {
            echo "<div class='alert alert-success'>✅ <strong>Google Sheet ID:</strong> " . GOOGLE_SHEET_ID . "</div>";
        }
        
        // Verificar Google Script URL
        if (GOOGLE_SCRIPT_URL === 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec') {
            echo "<div class='alert alert-danger'>❌ <strong>Google Script URL no configurado</strong></div>";
            $configurado = false;
        } else {
            echo "<div class='alert alert-success'>✅ <strong>Google Script URL:</strong> " . GOOGLE_SCRIPT_URL . "</div>";
        }
        
        if ($configurado) {
            echo "<div class='alert alert-success'>✅ <strong>Configuración completa</strong></div>";
        } else {
            echo "<div class='alert alert-warning'>⚠️ <strong>Configuración incompleta</strong> - Necesitas completar los pasos de configuración</div>";
        }
        echo "</div>";
        
        // ==================== DIAGNÓSTICO 2: CONEXIÓN ====================
        if ($configurado) {
            echo "<div class='diagnostic-section info'>";
            echo "<h3>🌐 2. Verificación de Conexión</h3>";
            
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
        }
        
        // ==================== DIAGNÓSTICO 3: PRUEBA DE GIRO ====================
        if ($configurado) {
            echo "<div class='diagnostic-section info'>";
            echo "<h3>🎰 3. Prueba de Envío de Giro</h3>";
            
            $giroPrueba = [
                'timestamp' => date('c'),
                'paymentNumber' => 'DIAGNOSTICO_' . time(),
                'symbol1' => '🍀',
                'symbol2' => '🍀',
                'symbol3' => '🍀',
                'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1',
                'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Diagnóstico'
            ];
            
            try {
                $resultado = enviarGiroAGoogleSheets($giroPrueba);
                
                if ($resultado['success']) {
                    echo "<div class='alert alert-success'>✅ <strong>Giro enviado exitosamente</strong></div>";
                    echo "<div class='code'>ID del giro: " . $resultado['giroId'] . "</div>";
                    echo "<div class='code'>Ganó: " . ($resultado['gano'] ? 'Sí' : 'No') . "</div>";
                    echo "<div class='code'>Multiplicador: " . $resultado['multiplicador'] . "</div>";
                    echo "<div class='code'>Monto ganado: $" . $resultado['montoGanado'] . "</div>";
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
        }
        
        // ==================== DIAGNÓSTICO 4: ESTADÍSTICAS ====================
        if ($configurado) {
            echo "<div class='diagnostic-section info'>";
            echo "<h3>📊 4. Verificación de Estadísticas</h3>";
            
            try {
                $estadisticas = obtenerEstadisticasDeGoogleSheets();
                
                if ($estadisticas['success']) {
                    echo "<div class='alert alert-success'>✅ <strong>Estadísticas obtenidas</strong></div>";
                    echo "<div class='row'>";
                    echo "<div class='col-md-6'>";
                    echo "<div class='code'>Total de giros: " . $estadisticas['totalGiros'] . "</div>";
                    echo "<div class='code'>Giros ganadores: " . $estadisticas['girosGanadores'] . "</div>";
                    echo "<div class='code'>Giros perdedores: " . $estadisticas['girosPerdedores'] . "</div>";
                    echo "</div>";
                    echo "<div class='col-md-6'>";
                    echo "<div class='code'>Tasa de ganancia: " . $estadisticas['tasaGanancia'] . "%</div>";
                    echo "<div class='code'>Total ganado: $" . $estadisticas['totalGanado'] . "</div>";
                    echo "<div class='code'>Total recaudado: $" . $estadisticas['totalRecaudado'] . "</div>";
                    echo "</div>";
                    echo "</div>";
                } else {
                    echo "<div class='alert alert-danger'>❌ <strong>Error obteniendo estadísticas:</strong> " . $estadisticas['error'] . "</div>";
                }
            } catch (Exception $e) {
                echo "<div class='alert alert-danger'>❌ <strong>Excepción:</strong> " . $e->getMessage() . "</div>";
            }
            echo "</div>";
        }
        
        // ==================== DIAGNÓSTICO 5: INSTRUCCIONES ====================
        echo "<div class='diagnostic-section warning'>";
        echo "<h3>📝 5. Instrucciones de Solución</h3>";
        
        if (!$configurado) {
            echo "<h4>🔧 Configuración Pendiente:</h4>";
            echo "<ol>";
            echo "<li><strong>Crear Google Apps Script:</strong>";
            echo "<ul>";
            echo "<li>Ve a <a href='https://script.google.com' target='_blank'>script.google.com</a></li>";
            echo "<li>Crea un nuevo proyecto</li>";
            echo "<li>Copia el código de <code>sorteo-giros.gs</code></li>";
            echo "<li>Pégalo en el editor</li>";
            echo "<li>Guarda y ejecuta <code>setup()</code></li>";
            echo "</ul>";
            echo "</li>";
            echo "<li><strong>Desplegar como Web App:</strong>";
            echo "<ul>";
            echo "<li>En Apps Script: Desplegar > Nueva implementación</li>";
            echo "<li>Tipo: Aplicación web</li>";
            echo "<li>Ejecutar como: Yo</li>";
            echo "<li>Acceso: Cualquier usuario</li>";
            echo "<li>Copia la URL generada</li>";
            echo "</ul>";
            echo "</li>";
            echo "<li><strong>Actualizar configuración:</strong>";
            echo "<ul>";
            echo "<li>Abre <code>config-google-sheets.php</code></li>";
            echo "<li>Reemplaza <code>TU_SCRIPT_ID_AQUI</code> con tu URL real</li>";
            echo "<li>Guarda el archivo</li>";
            echo "</ul>";
            echo "</li>";
            echo "</ol>";
        } else {
            echo "<h4>✅ Configuración Completa</h4>";
            echo "<p>Tu sistema está configurado correctamente. Si los datos no llegan, revisa:</p>";
            echo "<ul>";
            echo "<li>Los logs en Google Apps Script</li>";
            echo "<li>Los permisos de la Web App</li>";
            echo "<li>La conexión a internet</li>";
            echo "</ul>";
        }
        echo "</div>";
        ?>
        
        <div class="diagnostic-section info">
            <h3>🔗 Enlaces Útiles</h3>
            <ul>
                <li><a href="https://docs.google.com/spreadsheets/d/<?php echo GOOGLE_SHEET_ID; ?>/edit" target="_blank">Tu Hoja de Google Sheets</a></li>
                <li><a href="https://script.google.com" target="_blank">Google Apps Script</a></li>
                <li><a href="test-google-sheets.php" target="_blank">Página de Pruebas</a></li>
                <li><a href="SOLUCION_INMEDIATA.md" target="_blank">Guía de Solución Inmediata</a></li>
            </ul>
        </div>
    </div>
</body>
</html>
