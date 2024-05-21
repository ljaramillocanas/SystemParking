document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const formattedTime = now.toISOString().slice(0, 16);

    // Establecer la hora actual como valor en el campo de entrada de hora de entrada
    document.getElementById('horaEntrada').value = formattedTime.replace('T', ' ');

    loadEntries();

    document.getElementById('placa').addEventListener('input', function(event) {
        const placa = event.target.value;
        const cascoLabel = document.getElementById('cascoLabel');
        const llevaCasco = document.getElementById('llevaCasco');
        const lavadoLabel = document.getElementById('lavadoLabel');
        const lavado = document.getElementById('lavado');

        if (placa.length === 6) {
            const lastChar = placa.charAt(placa.length - 1);
            if (isNaN(lastChar)) {
                // Es moto
                cascoLabel.style.display = 'inline';
                llevaCasco.style.display = 'inline';
                lavadoLabel.style.display = 'none';
                lavado.style.display = 'none';
            } else {
                // Es carro
                cascoLabel.style.display = 'none';
                llevaCasco.style.display = 'none';
                lavadoLabel.style.display = 'inline';
                lavado.style.display = 'inline';
            }
        } else {
            cascoLabel.style.display = 'none';
            llevaCasco.style.display = 'none';
            lavadoLabel.style.display = 'none';
            lavado.style.display = 'none';
        }
    });

    document.getElementById('addEntryForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const placa = document.getElementById('placa').value;
        const horaEntrada = document.getElementById('horaEntrada').value;
        const isMoto = isNaN(placa.charAt(placa.length - 1));
        // Logs para verificar los valores de los campos de casco y lavado
        console.log('llevaCasco:', llevaCasco);
        console.log('lavado:', lavado);
        const data = {
            placa: placa,
            horaEntrada: horaEntrada,
            llevaCasco: isMoto ? document.getElementById('llevaCasco').value : 'no',
            lavado: isMoto ? 'no' : document.getElementById('lavado').value
            
            };
            console.log(data)
        fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                alert(data.message);
                loadEntries();
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
    });

});

//logs de text
document.getElementById('llevaCasco').addEventListener('input', function(event) {
    const valorCasco = event.target.value;
    console.log('Valor del campo de casco:', valorCasco);
});

document.getElementById('lavado').addEventListener('input', function(event) {
    const valorLavado = event.target.value;
    console.log('Valor del campo de lavado:', valorLavado);
});

function calcularValorAPagar(horaEntrada, horaSalida, placa, llevaCasco, lavado) {
    const horaEntradaDate = new Date(horaEntrada);
    const horaSalidaDate = new Date(horaSalida);
    const diferenciaTiempoMs = horaSalidaDate - horaEntradaDate;
    let diferenciaHoras = diferenciaTiempoMs / (1000 * 60 * 60);
    
    // Si la diferencia de tiempo es menor que una hora, se redondea hacia arriba para cobrar la hora completa
    if (diferenciaHoras < 1) {
        diferenciaHoras = 1;
    } else {
        diferenciaHoras = Math.ceil(diferenciaHoras); // Redondear hacia arriba para cobrar horas completas
    }

    let tarifaPorHora;
    const ultimoCaracter = placa[placa.length - 1];
    if (isNaN(ultimoCaracter)) {
        tarifaPorHora = 2500;
    } else {
        tarifaPorHora = 7000;
    }

    if (llevaCasco === 'si' && isNaN(ultimoCaracter)) { // Solo se cobra el casco para motos
        tarifaPorHora += 2000;
    }

    if (lavado === 'si' && !isNaN(ultimoCaracter)) { // Solo se cobra el lavado para carros
        tarifaPorHora += 35000;
    }

    const valorAPagar = diferenciaHoras * tarifaPorHora;
    return valorAPagar;
}

function loadEntries() {
    fetch('api.php')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('entriesTable');
        tableBody.innerHTML = '';
        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.placa}</td>
                <td>${entry.horaEntrada}</td>
                <td>${entry.llevaCasco === 'si' ? 'Sí' : 'No'}</td>
                <td>${entry.lavado ==='si' ? 'Sí' : 'No'}</td>
                <td>
                <button onclick="cobrar('${entry.placa}', '${entry.horaEntrada}', '${entry.horaSalida}', '${entry.llevaCasco}', '${entry.lavado}')">Cobrar</button>
                <button onclick="deleteEntry('${entry.placa}')">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}

function cobrar(placa, horaEntrada, horaSalida, llevaCasco, lavado) {
    const horaSalidaActual = new Date().toLocaleString('sv-SE').replace('T', ' '); // Formato YYYY-MM-DD HH:MM
    document.getElementById('placaModal').innerText = placa;
    document.getElementById('horaEntradaModal').innerText = horaEntrada;
    document.getElementById('horaSalidaModal').innerText = horaSalidaActual;
    document.getElementById('llevaCascoModal').innerText = llevaCasco ==='si' ? 'Sí' : 'No';
    document.getElementById('lavadoModal').innerText = lavado === 'si' ? 'Sí' : 'No';
    const valorAPagar = calcularValorAPagar(horaEntrada, horaSalidaActual, placa, llevaCasco, lavado);
    document.getElementById('valorAPagarModal').innerText = `Valor a pagar: ${valorAPagar} COP`;

    const modal = document.getElementById('cobrarModal');
    modal.style.display = 'block';
}

function confirmCobro() {
    const placa = document.getElementById('placaModal').innerText;
    const horaSalida = document.getElementById('horaSalidaModal').innerText;
    const horaEntrada = document.getElementById('horaEntradaModal').innerText;
    document.getElementById('llevaCascoModal').innerText = llevaCasco ==='si' ? 'Sí' : 'No';
    document.getElementById('lavadoModal').innerText = lavado === 'si' ? 'Sí' : 'No';
    const valorAPagar = calcularValorAPagar(horaEntrada, horaSalida, placa, llevaCasco, lavado);

    // Envía los datos al script PHP para registrar el cobro
    const data = {
        placa: placa,
        horaSalida: horaSalida,
        valorAPagar: valorAPagar
        
        };
    console.log(data)
    fetch('cobrar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            placa: placa,
            horaSalida: horaSalida,
            valorAPagar: valorAPagar
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            closeModal();
            loadEntries(); // Actualiza la tabla de registros en el sistema
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}


function closeModal() {
    const modal = document.getElementById('cobrarModal');
    modal.style.display = 'none';
}

function deleteEntry(placa) {
    fetch(`api.php?placa=${placa}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            loadEntries();
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}


