import PixelScene from '@/components/PixelScene';
import PandaCounter from "../components/PandaCounter";

export default function Index() {
  return (
    <main className="h-full w-full flex flex-col items-center p-4">
      <PandaCounter />   {/* Streichel-Count oben */}
      <PixelScene />     {/* Deine Pixel-Szene bleibt darunter */}
    </main>
  );
}
