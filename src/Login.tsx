import React, { useState } from "react";

export default function Login({ onBack, onLoginSuccess }: { onBack: () => void; onLoginSuccess: () => void }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    const stored = localStorage.getItem("registeredUser");
    if (!stored) {
      setError("No registered user found.");
      return;
    }
    const user = JSON.parse(stored);
    if (formData.email === user.email && formData.password === user.password) {
      setError("");
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess();
      }, 3000);
    } else {
      setError("Invalid email or password");
      setSuccess(false);
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-6 text-left">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button onClick={handleLogin} className="w-full py-2 px-4 rounded-xl bg-blue-600 text-white">Login</button>
        <button className="mt-4 text-sm text-blue-600 w-full" onClick={onBack}>Back</button>
      </div>
      {success && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 font-bold px-4 py-2 rounded-xl shadow-md transition-opacity duration-500">
          Login successful!
        </div>
      )}
    </div>
  );
}