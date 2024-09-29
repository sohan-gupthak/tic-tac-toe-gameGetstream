import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import {StreamChat} from 'stream-chat';
import Cookies  from 'universal-cookie';
import { useState } from "react";
import JoinGame from './components/JoinGame';
import {Chat} from 'stream-chat-react';

function App() {
  const api_key = "6g9gyvcqjynx"
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    setIsAuth(false);
    client.disconnectUser();
  }

  if(token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword"),
    }, 
    token
  ).then((user) => {
    setIsAuth(true);
  })
  }  
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}>Log Out</button>
        </Chat>
      ) : (
      <>
        <SignUp setIsAuth={setIsAuth}/>
        <Login setIsAuth={setIsAuth}/>
      </>
      )}
    </div>
  );
}

export default App;
