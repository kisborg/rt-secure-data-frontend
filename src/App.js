import {
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Sender from './containers/Sender'
import Receiver from './containers/Receiver'


import './App.css';

const App = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://localhost:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  return (
    <div className="App">
      {socket ? (
      <Routes>
        <Route path="/" element={<Sender socket={socket} />} />
        <Route exact path="/receiver" element={<Receiver socket={socket} />} />
      </Routes>
      ) : null}
    </div>
  );
}

export default App;
