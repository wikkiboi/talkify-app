import { ChangeEvent, useState, FormEvent } from "react";
import socket from "./socket";

export default function SocketChat() {
  const [message, setMessage] = useState("");

  socket.on("connect", () => {
    console.log(`You connected with id: ${socket.id}`);
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setMessage(e.target.value);
    console.log(message);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (message === "") return;
    socket.emit("send-message", message);
  }

  return (
    <>
      <input
        name="message"
        type="text"
        onChange={handleChange}
        value={message}
      />
      <button onClick={handleSubmit}>Send</button>
      <div>test</div>
    </>
  );
}
