<?php
/**
 * PRUEBA SIMPLE - FUNCIONA EN CUALQUIER SERVIDOR
 * 
 * Este archivo hace una prueba básica sin dependencias complejas
 */

// Configuración
$GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymkkxb5ooIn0kqfiJIOBZzJkZCOcPqUKMHRn6BQcIYSRBPJidIDkprq5waXwPZb2jnjw/exec';
$GOOGLE_SHEET_ID = '1gWzL3GrLhwdOfZer_1SRS80Cq13btFq8H2Mm__B-8MU';

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🧪 Prueba Simple - Google Sheets</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .test { margin: 20px 0; padding: 15px; border-radius: 8px; }
        .success { background-color: #d4edda; border: 1px solid #c3e6cb; }
        .error { background-color: #f8d7da; border: 1px solid #f5c6cb; }
        .info { background-color: #d1ecf1; border: 1px solid #bee5eb; }
        .code { background-color: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; }
        button { padding: 10px 20px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <h1>🧪 Prueba Simple - Google Sheets</h1>
    
    <div class="test info">
        <h3>📋 Configuración:</h3>
        <p><strong>Google Script URL:</strong> <code><?php echo $GOOGLE_SCRIPT_URL; ?></code></p>
        <p><strong>Google Sheet ID:</strong> <code><?php echo $GOOGLE_SHEET_ID; ?></code></p>
    </div>

    <div class="test">
        <h3>🌐 Prueba 1: Conexión Básica</h3>
        <button onclick="probarConexion()">Probar Conexión</button>
        <div id="conexion-result"></div>
    </div>

    <div class="test">
        <h3>🎰 Prueba 2: Enviar Giro de Prueba</h3>
        <button onclick="enviarGiro()">Enviar Giro</button>
        <div id="giro-result"></div>
    </div>

    <div class="test">
        <h3>📊 Prueba 3: Obtener Estadísticas</h3>
        <button onclick="obtenerStats()">Obtener Stats</button>
        <div id="stats-result"></div>
    </div>

    <div class="test info">
        <h3>🔗 Enlaces:</h3>
        <p><a href="https://docs.google.com/spreadsheets/d/<?php echo $GOOGLE_SHEET_ID; ?>/edit" target="_blank">Ver tu Hoja de Google Sheets</a></p>
        <p><a href="<?php echo $GOOGLE_SCRIPT_URL; ?>" target="_blank">Ver tu Google Apps Script</a></p>
    </div>

    <script>
        function log(message, type = 'info') {
            console.log('[' + new Date().toLocaleTimeString() + '] ' + message);
        }

        async function probarConexion() {
            log('Probando conexión...');
            const resultDiv = document.getElementById('conexion-result');
            resultDiv.innerHTML = '<div class="info">Probando conexión...</div>';
            
            try {
                const response = await fetch('<?php echo $GOOGLE_SCRIPT_URL; ?>?action=obtenerInfoSistema');
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = '<div class="success">✅ Conexión exitosa!<br><div class="code">' + JSON.stringify(data, null, 2) + '</div></div>';
                    log('✅ Conexión exitosa', 'success');
                } else {
                    resultDiv.innerHTML = '<div class="error">❌ Error: ' + data.error + '</div>';
                    log('❌ Error de conexión: ' + data.error, 'error');
                }
            } catch (error) {
                resultDiv.innerHTML = '<div class="error">❌ Error: ' + error.message + '</div>';
                log('❌ Error de conexión: ' + error.message, 'error');
            }
        }

        async function enviarGiro() {
            log('Enviando giro...');
            const resultDiv = document.getElementById('giro-result');
            resultDiv.innerHTML = '<div class="info">Enviando giro...</div>';
            
            const giroData = {
                action: 'guardarGiro',
                data: {
                    timestamp: new Date().toISOString(),
                    paymentNumber: 'TEST_' + Date.now(),
                    symbol1: '🍀',
                    symbol2: '🍀',
                    symbol3: '🍀',
                    ip: '127.0.0.1',
                    userAgent: navigator.userAgent
                }
            };
            
            try {
                const response = await fetch('<?php echo $GOOGLE_SCRIPT_URL; ?>', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(giroData)
                });
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = '<div class="success">✅ Giro enviado!<br><div class="code">ID: ' + data.giroId + '<br>Ganó: ' + (data.gano ? 'Sí' : 'No') + '<br>Multiplicador: ' + data.multiplicador + '<br>Monto: $' + data.montoGanado + '</div></div>';
                    log('✅ Giro enviado exitosamente', 'success');
                } else {
                    resultDiv.innerHTML = '<div class="error">❌ Error: ' + data.error + '</div>';
                    log('❌ Error enviando giro: ' + data.error, 'error');
                }
            } catch (error) {
                resultDiv.innerHTML = '<div class="error">❌ Error: ' + error.message + '</div>';
                log('❌ Error enviando giro: ' + error.message, 'error');
            }
        }

        async function obtenerStats() {
            log('Obteniendo estadísticas...');
            const resultDiv = document.getElementById('stats-result');
            resultDiv.innerHTML = '<div class="info">Obteniendo estadísticas...</div>';
            
            try {
                const response = await fetch('<?php echo $GOOGLE_SCRIPT_URL; ?>?action=obtenerEstadisticas');
                const data = await response.json();
                
                if (data.success) {
                    resultDiv.innerHTML = '<div class="success">✅ Estadísticas obtenidas!<br><div class="code">Total giros: ' + data.totalGiros + '<br>Giros ganadores: ' + data.girosGanadores + '<br>Tasa ganancia: ' + data.tasaGanancia + '%<br>Total ganado: $' + data.totalGanado + '</div></div>';
                    log('✅ Estadísticas obtenidas', 'success');
                } else {
                    resultDiv.innerHTML = '<div class="error">❌ Error: ' + data.error + '</div>';
                    log('❌ Error obteniendo estadísticas: ' + data.error, 'error');
                }
            } catch (error) {
                resultDiv.innerHTML = '<div class="error">❌ Error: ' + error.message + '</div>';
                log('❌ Error obteniendo estadísticas: ' + error.message, 'error');
            }
        }

        // Prueba automática al cargar
        window.onload = function() {
            log('Página cargada, iniciando prueba automática...');
            setTimeout(probarConexion, 1000);
        };
    </script>
</body>
</html>

