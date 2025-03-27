
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Scans from "./pages/Scans";
import Services from "./pages/Services";
import Assets from "./pages/Assets";
import Alerts from "./pages/Alerts";
import Monitoring from "./pages/Monitoring";
import Security from "./pages/Security";
import Connections from "./pages/Connections";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

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
        <AuthProvider>
          <Routes>
            {/* Публічні маршрути */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Захищені маршрути */}
            <Route element={<PrivateRoute pageName="dashboard" />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={
                  <ErrorBoundary componentName="Dashboard">
                    <Index />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="scans" />}>
              <Route element={<MainLayout />}>
                <Route path="/scans" element={
                  <ErrorBoundary componentName="Scans">
                    <Scans />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="services" />}>
              <Route element={<MainLayout />}>
                <Route path="/services" element={
                  <ErrorBoundary componentName="Services">
                    <Services />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="assets" />}>
              <Route element={<MainLayout />}>
                <Route path="/assets" element={
                  <ErrorBoundary componentName="Assets">
                    <Assets />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="alerts" />}>
              <Route element={<MainLayout />}>
                <Route path="/alerts" element={
                  <ErrorBoundary componentName="Alerts">
                    <Alerts />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="monitoring" />}>
              <Route element={<MainLayout />}>
                <Route path="/monitoring" element={
                  <ErrorBoundary componentName="Monitoring">
                    <Monitoring />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="security" />}>
              <Route element={<MainLayout />}>
                <Route path="/security" element={
                  <ErrorBoundary componentName="Security">
                    <Security />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="connections" />}>
              <Route element={<MainLayout />}>
                <Route path="/connections" element={
                  <ErrorBoundary componentName="Connections">
                    <Connections />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="notifications" />}>
              <Route element={<MainLayout />}>
                <Route path="/notifications" element={
                  <ErrorBoundary componentName="Notifications">
                    <Notifications />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="settings" />}>
              <Route element={<MainLayout />}>
                <Route path="/settings" element={
                  <ErrorBoundary componentName="Settings">
                    <Settings />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            <Route element={<PrivateRoute pageName="account" requiredAccess="manage" />}>
              <Route element={<MainLayout />}>
                <Route path="/settings/account" element={
                  <ErrorBoundary componentName="Account">
                    <Account />
                  </ErrorBoundary>
                } />
              </Route>
            </Route>

            {/* Перенаправлення на логін, якщо шлях не знайдений */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
