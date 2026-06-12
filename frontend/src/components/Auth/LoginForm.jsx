import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authUser, registered } = useAuth();

  useEffect(() => {
    if (authUser && registered) {
      navigate("/chat", { replace: true });
    }
    if (authUser && !registered) {
      navigate("/register", { replace: true });
    }
  }, [authUser, registered, navigate]);

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError("Google login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef5fb] text-[#102133] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-[#dbe7f5] opacity-90 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] bg-[#b9d5f3] opacity-90 rounded-full blur-[140px]" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white shadow-lg shadow-slate-200 mb-4">
            <svg className="w-8 h-8 text-[#0f3565]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold">ChatApp</h1>
          <p className="text-[#4f627d] mt-2 text-sm">Sign in with Google to continue.</p>
        </div>

        <div className="bg-white shadow-xl border border-[#d5e1f1] rounded-3xl p-8">
          {error && (
            <div className="bg-[#ffecec] border border-[#f2c6c5] text-[#982727] text-sm px-4 py-3 rounded-xl mb-5">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 bg-[#0f3565] hover:bg-[#0b2a52] text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition duration-200 disabled:opacity-60"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Signing in..." : "Sign in with Google"}
          </button>

          <p className="text-[#5f748f] text-center mt-6 text-sm">
            Google login only. No phone or OTP required.
          </p>

          <p className="text-[#5f748f] text-center mt-4 text-sm">
            Need an account?{' '}
            <span onClick={() => navigate("/register")} className="text-[#0f3565] font-semibold cursor-pointer">
              Register
            </span>
          </p>
        </div>

        <p className="text-center text-[#5f748f] text-xs mt-6">
          🔒 Secure access with Firebase Authentication.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
