import React from "react";

export default function Home({ onNavigate }: { onNavigate: (v: "login" | "register") => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <button
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl mb-4"
        onClick={() => onNavigate("login")}
      >
        Login
      </button>
      <button
        className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-xl"
        onClick={() => onNavigate("register")}
      >
        Register
      </button>
    </div>
  );
}