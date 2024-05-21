<?php

$servername = "localhost";
$username = "pruebaparking";
$password = "park1ng2024++";
$dbname = "parqueadero";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    
    // Asignar valores a las variables, asegurándose de que sean cadenas de texto
    $placa = $data['placa'];
    $horaEntrada = date('Y-m-d H:i:s'); // Hora entrada proporcionada
    $llevaCasco = ($data['llevaCasco'] === 'si') ? 'si' : 'no'; // Convertir a 'si' o 'no'
    $lavado = ($data['lavado'] === 'si') ? 'si' : 'no'; // Convertir a 'si' o 'no'

    $stmt = $conn->prepare("INSERT INTO entries (placa, horaEntrada, llevaCasco, lavado) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $placa, $horaEntrada, $llevaCasco, $lavado);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registro agregado exitosamente"]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }
    $stmt->close();
}



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM entries";
    $result = $conn->query($sql);
    $rows = array();
    while ($r = $result->fetch_assoc()) {
        $rows[] = $r;
    }
    echo json_encode($rows);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $placa = $_GET['placa'];

    $stmt = $conn->prepare("DELETE FROM entries WHERE placa = ?");
    $stmt->bind_param("s", $placa);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registro eliminado correctamente"]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>


