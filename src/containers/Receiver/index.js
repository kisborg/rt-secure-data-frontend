import { useEffect, useState } from 'react';

const Receiver = ({ socket }) => {
  console.log(socket)
  const [message, setMessage] = useState('');
  useEffect(() => {
    const messageListener = (message) => {
      setMessage(message)
    };
    if (socket) {
      socket.on('message', messageListener);
    }
    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);
  return (
    <div>
      <textarea readOnly value={message}/>
    </div>
  )
}

export default Receiver;