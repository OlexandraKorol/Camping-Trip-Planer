
import './App.css'
import { NavBar } from './components/NavBar';
import { AuthPage } from './pages/AuthPage';
import { useAuth } from './context/AuthContext';
import { AppRouter } from './routes/AppRouter';

export default function App() {
  const { isUserLoggedIn } = useAuth();

  return (
    <>
      {isUserLoggedIn ? (
        <>
          <NavBar />
          <AppRouter />
        </>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

