import { PropsWithChildren, useEffect, useLayoutEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Outlet, Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({}: ProtectedRouteProps) {
  const { accessToken } = useAuth();
  const { isInitialized } = useAuth();

  useEffect(() => {
    console.log(`Checked Authentication :`, accessToken);
  }, [accessToken]);

  if (!isInitialized) {
    console.log("Initialized in protected route: ", isInitialized);
    return <div>Loading...</div>;
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
}
