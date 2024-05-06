import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import { UserProvider } from "./context/userContext";
import Container from "./components/Container";
import AuthForm from "./components/AuthForm";
import Tasks from "./components/Tasks";
import { SnackbarProvider } from "./context/SnackBarContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Container />,
    children: [
      {
        path: '/register',
        element: <AuthForm mode='register' />,
      },
      {
        path: '/login',
        element: <AuthForm mode='login' />,
      },
      {
        path: '/tasks',
        element: <Tasks/>
      }
    ],
  },
]);

function App() {
  return (
    <SnackbarProvider>
      <UserProvider>
          <RouterProvider router={router}/>
      </UserProvider >
      </SnackbarProvider>
    
  );
}

export default App;
