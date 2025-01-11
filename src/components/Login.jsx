import { useState } from "react";
import { login } from "../api/authService";

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      await login(username, password);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error-alert">{error}</p>}
        <div className="center">
          <button type="submit" className="btn btn-primary">Log in</button>
        </div>
      </form>
    </div>
  );
}
