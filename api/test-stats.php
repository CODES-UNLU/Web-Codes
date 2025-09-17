<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$resultsFile = __DIR__ . '/../data/slot-results.json';

echo json_encode([
    'debug' => [
        'current_dir' => __DIR__,
        'file_path' => $resultsFile,
        'file_exists' => file_exists($resultsFile),
        'file_size' => file_exists($resultsFile) ? filesize($resultsFile) : 0,
        'file_readable' => file_exists($resultsFile) ? is_readable($resultsFile) : false
    ],
    'data' => file_exists($resultsFile) ? json_decode(file_get_contents($resultsFile), true) : null
]);
?>
