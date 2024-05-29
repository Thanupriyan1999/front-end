import { useState, FormEvent } from "react";
import "../style/Register.scss";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [id, setID_No] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function register(ev: FormEvent) {
    ev.preventDefault();

    console.log(name, id, password)

    const response = await fetch('http://localhost:5000/auth/user/v1/register', {
      method: 'POST',
      body: JSON.stringify({ name, id, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json(); // Parse response body as JSON

    if (response.ok) {
      alert("Success :"+ data); // Display success or error message from backend
      setID_No("");
      setName("");
      setPassword("");

      navigate("/");

    } else {
      alert("Failed :"+ data); // Display error message from backend
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
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
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
