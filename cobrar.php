<?php

$servername = "localhost";
$username = "pruebaparking";
$password = "park1ng2024++";
$dbname = "parqueadero";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Verifica la solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Obtiene los datos del cuerpo de la solicitud
    $placa = $data['placa'];
    $horaSalida = $data['horaSalida'];
    $valorAPagar = $data['valorAPagar'];

    // Actualiza la hora de salida y el valor cobrado en la base de datos
    $stmt = $conn->prepare("UPDATE entries SET horaSalida = ?, totalPagar = ? WHERE placa = ?");
    $stmt->bind_param("sis", $horaSalida, $valorAPagar, $placa);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Cobro confirmado"]);
    } else {
        echo json_encode(["error" => "Error al confirmar el cobro: " . $stmt->error]);
    }

    $stmt->close();
}

// Cierra la conexión a la base de datos

?>
