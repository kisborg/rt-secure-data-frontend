import { useEffect, useState } from 'react';
import { getRandomString } from '../../utils/helperFunctions';
import TextBox from '../../components/Textbox';
import UrlField from '../../components/UrlField';
import CryptoJS from 'crypto-js';

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
    const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey, { 
      keySize: 256,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding
    });
    const signature = CryptoJS.HmacSHA1(encryptedMessage.toString(), secretKey).toString(CryptoJS.enc.Hex);
    socket.emit('message', { message: encryptedMessage.toString(), signature });
  }, [message, socket])
  return (
    <div style={{width: '80%'}}>
      <TextBox onChange={updateText} value={message}/>
      <UrlField location={secretKey} />
    </div>
  )
}

export default Sender;