import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Reports from "@/pages/Reports";
import ModApply from "@/pages/ModApply";
import Rules from "@/pages/Rules";

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { isLoggedIn, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-white font-minecraft text-xl">Loading...</p>
    </div>;
  }
  
  // If not logged in, redirect to home page
  if (!isLoggedIn) {
    window.location.href = '/';
    return null;
  }
  
  return <Component />;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events">
        <ProtectedRoute component={Events} />
      </Route>
      <Route path="/reports">
        <ProtectedRoute component={Reports} />
      </Route>
      <Route path="/mod-apply">
        <ProtectedRoute component={ModApply} />
      </Route>
      <Route path="/rules">
        <ProtectedRoute component={Rules} />
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
