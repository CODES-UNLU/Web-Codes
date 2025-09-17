<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$resultsFile = dirname(__DIR__) . '/data/slot-results.json';

if (!file_exists($resultsFile)) {
    echo json_encode(['success' => false, 'message' => 'Archivo no encontrado']);
    exit;
}

$content = file_get_contents($resultsFile);
$results = json_decode($content, true);

if (!$results || !is_array($results)) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

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
