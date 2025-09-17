<?php
// Verificar que PHP funciona
echo "PHP funciona correctamente\n";

// Verificar la ruta del archivo
$filePath = dirname(__DIR__) . '/data/slot-results.json';
echo "Ruta del archivo: " . $filePath . "\n";
echo "Archivo existe: " . (file_exists($filePath) ? 'SÍ' : 'NO') . "\n";

if (file_exists($filePath)) {
    echo "Tamaño del archivo: " . filesize($filePath) . " bytes\n";
    echo "Contenido del archivo:\n";
    echo file_get_contents($filePath);
}
?>
