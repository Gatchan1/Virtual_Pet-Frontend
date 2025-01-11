import { useState } from "react";
import { signup } from "../api/authService";

export default function SignUp({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (password != repeatPassword) throw new Error("Las contraseñas no coinciden.");
      await signup(username, email, password);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Repeat password:</label>
          <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
        </div>
        {error && <p  className="error-alert">{error}</p>}
        <div className="center">
          <button type="submit" className="btn btn-primary">Sign up + log in</button>
        </div>
      </form>
    </div>
  );
}
