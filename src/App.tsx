import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ← Navigateを追加
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLoginPage, { AdminDashboardPage } from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <BrowserRouter>
        <Routes>
          {/* /index.html 直打ち対策 */}
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          {/* /public/lp 旧パスからのリダイレクト対策 */}
          <Route path="/public/lp" element={<Navigate to="/public/lp_1" replace />} />
          {/* /public/lp_1 直アクセスでも同一ページを表示 */}
          <Route path="/public/lp_1" element={<Index />} />

          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
