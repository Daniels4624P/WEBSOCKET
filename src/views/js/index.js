// const socket = io()

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

/* socket.on('welcome', (data) => {
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
}, 2000) */

/* const circle = document.querySelector('#circle')

const dragCircle = (position) => {
    circle.style.top = position.top
    circle.style.left = position.left
}

const drag = (e) => {
    const position = {
        top: e.clientY + "px",
        left: e.clientX + "px"
    }

    dragCircle(position)
    socket.emit('circlePosition', position)
}

document.addEventListener('mousedown', (event) => {
    document.addEventListener('mousemove', drag)
})

document.addEventListener('mouseup', (e) => {
    document.removeEventListener('mousemove', drag)
})

socket.on('moveCircle', (position) => {
    dragCircle(position)
}) */

/* const connectRoom1 = document.querySelector('#connectRoom1')
const connectRoom2 = document.querySelector('#connectRoom2')
const connectRoom3 = document.querySelector('#connectRoom3')

connectRoom1.addEventListener('click', () => {
    socket.emit('connect to room', 'room1')
})

connectRoom2.addEventListener('click', () => {
    socket.emit('connect to room', 'room2')
})

connectRoom3.addEventListener('click', () => {
    socket.emit('connect to room', 'room3')
})

const sendMessage = document.querySelector('#sendMessage')

sendMessage.addEventListener('click', () => {
    const message = prompt('Escribe tu mensaje')
    socket.emit('message', message)
})

socket.on('send message', (data) => {
    const { room, message } = data
    const li = document.createElement('li')
    li.textContent = message

    document.querySelector(`#${room}`).append(li)
}) */

const user = prompt('Escribe tu usuario');

const profes = ['Retax', 'juandc', 'GNDX'];

let socketNamespace, group

const chat = document.querySelector('#chat')
const namespace = document.querySelector('#namespace')

if (profes.includes(user)) {
    socketNamespace = io('/teachers')
    group = 'teachers'
} else {
    socketNamespace = io('/students')
    group = 'students'
}

socketNamespace.on('connect', () => {
    namespace.textContent = group
})

const sendMessage = document.querySelector('#sendMessage')

sendMessage.addEventListener('click', () => {
    const message = prompt('Escribe tu mensaje')
    socketNamespace.emit('sendMessage', {
        message,
        user
    })
})

socketNamespace.on('message', (data) => {
    const { user, message } = data 
    const li = document.createElement('li')
    li.textContent = `${user}: ${message}`;
    chat.append(li)
})