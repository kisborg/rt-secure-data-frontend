import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import TextBox from '../../components/Textbox';
import { hmacSignatureIsValid } from '../../utils/helperFunctions';

const Receiver = ({ socket }) => {
  const { secretKey } = useParams();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const messageListener = ({ message, signature }) => {
      if (!hmacSignatureIsValid(signature, message, secretKey)) {
        setMessage('Unauthorized');
      } else {
        const decryptedMessage = CryptoJS.AES.decrypt(message, secretKey, {
          keySize: 256,
          mode: CryptoJS.mode.CFB,
          padding: CryptoJS.pad.NoPadding
        })
        .toString(CryptoJS.enc.Utf8);
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
      <TextBox readOnly value={message}/>
    </div>
  )
}

export default Receiver;