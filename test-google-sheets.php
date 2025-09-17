<?php
/**
 * PRUEBA DE INTEGRACIÓN GOOGLE SHEETS
 * 
 * Este archivo te permite probar la integración con Google Sheets
 * antes de implementarla en tu sistema principal.
 */

// Incluir configuración
require_once 'config-google-sheets.php';

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba Google Sheets - Sistema de Sorteo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .test-section {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        .success { background-color: #d4edda; border-color: #c3e6cb; }
        .error { background-color: #f8d7da; border-color: #f5c6cb; }
        .warning { background-color: #fff3cd; border-color: #ffeaa7; }
        .info { background-color: #d1ecf1; border-color: #bee5eb; }
    </style>
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center mb-4">🧪 Prueba de Integración Google Sheets</h1>
        
        <div class="alert alert-info">
            <h4>📋 Instrucciones:</h4>
            <ol>
                <li>Configura tu Google Sheets y Apps Script</li>
                <li>Actualiza las URLs en <code>config-google-sheets.php</code></li>
                <li>Ejecuta las pruebas a continuación</li>
            </ol>
        </div>

        <?php
        // Ejecutar pruebas
        probarIntegracionCompleta();
        ?>

        <div class="test-section info">
            <h3>🔧 Configuración Actual</h3>
            <p><strong>Google Script URL:</strong> <code><?php echo GOOGLE_SCRIPT_URL; ?></code></p>
            <p><strong>Google Sheet ID:</strong> <code><?php echo GOOGLE_SHEET_ID; ?></code></p>
            <p><strong>Precio por giro:</strong> $<?php echo SORTEO_CONFIG['precio_giro']; ?></p>
        </div>

        <div class="test-section">
            <h3>📊 Pruebas Individuales</h3>
            
            <div class="row">
                <div class="col-md-6">
                    <h5>1. Probar Conexión</h5>
                    <button class="btn btn-primary" onclick="probarConexion()">Probar Conexión</button>
                    <div id="conexion-result" class="mt-2"></div>
                </div>
                
                <div class="col-md-6">
                    <h5>2. Enviar Giro de Prueba</h5>
                    <button class="btn btn-success" onclick="enviarGiroPrueba()">Enviar Giro</button>
                    <div id="giro-result" class="mt-2"></div>
                </div>
            </div>
            
            <div class="row mt-3">
                <div class="col-md-6">
                    <h5>3. Obtener Estadísticas</h5>
                    <button class="btn btn-info" onclick="obtenerEstadisticas()">Obtener Stats</button>
                    <div id="stats-result" class="mt-2"></div>
                </div>
                
                <div class="col-md-6">
                    <h5>4. Buscar Giro por Pago</h5>
                    <input type="text" id="payment-number" class="form-control" placeholder="Número de pago" value="TEST_<?php echo time(); ?>">
                    <button class="btn btn-warning mt-2" onclick="buscarGiro()">Buscar</button>
                    <div id="busqueda-result" class="mt-2"></div>
                </div>
            </div>
        </div>

        <div class="test-section">
            <h3>📝 Logs de Prueba</h3>
            <div id="logs" class="bg-dark text-light p-3" style="height: 300px; overflow-y: auto; font-family: monospace;">
                <div>Iniciando pruebas...</div>
            </div>
        </div>
    </div>

    <script>
        function log(message, type = 'info') {
            const logs = document.getElementById('logs');
            const timestamp = new Date().toLocaleTimeString();
            const color = type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#74c0fc';
            logs.innerHTML += `<div style="color: ${color}">[${timestamp}] ${message}</div>`;
            logs.scrollTop = logs.scrollHeight;
        }

        async function probarConexion() {
            log('Probando conexión con Google Sheets...');
            const resultDiv = document.getElementById('conexion-result');
            
            try {
                const response = await fetch('test-google-sheets.php?action=conexion');
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = '<div class="alert alert-success">✅ Conexión exitosa</div>';
                    log('✅ Conexión exitosa: ' + data.message, 'success');
                } else {
                    resultDiv.innerHTML = '<div class="alert alert-danger">❌ Error: ' + data.error + '</div>';
                    log('❌ Error de conexión: ' + data.error, 'error');
                }
            } catch (error) {
                resultDiv.innerHTML = '<div class="alert alert-danger">❌ Error: ' + error.message + '</div>';
                log('❌ Error de conexión: ' + error.message, 'error');
            }
        }

        async function enviarGiroPrueba() {
            log('Enviando giro de prueba...');
            const resultDiv = document.getElementById('giro-result');
            
            const giroData = {
                timestamp: new Date().toISOString(),
                paymentNumber: 'TEST_' + Date.now(),
                symbol1: '🍄',
                symbol2: '🍄',
                symbol3: '🍄',
                ip: '127.0.0.1',
                userAgent: navigator.userAgent
            };
            
            try {
                const response = await fetch('test-google-sheets.php?action=giro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(giroData)
                });
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = '<div class="alert alert-success">✅ Giro enviado exitosamente</div>';
                    log('✅ Giro enviado: ' + data.message, 'success');
                } else {
                    resultDiv.innerHTML = '<div class="alert alert-danger">❌ Error: ' + data.error + '</div>';
                    log('❌ Error enviando giro: ' + data.error, 'error');
                }
            } catch (error) {
                resultDiv.innerHTML = '<div class="alert alert-danger">❌ Error: ' + error.message + '</div>';
                log('❌ Error enviando giro: ' + error.message, 'error');
            }
        }

        async function obtenerEstadisticas() {
            log('Obteniendo estadísticas...');
            const resultDiv = document.getElementById('stats-result');
            
            try {
                const response = await fetch('test-google-sheets.php?action=estadisticas');
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = `
                        <div class="alert alert-success">
                            <strong>✅ Estadísticas obtenidas:</strong><br>
                            Total giros: ${data.totalGiros}<br>
                            Giros ganadores: ${data.girosGanadores}<br>
                            Tasa ganancia: ${data.tasaGanancia}%
                        </div>
                    `;
                    log('✅ Estadísticas obtenidas correctamente', 'success');
                } else {
                    resultDiv.innerHTML = '<div class="alert alert-danger">❌ Error: ' + data.error + '</div>';
                    log('❌ Error obteniendo estadísticas: ' + data.error, 'error');
                }
            } catch (error) {
                resultDiv.innerHTML = '<div class="alert alert-danger">❌ Error: ' + error.message + '</div>';
                log('❌ Error obteniendo estadísticas: ' + error.message, 'error');
            }
        }

        async function buscarGiro() {
            const paymentNumber = document.getElementById('payment-number').value;
            if (!paymentNumber) {
                alert('Por favor ingresa un número de pago');
                return;
            }
            
            log('Buscando giro para pago: ' + paymentNumber);
            const resultDiv = document.getElementById('busqueda-result');
            
            try {
                const response = await fetch('test-google-sheets.php?action=buscar&paymentNumber=' + encodeURIComponent(paymentNumber));
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = `
                        <div class="alert alert-success">
                            <strong>✅ Giros encontrados:</strong><br>
                            Cantidad: ${data.length}<br>
                            <small>Ver detalles en la consola</small>
                        </div>
                    `;
                    log('✅ Giros encontrados: ' + data.length, 'success');
                    console.log('Giros encontrados:', data);
                } else {
                    resultDiv.innerHTML = '<div class="alert alert-danger">❌ Error: ' + data.error + '</div>';
                    log('❌ Error buscando giros: ' + data.error, 'error');
                }
            } catch (error) {
                resultDiv.innerHTML = '<div class="alert alert-danger">❌ Error: ' + error.message + '</div>';
                log('❌ Error buscando giros: ' + error.message, 'error');
            }
        }

        // Manejar peticiones AJAX
        <?php
        if (isset($_GET['action'])) {
            $action = $_GET['action'];
            
            switch ($action) {
                case 'conexion':
                    $result = probarConexionGoogleSheets();
                    echo "document.addEventListener('DOMContentLoaded', function() {";
                    echo "const result = " . json_encode($result) . ";";
                    echo "if (result.success) { log('✅ Conexión exitosa: ' + result.message, 'success'); } else { log('❌ Error: ' + result.error, 'error'); }";
                    echo "});";
                    break;
                    
                case 'estadisticas':
                    $result = obtenerEstadisticasDeGoogleSheets();
                    echo "document.addEventListener('DOMContentLoaded', function() {";
                    echo "const result = " . json_encode($result) . ";";
                    echo "if (result.success) { log('✅ Estadísticas obtenidas', 'success'); } else { log('❌ Error: ' + result.error, 'error'); }";
                    echo "});";
                    break;
                    
                case 'buscar':
                    $paymentNumber = $_GET['paymentNumber'] ?? '';
                    $result = obtenerGirosPorPagoDeGoogleSheets($paymentNumber);
                    echo "document.addEventListener('DOMContentLoaded', function() {";
                    echo "const result = " . json_encode($result) . ";";
                    echo "if (result.success) { log('✅ Giros encontrados: ' + result.length, 'success'); } else { log('❌ Error: ' + result.error, 'error'); }";
                    echo "});";
                    break;
            }
        }
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'giro') {
            $input = json_decode(file_get_contents('php://input'), true);
            $result = enviarGiroAGoogleSheets($input);
            echo "document.addEventListener('DOMContentLoaded', function() {";
            echo "const result = " . json_encode($result) . ";";
            echo "if (result.success) { log('✅ Giro enviado: ' + result.message, 'success'); } else { log('❌ Error: ' + result.error, 'error'); }";
            echo "});";
        }
        ?>
    </script>
</body>
</html>
