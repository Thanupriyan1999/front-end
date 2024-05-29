import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";
import "../style/Login.scss";

const LoginPage = () => {
  const [id, setID_No] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserContextProvider');
  }

  const { setUserInfo } = userContext
  const navigate = useNavigate();

  async function login(ev: FormEvent) {
    ev.preventDefault();

    const response = await fetch('http://localhost:5000/auth/user/v1/login', {
      method: 'POST',
      body: JSON.stringify({ id, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const userInfo = await response.json();

    if (response.ok) {
      alert("Success :"+ userInfo);
      
      setUserInfo(userInfo);
      setRedirect(true);

      navigate("/");
    } else {
      alert('Wrong credentials');
    }
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={ev => setID_No(ev.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
