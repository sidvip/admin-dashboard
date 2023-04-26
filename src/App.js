import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './components/login/login';
import NotFoundPage from './components/not-found/not-found';
import Dashboard from './components/dashboard/dashboard';
import AuthCheck from './components/login/auth';
import MailManagingTemplate from './components/dashboard/mail.managing.template';
import { useEffect } from 'react';
import userData from './mock-data/users.json';
import ReadMail from './components/dashboard/read';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthCheck><LoginPage /></AuthCheck>,
  },
  {
    path: "/",
    element: <AuthCheck><Dashboard /></AuthCheck>,
    children: [
      {
        index: true,
        path: 'inbox',
        element: <MailManagingTemplate />
      },
      {
        path: 'sent-mail',
        element: <MailManagingTemplate />
      },
      {
        path: 'trash',
        element: <MailManagingTemplate />
      },
      {
        path: 'read/:mailId',
        element: <ReadMail />
      },
      {
        path: '*',
        element: <div className='bg-black text-white flex-1 h-full text-4xl italic flex justify-center items-center'>Route doesnt' exist 🫢</div>
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

function App() {
  useEffect(() => {
    if (!localStorage.getItem('userData')) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;