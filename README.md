# 🚗 Parqueadero - Sistema de Cobro 🛵

Este proyecto es un sistema simple de cobro para un parqueadero, desarrollado en HTML, CSS, JavaScript y PHP. Permite calcular el valor a pagar por el tiempo de estacionamiento de vehículos, teniendo en cuenta diferentes tarifas y opciones adicionales como lavado para carros y guarda de casco para motos.

## 📁 Estructura de Archivos

El proyecto se organiza en los siguientes archivos:

- **index.html**: Página principal del sistema, que muestra una interfaz para agregar nuevas entradas al parqueadero y listar las entradas existentes.
- **script.js**: Archivo JavaScript que contiene la lógica de cliente para interactuar con el sistema, como validar formularios, mostrar/modificar datos en la interfaz y realizar solicitudes al servidor.
- **api.php**: Página PHP que proporciona una API para acceder a las funcionalidades del sistema, como agregar nuevas entradas al parqueadero, calcular el valor a pagar y eliminar entradas existentes.
- **cobrar.php**: Página PHP que procesa la solicitud de cobro, calculando el valor a pagar y almacenando la información de la transacción en una base de datos.

## 📝 Base de Datos

El aplicativo utiliza una base de datos llamada `parqueadero` con una única tabla llamada `entries`, que almacena la información de las entradas al parqueadero, incluyendo la placa del vehículo, la hora de entrada, si lleva casco y si desea lavado.

## 📋 Uso del Sistema

1. **Agregar Entrada**: En la página principal (`index.html`), puedes agregar una nueva entrada al parqueadero ingresando la información del vehículo (placa, hora de entrada, si lleva casco y si desea lavado) y haciendo clic en el botón "Agregar".

2. **Calcular Cobro**: Una vez que el vehículo salga del parqueadero, puedes calcular el valor a pagar haciendo clic en el botón "Cobrar" en la fila correspondiente a la entrada del vehículo en la tabla.

3. **Procesar Cobro**: El sistema procesará el cobro y mostrará el valor a pagar. La información de la transacción se almacenará en la base de datos para su registro.

## 🛠️ Instalación y Configuración

1. Clona este repositorio en tu máquina local.
2. Configura un servidor web local (por ejemplo, usando XAMPP, WAMP o MAMP).
3. Copia los archivos del repositorio en el directorio raíz del servidor web.
4. Importa la base de datos `parqueadero.sql` en tu servidor de base de datos MySQL.
5. Inicia el servidor web y accede al proyecto a través de tu navegador web.

##IMAGENES DE VISTA:

![image](https://github.com/ljaramillocanas/SystemParking/assets/101465088/5dbb4c35-0847-40f9-b39e-286c73923201)


![image](https://github.com/ljaramillocanas/SystemParking/assets/101465088/17ade713-f8e9-42ed-b6a6-5bb2ce0368c1)



## 💡 Contribuir

Si deseas contribuir al proyecto, puedes hacerlo abriendo un problema en GitHub o enviando una solicitud de extracción con tus mejoras propuestas.

¡Gracias por contribuir al desarrollo del sistema de cobro para parqueaderos! 🙌
