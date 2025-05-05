import { useEffect, useState } from "react";

export default function AI() {
    const fullText = "What Can I do for you?";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 80);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="fixed left-1 top-1 w-full h-screen flex bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-96 h-full bg-gray-300 p-4 flex flex-col items-start shadow-md">
                <button className="w-full h-12 bg-gray-500 text-white font-bold rounded-lg mt-64">Option 1</button>
                <button className="w-full h-12 bg-gray-500 text-white font-bold rounded-lg mt-8">Option 2</button>
                <button className="w-full h-12 bg-gray-500 text-white font-bold rounded-lg mt-8">Option 3</button>
            </div>

            {/* Правая часть */}
            <div className="flex-1 h-full bg-white relative">
                <div className="fixed top-[35%] left-[65%] transform -translate-x-1/2 w-[40vw] text-7xl font-bold text-gray-800 text-center">
                    {displayedText}
                    {<span className="animate-pulse ml-1">|</span>}
                </div>
            </div>
        </div>
    );
}
