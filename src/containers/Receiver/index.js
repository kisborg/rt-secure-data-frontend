import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cryptoJs from 'crypto-js';

const Receiver = ({ socket }) => {
  const { secretKey } = useParams();
  console.log(secretKey)
  const [message, setMessage] = useState('');
  useEffect(() => {
    const messageListener = (message) => {
      const decryptedMessage = cryptoJs.AES.decrypt(message, secretKey,).toString(cryptoJs.enc.Utf8);
      setMessage(decryptedMessage);
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