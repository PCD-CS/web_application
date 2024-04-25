import { useEffect } from 'react';
import './App.css'
import Routing from './routing/Routing';
import { useGlobalContext } from './context/Context';
import { useNavigate } from "react-router-dom";
import Loader from './components/UI/Loader';
import Message from './components/UI/Message';
import { getUserProfile } from './network/agent';


const App = () => {

  const { toggleSpinner, isLoading, loginUser, setUserProfile } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    toggleSpinner(true);
    if (localStorage.getItem("token")) {
      loginUser(localStorage.getItem("token"));
      getUserProfile().then((response) => {
        setUserProfile(response.data)
      });
    } else {
      navigate('/auth/login')
    }
    toggleSpinner(false);
  }, [])

  return (
    <div>
      {/* <Message /> */}
      {isLoading && <Loader />}
      <Routing />
    </div>
  )
}

export default App
