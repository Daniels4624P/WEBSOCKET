// process.env.DEBUG = '*'
// process.env.DEBUG = 'engine, socket.io:socket, socket.io:client'

const express = require('express')
const { createServer } = require('http')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.join(__dirname, "views")))

const socketsOnline = []

app.get('/', (req, res) => {
    return res.sendFile(__dirname + "/views/index.html")
})

    // Manejo Offline
/* io.on('connection', (socket) => {
    socket.on('is connected', (message) => {
        console.log(message)
    })
}) */

    // Namespaces
/* const teachers = io.of('teachers')
const students = io.of('students')

teachers.on('connection', (socket) => {
    console.log(socket.id + ' se ha conectado a la sala de profes')
    socket.on('sendMessage', (data) => {
        teachers.emit('message', data)
    })
})

students.on('connection', (socket) => {
    console.log(socket.id + ' se ha conectado a la sala de estudiantes')
    socket.on('sendMessage', (data) => {
        students.emit('message', data)
    })
}) */

io.on('connection', (socket) => {
    
    /* console.log('Clientes conectados:', io.engine.clientsCount)
   console.log("ID del socket conectado:", socket.id)

    socket.on("disconnect", () => {
        console.log("El cliente", socket.id, "se ha desconectado")
    })

    socket.conn.once('upgrade', () => {
        console.log('Hemos pasado de HTTP-Long-Polling a:', socket.conn.transport.name)
    }) */

    // EMISION BASICA
    /* socketsOnline.push(socket.id)

    socket.emit('welcome', 'Ahora estas conectado.')

    socket.on('server', (data) => {
        console.log(data)
    })

    // EMISION A TODOS LOS USERS

    io.emit('everyone', socket.id + " Se ha conectado.")

    // EMISION A UNO SOLO

    socket.on('last', (message) => {
        const lastSocket = socketsOnline[socketsOnline.length - 1]

        io.to(lastSocket).emit('salute', message)
    })

    // on, once y off
    socket.emit('on', 'Podemos escuchar un evento varias veces')
    socket.emit('on', 'Podemos escuchar un evento varias veces')
    
    socket.emit('once', 'Podemos escuchar un evento una sola vez')
    socket.emit('once', 'Podemos escuchar un evento una sola vez')

    socket.emit('off', 'Se apaga el evento que pongamos')

    setTimeout(() => {
        socket.emit('off', 'Se apaga el evento que pongamos')
    }, 3000) */

    socket.on('circlePosition', (positions) => {
         socket.broadcast.emit('moveCircle', positions) // broadcast emite un mensaje para todos excepto para ti en comparacion con io.emit que emite para todos un mensaje
    })

    /* socket.connectedRoom = ""

    socket.on('connect to room', (room) => {

        socket.leave(socket.connectedRoom)

        switch (room) {
            case "room1":
                socket.join('room1');
                socket.connectedRoom = 'room1'
                break
            case "room2":
                socket.join('room2');
                socket.connectedRoom = 'room2'
                break
            case "room3":
                socket.join('room3');
                socket.connectedRoom = 'room3'
                break
        }
    })

    socket.on('message', (message) => {
        const room = socket.connectedRoom

        io.to(room).emit('send message', {
            message,
            room
        })
    }) */
    
        // Middlewares
/* io.use((socket, next) => {
    const token = socket.handshake.auth.token
    if (token ==  "Mr. Michi Es Genial") {
        next()
    } else {
        const err = new Error('No estas autorizado')
        err.data = {
            datails: "No pudiste ser autenticado"
        }
        next(err)
    }
})

io.on('connection', (socket) => {
    console.log(socket.id)
}) */
})

httpServer.listen(3000)