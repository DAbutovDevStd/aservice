import { useState, useEffect } from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import HomeLoggedIn from "./HomeLoggedIn";
import AI from "./AI"; // Страница с ИИ

export default function App() {
    const [view, setView] = useState<"home" | "login" | "register" | "loggedIn" | "ai">(() => {
        const stored = localStorage.getItem("registeredUser");
        return stored ? "loggedIn" : "home";
    });


    useEffect(() => {
        const preventZoom = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        const preventKeyZoom = (e: KeyboardEvent) => {
            if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
                e.preventDefault();
            }
        };

        window.addEventListener("wheel", preventZoom, { passive: false });
        window.addEventListener("keydown", preventKeyZoom);

        return () => {
            window.removeEventListener("wheel", preventZoom);
            window.removeEventListener("keydown", preventKeyZoom);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
            <div className="w-full max-w-sm">
                {view === "home" && <Home onNavigate={setView} />}
                {view === "login" && (
                    <Login onBack={() => setView("home")} onLoginSuccess={() => setView("loggedIn")} />
                )}
                {view === "register" && <Register onBack={() => setView("home")} />}
                {view === "loggedIn" && <HomeLoggedIn onNavigate={setView} />}
                {view === "ai" && <AI />}
            </div>
        </div>
    );
}
