import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Reports from "@/pages/Reports";
import ModApply from "@/pages/ModApply";
import Rules from "@/pages/Rules";
import AuthPage from "@/pages/auth-page";

// Simplified ProtectedRoute that doesn't actually check auth
// Just for demonstration purposes
const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  return <Component />;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
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
