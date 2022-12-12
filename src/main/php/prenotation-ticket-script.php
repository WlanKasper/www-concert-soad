<?php
require('../../common/php/connection-db.php');

$connMySQL = new ConnectionMySQL();
$pdo = $connMySQL->getConnection();
$response = null;

$json = file_get_contents('php://input');
$data = json_decode($json);

$concertId = $data->concertId;
$prenotationName = $data->prenotationName;
$prenotationLastname = $data->prenotationLastname;
$prenotationEmail = $data->prenotationEmail;

try {
    $stmt = $pdo->prepare("UPDATE concerto SET concerto_ticket_num_current = ( concerto_ticket_num_current + 1 ) WHERE concerto_id = :concertId;");
    $stmt->execute(['concertId' => $concertId]);

    $stmt = $pdo->prepare("SELECT * FROM concerto WHERE concerto_id = :concertId;");
    $stmt->execute(['concertId' => $concertId]);
    $responseConcert = $stmt->fetchAll();

    try {
        $stmt = $pdo->prepare("INSERT INTO `prenotazione`(`key_concerto_id`, `prenotazione_person_name`, `prenotazione_person_lastname`, `prenotazione_person_email`) VALUES (:concertId, :prenotationName, :prenotationLastname, :prenotationEmail);");
        $stmt->execute(['concertId' => $concertId, 'prenotationName' => $prenotationName, 'prenotationLastname' => $prenotationLastname, 'prenotationEmail' => $prenotationEmail]);
        $responsePrenotation = $pdo->lastInsertId();

        $response = array(
            'responseConcert' => json_encode($responseConcert),
            'responsePrenotation' => json_encode($responsePrenotation),
            'status' => 201,
        );
    } catch (PDOException $e) {
        $response = array(
            'data' => $e,
            'status' => 418,
        );
    }
} catch (PDOException $e) {
    $response = array(
        'data' => $e,
        'status' => 417,
    );
}

echo json_encode($response);
?>