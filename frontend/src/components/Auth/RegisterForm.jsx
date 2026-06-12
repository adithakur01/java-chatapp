import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../firebase/config";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const RegisterForm = () => {
  const { authUser, registered, setRegistered } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registered) {
      navigate("/chat", { replace: true });
    }
    if (authUser?.displayName) {
      setUsername(authUser.displayName);
    }
  }, [authUser, registered, navigate]);

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError("Google signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    if (!authUser) {
      setError("Please sign in with Google before completing registration.");
      return;
    }
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await updateProfile(authUser, { displayName: username });
      const token = await authUser.getIdToken();
      await api.post("/auth/register", { username }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegistered(true);
      navigate("/chat", { replace: true });
    } catch (err) {
      setError("Registration failed. Please try again.");
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold">ChatApp</h1>
          <p className="text-[#4f627d] mt-2 text-sm">Complete registration with your Google account.</p>
        </div>

        <div className="bg-white shadow-xl border border-[#d5e1f1] rounded-3xl p-8">
          {error && (
            <div className="bg-[#ffecec] border border-[#f2c6c5] text-[#982727] text-sm px-4 py-3 rounded-xl mb-5">
              ⚠️ {error}
            </div>
          )}

          {!authUser ? (
            <>
              <p className="text-[#5f748f] text-sm mb-6">
                Sign in with Google to finish registration.
              </p>
              <button
                onClick={handleGoogleRegister}
                disabled={loading}
                className="w-full py-3 bg-[#0f3565] hover:bg-[#0b2a52] text-white font-semibold rounded-xl flex items-center justify-center gap-3 transition duration-200 disabled:opacity-60"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                {loading ? "Signing in..." : "Continue with Google"}
              </button>
            </>
          ) : (
            <>
              <p className="text-[#5f748f] text-sm mb-6">
                Signed in as <span className="font-medium">{authUser.email}</span>. Choose a display name.
              </p>
              <form onSubmit={handleCompleteRegistration} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4f627d] mb-2">Display name</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full rounded-3xl border border-[#d5e1f1] bg-[#f8fbff] px-4 py-3 text-sm text-[#102133] focus:outline-none focus:border-[#5b8df2]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0f3565] hover:bg-[#0b2a52] text-white font-semibold rounded-xl transition duration-200 disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Complete Registration"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-[#5f748f] text-xs mt-6">
          🔒 Registration uses Firebase Google auth only.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
