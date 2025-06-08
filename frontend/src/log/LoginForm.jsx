import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const URL = "https://addwifi.onrender.com";
  const LOCAL = "http://localhost:5000";
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion ici
    const admin = { email, password };
    fetch(`${LOCAL}/wifi/login/signin`, {
      method: "POST",
      body: JSON.stringify(admin),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "/";
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
