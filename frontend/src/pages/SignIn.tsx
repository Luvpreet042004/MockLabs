import { useState } from "react"
import { auth,provider,signInWithPopup } from "../firebaseConfig";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_NAME: 'userName',
  USER_ID: 'userId',
  USER_PHOTO: 'userPhoto',
};

// Interface for backend response
interface BackendResponse {
  message: string;
  id: number;
  email: string;
  name: string;
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const backendResponse : BackendResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        { name: user.displayName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userId = '' + backendResponse.id;
      const userPhoto = user.photoURL || "";

      if(backendResponse && user.displayName){
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_NAME, user.displayName || '');
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, userId);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_PHOTO, userPhoto);
      }
  
      navigate('/dashboard',{ replace: true });
      window.history.pushState(null,'/dashboard/')
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col scroll-smooth text-black bg-[radial-gradient(circle,_#db2777_0%,_#faf5ff_25%,_white_100%)]">
      {/* Header */}
      <header className="w-full z-50 bg-gradient-to-l from-blue-600 to-purple-100 shadow">
        <div className="container mx-auto px-4 h-20 flex items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-black">MockLabs</span>
          </div>
        </div>
      </header>

      {/* Auth Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-[#1D2333] rounded-2xl p-8 w-full max-w-md relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-black" />

          {/* Content */}
          <div className="relative z-10 ">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome to MockLabs</h1>
              <p className="text-gray-400">Sign in to access your personalized JEE preparation</p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={()=>{console.log("clicked");
              handleGoogleSignIn();}}
              disabled={isLoading}
              className="w-full bg-white hover:cursor-pointer hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 disabled:opacity-70"
            >
              {!isLoading ? (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  <span className="ml-2">Connecting...</span>
                </div>
              )}
            </button>

            {/* Terms */}
            <p className="mt-6 text-center text-sm text-gray-400">
              By continuing, you agree to MockLabs&apos;s{" "}
              <div className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </div>{" "}
              and{" "}
              <div className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </div>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0D1219] py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} MockLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

