import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000/");
const App = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.emit("joined", { name: "akshay" });
    socket.on("new_user", (data) => {
      setName(data.name);
    });
    socket.on("recieved_message", (data) => {
      setMessage([...message, data.text]);
      
    });
  }, []);
  const sendMessage = () => {
    socket.emit("message", { text ,room});
    setText("");
  };
  const joinRoom=()=>{
    socket.emit('join',room)
  }
 
  return (
    <div>
      <div>
        <input value={room} onChange={(e)=>setRoom(e.target.value)}  type="number" placeholder="room number" />

        <button onClick={joinRoom}>Join room</button>
      </div>
      <br />
      <input
        value={text}
        onChange={({ target }) => setText(target.value)}
        type="text"
        placeholder="send message"
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {message.length > 0 && message.map((i) => <p>{i}</p>)}
      <p>{name && name}</p>
    </div>
  );
};

export default App;
