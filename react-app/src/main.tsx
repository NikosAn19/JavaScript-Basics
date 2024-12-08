import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Register from "./components/User/Register.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import ModalContextProvider from "./components/Context/ModalProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Register />,
    errorElement: <div>404 NOT FOUND </div>,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: (
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        ),
      },
    ],
    errorElement: <div>404 NOT FOUND </div>,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>

  // {/* </StrictMode> */}
);
