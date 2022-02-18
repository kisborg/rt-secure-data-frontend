import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { hmacSignatureIsValid } from '../../utils/helperFunctions';

const Receiver = ({ socket }) => {
  const { secretKey } = useParams();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const messageListener = ({ message, signature }) => {
      if (!hmacSignatureIsValid(signature, message, secretKey)) {
        setMessage('Unauthorized');
      } else {
        console.log(message)
        const decryptedMessage = CryptoJS.AES.decrypt(message, secretKey, {
          keySize: 256,
          mode: CryptoJS.mode.CFB,
          padding: CryptoJS.pad.NoPadding
        })
        .toString(CryptoJS.enc.Utf8);
        console.log(decryptedMessage)
        setMessage(decryptedMessage);
      }
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