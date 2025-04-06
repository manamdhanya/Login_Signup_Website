import React, { useState } from "react";
import '../LoginSignup/LoginSignup.css';

import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import email_icon from '../Assets/email.png';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../../firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);
const db = getFirestore(app);

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    console.log("Sign Up function triggered");

    if (!username || !email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUsername("");
      setEmail("");
      setPassword("");

      toast.success("🎉 Data loaded successfully!");

      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
      });

    
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error(error.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Logged in successfully!");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <>
      <div className="flex flex-col mx-auto mt-20 sm:mt-32 md:mt-40 lg:mt-52 bg-white p-6 sm:p-8 md:p-10 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg shadow-lg">

        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2.5 w-full mt-4">
          <div className="text-purple-900 text-3xl sm:text-4xl font-bold">{action}</div>
          <div className="w-14 sm:w-16 h-1.5 bg-purple-900 rounded-lg"></div>
        </div>

        {/* Inputs */}
        <div className="mt-10 flex flex-col gap-5 sm:gap-6">
          {action === "Sign Up" && (
            <div className="flex items-center mx-auto w-full sm:w-96 h-14 sm:h-16 bg-gray-200 rounded-md px-4">
              <img src={user_icon} alt="user" className="w-5 sm:w-6 h-5 sm:h-6 mr-3 sm:mr-4" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-transparent outline-none w-full text-sm sm:text-base"
                placeholder="Username"
              />
            </div>
          )}

          <div className="flex items-center mx-auto w-full sm:w-96 h-14 sm:h-16 bg-gray-200 rounded-md px-4">
            <img src={email_icon} alt="email" className="w-5 sm:w-6 h-5 sm:h-6 mr-3 sm:mr-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-sm sm:text-base"
              placeholder="Email"
            />
          </div>

          <div className="flex items-center mx-auto w-full sm:w-96 h-14 sm:h-16 bg-gray-200 rounded-md px-4">
            <img src={password_icon} alt="password" className="w-5 sm:w-6 h-5 sm:h-6 mr-3 sm:mr-4" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full text-sm sm:text-base"
              placeholder="Password"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 sm:gap-6">
          <button
            className={`w-full sm:w-auto py-3 px-6 rounded-md transition-all ${
              action === "Sign Up"
                ? "bg-purple-900 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
            onClick={() => {
              if (action === "Sign Up") {
                handleSignUp();
              } else {
                setAction("Sign Up");
              }
            }}
          >
            Sign Up
          </button>
          <button
            className={`w-full sm:w-auto py-3 px-6 rounded-md transition-all ${
              action === "Login"
                ? "bg-purple-900 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
            onClick={() => {
                if (action === "Login") {
                  handleLogin();
                } else {
                  setAction("Login");
                }
              }}
          >
            Login
          </button>
        </div>
      </div>
      
      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default LoginSignup;
