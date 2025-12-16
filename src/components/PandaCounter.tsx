import { useEffect, useState } from "react";

export default function PandaCounter() {
  // Counter aus localStorage laden oder 0 starten
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("pandaCount");
    return saved ? parseInt(saved) : 0;
  });

  const handleClick = () => setCount((prev) => prev + 1);

  // Counter speichern
  useEffect(() => {
    localStorage.setItem("pandaCount", count.toString());
  }, [count]);

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-md flex items-center justify-center z-50 hover:bg-gray-100 transition"
      title={`Gestreichelt: ${count} mal`}
    >
      🐼 {/* oder Icon wie dein Menü-Button */}
      <span className="ml-1 text-sm font-bold">{count}</span>
    </button>
  );
}
