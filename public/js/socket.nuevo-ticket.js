//Comando para establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {

    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function(estadoActual) {
    console.log('Estado Actual: ', estadoActual);
    label.text(estadoActual.actual);
});


$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
})