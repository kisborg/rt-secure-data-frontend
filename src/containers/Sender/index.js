import { useEffect, useState } from 'react';
import { getRandomString } from '../../utils/helperFunctions';
import cryptoJs from 'crypto-js';

const Sender = ({ socket }) => {
  const [message, setMessage] = useState('');
  const updateText = (evt) => {
    setMessage(evt.target.value);
  }
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    setSecretKey(getRandomString(10))
  }, [])

  useEffect(() => {
    const encryptedMessage = cryptoJs.AES.encrypt(message, secretKey, { keySize: 256 })
    socket.emit('message', encryptedMessage.toString());
  }, [message, socket])
  return (
    <div>
      <textarea onChange={updateText} value={message}/>
      <input type="text" readOnly value={`http://localhost:3000/receiver/${secretKey}`} />
    </div>
  )
}

export default Sender;