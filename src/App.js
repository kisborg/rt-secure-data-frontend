import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Sender from './containers/Sender'
import Receiver from './containers/Receiver'


import './App.css';

const App = () => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const newSocket = io(`http://localhost:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  const goToSender = (evt) => {
    navigate('/sender');
  }
  return (
    <div className="App">
      {socket ? (
      <Routes>
        <Route path="/" element={<Button variant="primary" onClick={goToSender} size="lg">Create Session</Button>}/>
        <Route path="/sender" element={<Sender socket={socket} />} />
        <Route exact path="/receiver/:secretKey" element={<Receiver socket={socket} />} />
      </Routes>
      ) : null}
    </div>
  );
}

export default App;
