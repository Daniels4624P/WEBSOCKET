const socket = io()

/* const checkSocketStatus = () => {
    console.log('Estado del socket:', socket.connected)
}

socket.on('connect', () => {
    console.log('El socket se ha conectado:', socket.id)
    checkSocketStatus()
})

socket.on('connet_error', () => {
    console.log('No pude conectarme')
})

socket.on('disconnect', () => {
    console.log('El socket se ha desconectado:', socket.id)
    checkSocketStatus()
})

socket.io.on('reconnect_attempt', () => {
    console.log('Estoy intentando reconectarme')
})

socket.io.on('reconnect', () => {
    console.log('Me he vuelto a conectar')
}) */

socket.on('welcome', (data) => {
    const text = document.querySelector('#text')
    text.textContent = data
})

const emitToServer = document.querySelector('#emit-to-server')
emitToServer.addEventListener('click', () => {
    socket.emit('server', 'Hola, Servidor')
})

socket.on('everyone', (message) => {
    console.log(message)
})

const emitToLast = document.querySelector('#emit-to-last')
emitToLast.addEventListener('click', () => {
    socket.emit('last', 'Hola')
})

socket.on('salute', (message) => {
    console.log(message)
})

// on, once y off
socket.on('on', () => {
    console.log('Podemos escuchar un evento varias veces')
})

socket.once('once', () => {
    console.log('Podemos escuchar un evento una sola vez')
})

const listener = () => {
    console.log('Se apaga el evento que pongamos')
}

socket.on('off', listener)

setTimeout(() => {
    socket.off('off', listener)
}, 2000)