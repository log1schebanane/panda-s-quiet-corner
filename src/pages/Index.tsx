import PixelScene from '@/components/PixelScene';

export default function Index() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center p-4 pb-[env(safe-area-inset-bottom)] bg-background">
      <PixelScene />     {/* Deine Pixel-Szene bleibt darunter */}
    </main>
  );
}
