import TimerSince from "../components/TimerSince";

export default function JJPage() {
  return (
    <div className="p-4 max-w-md mx-auto flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold mb-4">J+J</h1>

      {/* Einzelnes Bild */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg">
        <img
          src="/images/jj-single.png"
          alt="J+J"
          className="w-full object-cover"
        />
      </div>

      {/* Auffälliger Timer */}
      <TimerSince />
    </div>
  );
}
