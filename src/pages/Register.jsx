import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Parollar mos kelmayapti");
      return;
    }

    try {
      const response = await fetch("https://backendforunsplashclone-production.up.railway.app/api/v1/auth/registration/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, email: email, password1: password, password2: password }),
      });

      const data = await response.json();
      if (data.key) {
        localStorage.setItem("isAuthenticated", data?.key);
        localStorage.setItem("username", username);
        navigate("/");
      }


    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/register-bg.jpg')" }}>
      <div className="card w-96 bg-white bg-opacity-90 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Ro‘yxatdan o‘tish</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4 mt-4" onSubmit={handleRegister}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ism"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Parolni takrorlang"
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
          <button className="btn btn-primary w-full">Ro‘yxatdan o‘tish</button>
        </form>
        <p className="text-center text-sm mt-4">
          Akkauntingiz bormi?{" "}
          <a href="/login" className="text-blue-500 hover:underline">Kirish</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
