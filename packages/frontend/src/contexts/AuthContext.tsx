import {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
} from "react";
import { auth } from "../firebase/config";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  OAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useNotify } from "./NotifyContext";
import Loading from "../constants/Loading";
import { FirebaseErrors } from "../firebase/errors";

const AuthContext = createContext({} as any);
export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const [user, setUser] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { showPopup } = useNotify();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  });

  async function signUp(email: any, password: any) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
        showPopup("Account created successfully.", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            err?.message,
          "error"
        );
      });
  }

  async function signIn(email: any, password: any) {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
        showPopup("Logged in successfully.", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            err?.message,
          "error"
        );
      });
  }

  function verifyEmail(email: any) {}

  const gProvider = new GoogleAuthProvider();
  const authWithGoogle = async () => {
    await signInWithPopup(auth, gProvider)
      .then(() => {
        navigate("/");
        showPopup("Authenticated successfully with Google.", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            "Something went wrong. Please try again later.",
          "error"
        );
      });
  };

  const fProvider = new FacebookAuthProvider();
  const authWithFacebook = async () => {
    await signInWithPopup(auth, fProvider)
      .then(() => {
        navigate("/");
        showPopup("Authenticated successfully with Facebook.", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            "Something went wrong. Please try again later.",
          "error"
        );
      });
  };

  const mProvider = new OAuthProvider("microsoft.com");
  const authWithMicrosoft = async () => {
    await signInWithPopup(auth, mProvider)
      .then(() => {
        navigate("/");
        showPopup("Authenticated successfully with Microsoft.", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            "Something went wrong. Please try again later.",
          "error"
        );
      });
  };

  const gitProvider = new GithubAuthProvider();
  const authWithGithub = async () => {
    await signInWithPopup(auth, gitProvider)
      .then(() => {
        navigate("/");
        showPopup("Authenticated successfully with GitHub.", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            "Something went wrong. Please try again later.",
          "error"
        );
      });
  };

  const updateMail = async (email: any) => {
    await user
      .updateEmail(email)
      .then(() => {
        showPopup("Email successfully reset", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            err?.message,
          "error"
        );
      });
  };

  const update = async (email: string) => {
    updateEmail(user, email);
  };

  const updatePassword = async (email: any) => {
    await user
      .updatePassword(email)
      .then(() => {
        showPopup("Email successfully reset", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            err?.message,
          "error"
        );
      });
  };

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email).then(() => {
      showPopup("Password reset link sent to your email", "success");
    });
  }

  async function logout() {
    await signOut(auth)
      .then(() => {
        navigate("/account/login");
        showPopup("Logged out successfully", "success");
      })
      .catch((err: Error) => {
        showPopup(
          FirebaseErrors[err?.message as keyof typeof FirebaseErrors] ||
            err?.message,
          "error"
        );
      });
  }

  const value = {
    user,
    signUp,
    signIn,
    updateEmail,
    resetPassword,
    authWithGoogle,
    authWithFacebook,
    authWithMicrosoft,
    authWithGithub,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      <Suspense fallback={<Loading />}>
        {!loading ? props.children : <Loading />}
      </Suspense>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
