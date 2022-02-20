import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SessionButton from "../../components/SessionButton";
import { getRandomString } from "../../utils/helperFunctions";


const Home = () => {
  useEffect(() => {
    localStorage.setItem('cachedMessage', '');
    localStorage.setItem('sessionKey', '');
  }, [])
  
  const navigate = useNavigate();
  const createSession = (evt) => {
    localStorage.setItem('sessionKey', getRandomString(20));
    navigate('/sender');
  }

  return (
    <SessionButton onClick={createSession}/>
  )
}

export default Home;