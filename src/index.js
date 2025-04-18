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
    socketsOnline.push(socket.id)

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
    }, 3000)
})

httpServer.listen(3000)