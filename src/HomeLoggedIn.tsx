import { useEffect, useState } from "react";

interface HomeLoggedInProps {
    onNavigate: (view: "home" | "login" | "register" | "loggedIn" | "ai") => void;
}


export default function HomeLoggedIn({ onNavigate }: HomeLoggedInProps) {
    const [showGreeting, setShowGreeting] = useState(true);
    const [username, setUsername] = useState("");
    const [buttons, setButtons] = useState<number[]>([]);
    const [offset, setOffset] = useState(4);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("registeredUser");
        if (stored) {
            const user = JSON.parse(stored);
            setUsername(user.name);
        }

        const timer = setTimeout(() => {
            setShowGreeting(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Доброе утро";
        if (hour < 18) return "Добрый день";
        return "Добрый вечер";
    };

    const addButton = () => {
        if (buttons.length < 13) {
            setButtons((prev) => [...prev, Date.now()]);
            setOffset((prev) => prev + 16);
        }
    };

    if (showGreeting) {
        return (
            <div className="flex items-center justify-center h-screen bg-white text-xl font-bold">
                {getGreeting()}, {username}!
            </div>
        );
    }

    return (
        <div className="w-full h-screen">
            {/* Блок 1 — Шапка */}
            <div className="w-full h-12 bg-gray-300 fixed top-0 left-0 z-50 flex items-center justify-between px-5">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-sm">
                        {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-800">{username}</span>
                </div>

                {/* Кнопка AI */}
                <button
                    onClick={() => onNavigate("ai")}
                    className="h-8 px-4 bg-gray-500 rounded-full shadow-md text-white font-bold text-sm"
                >
                    AI
                </button>
            </div>

            {/* Заголовок */}
            <div className="pt-10 px-5 text-left">
                <h2 className="text-5xl font-black text-gray-800 absolute left-4 top-24 z-10">
                    Current Selforders
                </h2>
            </div>

            {/* Блок 2 */}
            <div className="w-full h-32 rounded-full bg-gray-300 fixed left-0 mt-28 flex items-center px-5 z-40">
                {buttons.map((id) => (
                    <div key={id} className="relative ml-4">
                        <button className="h-28 w-28 bg-gray-400 rounded-2xl shadow-lg flex items-center justify-center" />
                        <span className="absolute bottom-1 right-1 text-3x1 text-white">100%</span>
                    </div>
                ))}

                {buttons.length < 13 && (
                    <div
                        className="relative transition-all duration-300"
                        style={{ marginLeft: `${offset}` }}
                    >
                        <button
                            className="h-28 w-28 bg-gray-400 ml-4 rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold text-white"
                            onClick={addButton}
                        >
                            +
                        </button>
                        <span className="absolute bottom-1 right-1 text-xs text-white">Add</span>
                    </div>
                )}
            </div>

            {/* Блок 3 — Большая кнопка */}
            <div className="fixed left-10 top-[320px] z-30">
                <button className="w-50 h-56 bg-gray-400 rounded-2xl shadow-lg flex flex-col justify-center items-start relative p-6 text-white">
                    <div className="w-32 h-1 bg-white mb-2 rounded-full"></div>
                    <div className="w-28 h-1 bg-white mb-2 rounded-full"></div>
                    <div className="w-32 h-1 bg-white mb-2 rounded-full"></div>
                    <div className="w-24 h-1 bg-white mb-2 rounded-full"></div>
                    <div className="absolute bottom-8 right-0 rotate-45">
                        <div className="w-20 h-2 bg-white rounded-full"></div>
                    </div>
                </button>
            </div>

            {/* Блок 4 */}
            <div className="absolute top-[320px] left-[300px] right-16 h-56 bg-gray-300 rounded-3xl shadow-lg flex items-center px-5 z-20">
                <button className="w-40 h-48 bg-gray-400 rounded-2xl shadow-lg flex items-center justify-center text-6xl font-bold text-white"
                     onClick={() => setShowModal(true)}
                    >
                    +
                </button>
            </div>
        {/* 🧊 Модальное окно с размытым фоном */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[999] flex items-center justify-center">
          <div className="bg-white w-[35%] h-[75%] rounded-xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Добавление</h2>
            <p className="text-gray-700">Здесь будет форма или действия.</p>
          </div>
        </div>
      )}
    </div>
  );
}
