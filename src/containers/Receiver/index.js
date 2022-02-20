import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TextBox from '../../components/Textbox';
import { verifyAndDecryptMessage } from '../../utils/helperFunctions';

const Receiver = ({ socket }) => {
  const { secretKey } = useParams();
  const [message, setMessage] = useState('');
  useEffect(() => {
    const messageListener = ({ message, signature }) => {
      const decryptedMessage = verifyAndDecryptMessage(message, signature, secretKey)
      setMessage(decryptedMessage); 
    };

    if (socket) {
      socket.on('message', messageListener);
    }

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket, secretKey]);
  return (
    <div>
      <TextBox readOnly value={message}/>
    </div>
  )
}

export default Receiver;