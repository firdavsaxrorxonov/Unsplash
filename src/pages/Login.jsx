import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backendforunsplashclone-production.up.railway.app/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.key) {
        localStorage.setItem("isAuthenticated", data.key);
        localStorage.setItem("username", username);
        navigate(from, { replace: true });
      } else {
        setError("Login yoki parol noto‘g‘ri!");
      }
    } catch (err) {
      setError("Serverda xatolik yuz berdi.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/login-bg.jpg')" }}>
      <div className="card w-96 bg-white bg-opacity-90 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Kirish</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4 mt-4" onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input input-bordered w-full"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex ml-2 items-center">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm ml-2">Parolni ko'rsatish</label>
          </div>
          <button className="btn btn-primary w-full">Kirish</button>
        </form>
        <p className="text-center text-sm mt-4">
          Akkauntingiz yo‘qmi?{" "}
          <a href="/register" className="text-blue-500 hover:underline">Ro‘yxatdan o‘tish</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
