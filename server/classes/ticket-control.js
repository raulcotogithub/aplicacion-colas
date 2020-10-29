const fs = require('fs');


class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay mas Tickets'
        }
        //romper la relacion que tiene javascript de pasar el valor por referencia
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //shit borra el primer elemento de un arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); //agrega un elemento al principio del arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }


    reiniciarConteo() {
        this.ultimo = 0;
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
        this.tickets = [];
        this.ultimos4 = [];
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}

module.exports = {
    TicketControl
}