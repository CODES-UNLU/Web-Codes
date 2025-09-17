<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Usar ruta absoluta
$resultsFile = dirname(__DIR__) . '/data/slot-results.json';

// Verificar si el archivo existe
if (!file_exists($resultsFile)) {
    echo json_encode([
        'success' => false,
        'message' => 'Archivo no encontrado: ' . $resultsFile,
        'debug' => [
            'file_path' => $resultsFile,
            'current_dir' => __DIR__,
            'parent_dir' => dirname(__DIR__)
        ]
    ]);
    exit;
}

// Leer el archivo
$content = file_get_contents($resultsFile);
if ($content === false) {
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo leer el archivo'
    ]);
    exit;
}

// Decodificar JSON
$results = json_decode($content, true);
if ($results === null) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al decodificar JSON: ' . json_last_error_msg()
    ]);
    exit;
}

// Verificar si hay datos
if (empty($results) || !is_array($results)) {
    echo json_encode([
        'success' => true,
        'message' => 'No hay datos disponibles',
        'stats' => [
            'totalGames' => 0,
            'wins' => 0,
            'losses' => 0,
            'winRate' => '0%',
            'totalWinnings' => 0,
            'averageWin' => 0,
            'biggestWin' => 0
        ]
    ]);
    exit;
}

// Calcular estadísticas básicas
$totalGames = count($results);
$wins = 0;
$totalWinnings = 0;
$biggestWin = 0;

foreach ($results as $result) {
    if ($result['won'] === true) {
        $wins++;
        $totalWinnings += $result['winAmount'];
        if ($result['winAmount'] > $biggestWin) {
            $biggestWin = $result['winAmount'];
        }
    }
}

$losses = $totalGames - $wins;
$winRate = $totalGames > 0 ? round(($wins / $totalGames) * 100, 2) : 0;
$averageWin = $wins > 0 ? round($totalWinnings / $wins, 2) : 0;

echo json_encode([
    'success' => true,
    'message' => 'Estadísticas calculadas correctamente',
    'debug' => [
        'file_path' => $resultsFile,
        'total_results' => $totalGames,
        'raw_data' => $results
    ],
    'stats' => [
        'totalGames' => $totalGames,
        'wins' => $wins,
        'losses' => $losses,
        'winRate' => $winRate . '%',
        'totalWinnings' => round($totalWinnings, 2),
        'averageWin' => $averageWin,
        'biggestWin' => round($biggestWin, 2)
    ]
]);
?>
