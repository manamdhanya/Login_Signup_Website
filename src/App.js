import { app } from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import './App.css';
import LoginSignup from './Components/LoginSignup/Login-Signup';


function App() {

  

  return (
    <div className="App">
      <LoginSignup/>
    </div>
  );
}

export default App;
