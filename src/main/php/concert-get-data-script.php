<?php
require('../../common/php/connection-db.php');

$connMySQL = new ConnectionMySQL();
$pdo = $connMySQL->getConnection();
$response = null;

try {
    $stmt = $pdo->prepare("SELECT * FROM concerto");
    $stmt->execute([]);
    $responseConcerts = $stmt->fetchAll();

    if ($responseConcerts) {
        $response = array(
            'data' => json_encode($responseConcerts),
            'status' => 201,
        );
    } else {
        $response = array(
            'data' => null,
            'status' => 417,
        );
    }
    
} catch (PDOException $e) {
    $response = array(
        'data' => $e,
        'status' => 418,
    );
}

echo json_encode($response);
?>