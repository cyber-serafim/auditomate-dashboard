
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/layout/MainLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Scans from "./pages/Scans";
import Services from "./pages/Services";
import Assets from "./pages/Assets";
import Alerts from "./pages/Alerts";
import Monitoring from "./pages/Monitoring";
import Security from "./pages/Security";
import Connections from "./pages/Connections";
import Notifications from "./pages/Notifications";

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
          <Route element={<MainLayout />}>
            <Route path="/" element={
              <ErrorBoundary componentName="Dashboard">
                <Index />
              </ErrorBoundary>
            } />
            <Route path="/scans" element={
              <ErrorBoundary componentName="Scans">
                <Scans />
              </ErrorBoundary>
            } />
            <Route path="/services" element={
              <ErrorBoundary componentName="Services">
                <Services />
              </ErrorBoundary>
            } />
            <Route path="/assets" element={
              <ErrorBoundary componentName="Assets">
                <Assets />
              </ErrorBoundary>
            } />
            <Route path="/alerts" element={
              <ErrorBoundary componentName="Alerts">
                <Alerts />
              </ErrorBoundary>
            } />
            <Route path="/monitoring" element={
              <ErrorBoundary componentName="Monitoring">
                <Monitoring />
              </ErrorBoundary>
            } />
            <Route path="/security" element={
              <ErrorBoundary componentName="Security">
                <Security />
              </ErrorBoundary>
            } />
            <Route path="/connections" element={
              <ErrorBoundary componentName="Connections">
                <Connections />
              </ErrorBoundary>
            } />
            <Route path="/notifications" element={
              <ErrorBoundary componentName="Notifications">
                <Notifications />
              </ErrorBoundary>
            } />
            <Route path="/settings" element={
              <ErrorBoundary componentName="Settings">
                <Settings />
              </ErrorBoundary>
            } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
