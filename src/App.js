import {
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Home from './containers/Home';
import Sender from './containers/Sender'
import Receiver from './containers/Receiver'
import styled from 'styled-components'

import './App.css';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  > div {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const App = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  return (
    <AppContainer className="App">
      {socket ? (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sender" element={<Sender socket={socket} />} />
        <Route exact path="/receiver/:secretKey" element={<Receiver socket={socket} />} />
      </Routes>
      ) : null}
    </AppContainer>
  );
}

export default App;
