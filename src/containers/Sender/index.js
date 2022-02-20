import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextBox from '../../components/Textbox';
import UrlField from '../../components/UrlField';
import { encryptAndSignMessage } from '../../utils/helperFunctions';

const Sender = ({ socket }) => {
  const [message, setMessage] = useState(localStorage.getItem('cachedMessage') || '');
  const [secretKey] = useState(localStorage.getItem('sessionKey') || '');
  const navigate = useNavigate();
  const updateText = (evt) => setMessage(evt.target.value);

  useEffect(() => {
    if (!secretKey) {
      navigate('/');
    }
  }, [navigate, secretKey]);

  useEffect(() => {
    const payload = encryptAndSignMessage(message, secretKey);
    socket.emit('message', payload);
    localStorage.setItem('cachedMessage', message)
  }, [message, socket, secretKey]);

  return (
    <div style={{width: '80%'}}>
      <TextBox onChange={updateText} value={message} placeholder="Type your message here..." />
      <UrlField location={secretKey} />
    </div>
  )
}

export default Sender;