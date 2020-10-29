//Comando para establecer la conexion
var socket = io();

//obtenemos los parámetros del url
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {

    window.location('index.html');
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small') // tiene a todos los small por referencia

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay mas Tickets') {
            label.text(resp);
            alert(resp)

        } else {
            label.text('Ticket ' + resp.numero);
        };

    });
});