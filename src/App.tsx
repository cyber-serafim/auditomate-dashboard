import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ErrorBoundary componentName="Dashboard">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/scans" element={
            <ErrorBoundary componentName="Scans">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/services" element={
            <ErrorBoundary componentName="Services">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/assets" element={
            <ErrorBoundary componentName="Assets">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/alerts" element={
            <ErrorBoundary componentName="Alerts">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/monitoring" element={
            <ErrorBoundary componentName="Monitoring">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/security" element={
            <ErrorBoundary componentName="Security">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/connections" element={
            <ErrorBoundary componentName="Connections">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/notifications" element={
            <ErrorBoundary componentName="Notifications">
              <Index />
            </ErrorBoundary>
          } />
          <Route path="/settings" element={
            <ErrorBoundary componentName="Settings">
              <Settings />
            </ErrorBoundary>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
