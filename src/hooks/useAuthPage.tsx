import { useState, useCallback } from "react";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { doGoogleSignInWithGoogle, doSignInWithEmailAndPassword } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export const useAuthPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ hasError: false, message: "" });
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isAccountNotFoundModalOpen, setAccountNotFoundModalOpen] = useState(false);

  const { setIsUserLoggedIn } = useAuth();

  const handleOpenModal = () => setIsRegistrationModalOpen(true);
  const handleCloseModal = () => setIsRegistrationModalOpen(false);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setError({ hasError: false, message: "" });
    },
    []
  );

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError({ hasError: true, message: "Please fill in all fields." });
      return;
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      //функція завжли повертає масив, якщо масив пустий - то юзер не зареєстрований. А вона повертає завжди пустий масив, пофіксити, тут перевірка на те, чи юзев зареєстрований і показувати модалку
      if (signInMethods.length === 0) {
        setError({ hasError: true, message: "User not registered. Please sign up." });
        setAccountNotFoundModalOpen(true);
        return;
      }
      await doSignInWithEmailAndPassword(email, password);
      setIsUserLoggedIn(true);
    } catch (_error) {
      setError({ hasError: true, message: "Failed to sign in. Please check your credentials." });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await doGoogleSignInWithGoogle();
      setIsUserLoggedIn(true);
    } catch (_error) {
      setError({ hasError: true, message: "Failed to sign in with Google." });
    }
  };

  return {
    formData,
    error,
    isRegistrationModalOpen,
    isAccountNotFoundModalOpen,
    handleInputChange,
    handleLogin,
    handleGoogleSignIn,
    setAccountNotFoundModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};