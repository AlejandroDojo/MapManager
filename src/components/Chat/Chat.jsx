import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [mensaje, setMensaje] = useState("");
    let socket = io('http://localhost:8080');

    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });

    socket.on('message', (newmessage) => {
        console.log(newmessage)
        setMessages([...messages, newmessage]);
    });


    return (
        <div>
            {
                (messages.length <= 0) 
                ? <div> 
                    <div> 
                      <input type='text' value={mensaje} onChange={(e) => {setMensaje(e.target.value)}}/>
                      <button onClick={() => {
                        let room = 'mensaje'
                        socket.emit('message', {room, message: mensaje});
                        setMessages([...messages, mensaje]);
                        setMensaje('') 
                        }}> Enviar</button>
                    </div>
                  </div> 
                : <div> 
                      <p>Hay mensajes</p>
                      {messages.map((message, index) => {
                      return <p key={index}>{message}</p>
                      })}
                      <input type='text' value={mensaje} onChange={(e) => {setMensaje(e.target.value)}}/>
                      <button onClick={() => {
                        let room = 'mensaje'
                        socket.emit('message', {room, message: mensaje});
                        setMessages([...messages, mensaje]);
                        setMensaje('')
                        }}> Enviar</button>
                    </div>
            }
        </div>
    )
}

export default Chat