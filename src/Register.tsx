import React, { useState } from "react";
import { IMaskInput } from "react-imask";

const countries = [
  { code: "RU", name: "Россия", phoneMask: "+7 (000) 000-00-00" },
  { code: "UZ", name: "Узбекистан", phoneMask: "+998 (00) 000-00-00" },
];

export default function Register({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

    const handleRegister = () => {
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");
        localStorage.setItem("registeredUser", JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        }));
        setToast(true);
        setTimeout(() => {
            setToast(false);
            onBack();
        }, 3000);
    };


  const selected = countries.find((c) => c.code === formData.country);

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl p-6 text-left">
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <select name="country" value={formData.country} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        {selected && (
          <div className="mb-2 flex items-center gap-2 text-lg">
            <img src={`/flags/${selected.code.toLowerCase()}.png`} alt={selected.name} className="w-6 h-4 rounded shadow" />
            {selected.name}
          </div>
        )}
        {selected && (
          <IMaskInput
            mask={selected.phoneMask}
            name="phone"
            value={formData.phone}
            onAccept={handlePhoneChange}
            placeholder="Phone number"
            className="w-full mb-2 p-2 border rounded"
          />
        )}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button onClick={handleRegister} className="w-full py-2 px-4 rounded-xl bg-blue-600 text-white">Register</button>
        <button className="mt-4 text-sm text-blue-600 w-full" onClick={onBack}>Back</button>
      </div>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 font-bold px-4 py-2 rounded-xl shadow-md transition-opacity duration-500">
          Registration successful!
        </div>
      )}
    </div>
  );
}