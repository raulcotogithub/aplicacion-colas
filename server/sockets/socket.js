const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    // Escuchar el cliente y mando callback
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketcontrol.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    //emitir evento Estado actual
    client.emit('estadoActual', {
        actual: ticketcontrol.getUltimoTicket(),
        ultimos4: ticketcontrol.getUltimos4()

    });




    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //Actualizar notificar cambios en los ultimos 4

        //emitir evento Estado actual
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketcontrol.getUltimos4()

        });

    });

});