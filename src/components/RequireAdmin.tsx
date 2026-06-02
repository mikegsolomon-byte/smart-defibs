import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-soft">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-soft px-4">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-10 max-w-md text-center">
          <h1 className="font-heading font-extrabold text-2xl mb-3">Access restricted</h1>
          <p className="text-muted-foreground">
            Your account doesn't have administrator access. Contact your team lead to be granted access.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
