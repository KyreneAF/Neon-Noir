import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import GreetingPage from '../components/GreetingPage/GreetingPage';
import SplashPage from '../components/SplashPage/SplashPage';
import CreateSongForm from '../components/CreateSongForm/CreateSongForm';
import SingleSongPage from '../components/SingleSongPage/SingleSongPage';
import UpdateSongs from '../components/ManageSongs/UpdateSongs';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "songs/new",
        element:<CreateSongForm />

      },
      {
        path: "songs/:id",
        element: <SingleSongPage />
      },
      {
        path: "songs/edit/:id",
        element: <UpdateSongs />
      }
      // {
      //   path:"songs/:id",
      //   element:<

      // },
    ],
  },
]);
