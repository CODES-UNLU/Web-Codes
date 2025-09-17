<?php
/**
 * MI CONFIGURACIÓN PERSONALIZADA
 * 
 * Este archivo contiene tu configuración específica
 * para el sistema de sorteo con Google Sheets
 */

// ==================== TU CONFIGURACIÓN ====================

// ID de tu hoja de Google Sheets (ya configurado)
const MI_GOOGLE_SHEET_ID = '1gWzL3GrLhwdOfZer_1SRS80Cq13btFq8H2Mm__B-8MU';

// URL de tu Google Apps Script (debes obtenerla después de desplegar)
const MI_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec';

// ==================== INSTRUCCIONES PASO A PASO ====================

/**
 * PASO 1: CONFIGURAR GOOGLE APPS SCRIPT
 * 
 * 1. Ve a https://script.google.com
 * 2. Crea un nuevo proyecto
 * 3. Nómbralo "Sistema Sorteo Giros"
 * 4. Copia TODO el contenido del archivo sorteo-giros.gs
 * 5. Pégalo en el editor de Apps Script
 * 6. Guarda el proyecto (Ctrl+S)
 * 7. Ejecuta la función setup() para crear las tablas
 * 8. Autoriza los permisos cuando se soliciten
 */

/**
 * PASO 2: DESPLEGAR COMO WEB APP
 * 
 * 1. En Apps Script, ve a "Desplegar" > "Nueva implementación"
 * 2. Tipo: "Aplicación web"
 * 3. Ejecutar como: "Yo"
 * 4. Acceso: "Cualquier usuario"
 * 5. Haz clic en "Desplegar"
 * 6. Copia la URL que aparece (se ve así: https://script.google.com/macros/s/ABC123.../exec)
 * 7. Reemplaza TU_SCRIPT_ID_AQUI arriba con esa URL
 */

/**
 * PASO 3: PROBAR LA INTEGRACIÓN
 * 
 * 1. Abre test-google-sheets.php en tu navegador
 * 2. Ejecuta todas las pruebas
 * 3. Verifica que todo funcione correctamente
 */

// ==================== FUNCIÓN DE PRUEBA RÁPIDA ====================

function probarMiConfiguracion() {
    echo "<h2>🧪 Prueba de Mi Configuración</h2>\n";
    
    echo "<h3>📋 Configuración Actual:</h3>\n";
    echo "<p><strong>Google Sheet ID:</strong> <code>" . MI_GOOGLE_SHEET_ID . "</code></p>\n";
    echo "<p><strong>Google Script URL:</strong> <code>" . MI_GOOGLE_SCRIPT_URL . "</code></p>\n";
    
    if (MI_GOOGLE_SCRIPT_URL === 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec') {
        echo "<div style='background: #fff3cd; padding: 15px; border: 1px solid #ffeaa7; border-radius: 5px; margin: 10px 0;'>\n";
        echo "<h4>⚠️ Configuración Pendiente</h4>\n";
        echo "<p>Necesitas desplegar tu Google Apps Script como Web App y actualizar la URL arriba.</p>\n";
        echo "</div>\n";
    } else {
        echo "<div style='background: #d4edda; padding: 15px; border: 1px solid #c3e6cb; border-radius: 5px; margin: 10px 0;'>\n";
        echo "<h4>✅ Configuración Completa</h4>\n";
        echo "<p>Tu configuración está lista. Puedes probar la integración.</p>\n";
        echo "</div>\n";
    }
    
    echo "<h3>🔗 Enlaces Útiles:</h3>\n";
    echo "<ul>\n";
    echo "<li><a href='https://docs.google.com/spreadsheets/d/" . MI_GOOGLE_SHEET_ID . "/edit' target='_blank'>Tu Hoja de Google Sheets</a></li>\n";
    echo "<li><a href='https://script.google.com' target='_blank'>Google Apps Script</a></li>\n";
    echo "<li><a href='test-google-sheets.php' target='_blank'>Página de Pruebas</a></li>\n";
    echo "</ul>\n";
}

// ==================== FUNCIÓN PARA ACTUALIZAR URL ====================

function actualizarURLScript($nuevaURL) {
    $archivo = __FILE__;
    $contenido = file_get_contents($archivo);
    
    $contenidoNuevo = str_replace(
        "const MI_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec';",
        "const MI_GOOGLE_SCRIPT_URL = '" . $nuevaURL . "';",
        $contenido
    );
    
    if (file_put_contents($archivo, $contenidoNuevo)) {
        return "✅ URL actualizada correctamente";
    } else {
        return "❌ Error al actualizar la URL";
    }
}

// ==================== INFORMACIÓN DEL SISTEMA ====================

function obtenerInfoSistema() {
    return [
        'google_sheet_id' => MI_GOOGLE_SHEET_ID,
        'google_script_url' => MI_GOOGLE_SCRIPT_URL,
        'configurado' => MI_GOOGLE_SCRIPT_URL !== 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec',
        'fecha_actualizacion' => date('Y-m-d H:i:s'),
        'archivos_principales' => [
            'sorteo-giros.gs' => 'Script principal para Google Apps Script',
            'config-google-sheets.php' => 'Configuración y funciones de integración',
            'test-google-sheets.php' => 'Página de pruebas',
            'api/save-slot-result.php' => 'API modificada para enviar a Google Sheets'
        ]
    ];
}

// ==================== EJECUTAR PRUEBA SI SE ACCEDE DIRECTAMENTE ====================

if (basename($_SERVER['PHP_SELF']) === basename(__FILE__)) {
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mi Configuración - Sistema de Sorteo</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h1 class="text-center mb-4">⚙️ Mi Configuración del Sistema</h1>
            
            <?php probarMiConfiguracion(); ?>
            
            <div class="mt-4">
                <h3>📊 Información del Sistema:</h3>
                <pre class="bg-light p-3"><?php echo json_encode(obtenerInfoSistema(), JSON_PRETTY_PRINT); ?></pre>
            </div>
            
            <div class="mt-4">
                <h3>🚀 Próximos Pasos:</h3>
                <ol>
                    <li>Configurar Google Apps Script con el código de <code>sorteo-giros.gs</code></li>
                    <li>Desplegar como Web App y copiar la URL</li>
                    <li>Actualizar la URL en este archivo</li>
                    <li>Probar con <code>test-google-sheets.php</code></li>
                    <li>¡Disfrutar del sistema funcionando!</li>
                </ol>
            </div>
        </div>
    </body>
    </html>
    <?php
}
?>
