import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextBox from '../../components/Textbox';
import UrlField from '../../components/UrlField';
import { encryptAndSignMessage } from '../../utils/helperFunctions';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 90%;
  min-width: 400px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  & .btn:focus {
    box-shadow: none !important;
  }
`


const Sender = ({ socket }) => {
  const [message, setMessage] = useState(localStorage.getItem('cachedMessage') || '');
  const [secretKey] = useState(localStorage.getItem('sessionKey') || '');
  const navigate = useNavigate();
  const updateText = (evt) => setMessage(evt.target.value);
  const endSession = () => {
    localStorage.setItem('sessionKey', '');
    localStorage.setItem('cachedMessage', '');
    navigate('/');
  }

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
      <StyledContainer>
        <Button variant="danger" onClick={endSession}>End Session</Button>
      </StyledContainer>
      <TextBox onChange={updateText} value={message} placeholder="Type your message here..." />
      <UrlField location={secretKey} />
    </div>
  )
}

export default Sender;