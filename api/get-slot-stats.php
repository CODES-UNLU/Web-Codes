<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

$resultsFile = __DIR__ . '/../data/slot-results.json';

// Debug: Log the file path
error_log("Buscando archivo en: " . $resultsFile);
error_log("Archivo existe: " . (file_exists($resultsFile) ? 'SÍ' : 'NO'));

if (!file_exists($resultsFile)) {
    echo json_encode([
        'success' => false,
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

$results = json_decode(file_get_contents($resultsFile), true) ?? [];

// Debug: Log the results
error_log("Datos leídos: " . json_encode($results));
error_log("Cantidad de resultados: " . count($results));

if (empty($results)) {
    echo json_encode([
        'success' => true,
        'message' => 'No hay juegos registrados',
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

// Calcular estadísticas
$totalGames = count($results);
$wins = array_filter($results, function($result) {
    return $result['won'] === true;
});
$winCount = count($wins);
$lossCount = $totalGames - $winCount;
$winRate = $totalGames > 0 ? round(($winCount / $totalGames) * 100, 2) : 0;

$totalWinnings = array_sum(array_column($results, 'winAmount'));
$averageWin = $winCount > 0 ? round($totalWinnings / $winCount, 2) : 0;
$biggestWin = max(array_column($results, 'winAmount'));

// Estadísticas por símbolo
$symbolStats = [];
foreach ($results as $result) {
    $combo = $result['symbol1'] . '-' . $result['symbol2'] . '-' . $result['symbol3'];
    if (!isset($symbolStats[$combo])) {
        $symbolStats[$combo] = ['count' => 0, 'wins' => 0, 'totalWin' => 0];
    }
    $symbolStats[$combo]['count']++;
    if ($result['won']) {
        $symbolStats[$combo]['wins']++;
        $symbolStats[$combo]['totalWin'] += $result['winAmount'];
    }
}

// Ordenar por frecuencia
uasort($symbolStats, function($a, $b) {
    return $b['count'] - $a['count'];
});

// Top 10 combinaciones
$topCombinations = array_slice($symbolStats, 0, 10, true);

echo json_encode([
    'success' => true,
    'message' => 'Estadísticas calculadas correctamente',
    'stats' => [
        'totalGames' => $totalGames,
        'wins' => $winCount,
        'losses' => $lossCount,
        'winRate' => $winRate . '%',
        'totalWinnings' => round($totalWinnings, 2),
        'averageWin' => $averageWin,
        'biggestWin' => round($biggestWin, 2),
        'topCombinations' => $topCombinations
    ],
    'lastUpdate' => date('Y-m-d H:i:s', filemtime($resultsFile))
]);
?>
