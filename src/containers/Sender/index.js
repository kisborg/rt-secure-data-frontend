import { useEffect, useState } from 'react';

const Sender = ({ socket }) => {
  const [message, setMessage] = useState('');
  const updateText = (evt) => {
    setMessage(evt.target.value);
  }

  useEffect(() => {
    socket.emit('message', message);
  }, [message, socket])
  return (
    <div>
      <textarea onChange={updateText} value={message}/>
    </div>
  )
}

export default Sender;