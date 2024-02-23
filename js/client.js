const socket = io('https://groupchat-app.onrender.com')

const messageContainer = document.getElementById('chatContainer')
const messageInput = document.getElementById('inputMsg')
const form = document.getElementById('sendContainer')
const addToChatBtn = document.getElementById('addToChat')
const sendBtn = document.querySelector('.btnSend');
const smsTone = new Audio('pop_up_sms_tone.mp3')

const append = (msg,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = msg;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position==='left')
    smsTone.play()
} 

addToChatBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let userName = prompt("Enter your name to join");
    socket.emit('new-user-joined', userName)
    messageInput.disabled = false
    sendBtn.disabled = false
    addToChatBtn.style.display = 'none'
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const msg = messageInput.value
    append(`You: ${msg}`,'right')
    socket.emit('sendMessage',msg)
    messageInput.value = '';
})


socket.on('user-joined',person=>{
    append(`${person} joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left-chat',data=>{
    append(`${data.name} left the chat`,'left')
})
