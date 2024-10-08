import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'


const router = createBrowserRouter([
  {
  path: '/',
  element:<App/>,
  errorElement: <div>404 NOT FOUND </div>
}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
