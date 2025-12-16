import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Index from "./pages/Index";
import JJPage from "./pages/JJPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Einfaches Menü */}
        <nav className="flex gap-4 p-4 bg-gray-100">
          <Link to="/">Home</Link>
          <Link to="/jj">J+J</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jj" element={<JJPage />} />  {/* Neue Seite */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
