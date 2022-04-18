import { useEffect } from "react";

const Login = () => {
  const handleLogin = async () => {
    await fetch("/api/login")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };
  return (
    <div>
      <a href={"/api/login"}>Login</a>
      <button onClick={handleLogin}>login</button>
    </div>
  );
};

export default Login;
