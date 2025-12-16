import { useEffect, useState } from "react";

export default function TimerSince() {
  const startDate = new Date("2025-04-01T00:00:00");
  const [seconds, setSeconds] = useState(Math.floor((Date.now() - startDate.getTime()) / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startDate.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(seconds / (24 * 3600));
  const hours = Math.floor((seconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="w-full p-6 rounded-2xl border-2 border-gray-400 shadow-md bg-white text-center">
      <h2 className="text-lg font-bold mb-2 text-gray-700">
        Seit dem <span className="font-extrabold">01.04.2025</span>:
      </h2>
      <p className="text-2xl font-extrabold text-gray-800">
        {days} Tage {hours}h {minutes}m {secs}s
      </p>
    </div>
  );
}
