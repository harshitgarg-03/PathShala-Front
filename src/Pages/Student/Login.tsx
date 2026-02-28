import { useNavigate, useSearchParams } from "react-router-dom";
import Wrapper from "../../Componets/ReuseCompo/Wrapper";
import Fotter from "../../Data/FooterLogo.png";
import { Mail, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../ZustandStore/AuthStore";

function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const isLoading = useAuth((s) => s.isLoading);
  const login = useAuth((s) => s.Login);
  const isAuthenticate = useAuth((s) => s.isAuthenticate);
  const user = useAuth((s) => s.user);
  const error = useAuth((s) => s.error);
  const handleGoogle = useAuth((s) => s.handleGoogleLogin);

  // 🔹 Handle normal login
  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!email || !password) return;

    await login({ email, password });
  };

  // 🔹 Redirect after login success
  useEffect(() => {
    if (isAuthenticate && user) {
      if (user.role === "instructor") {
        navigate("/educator/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticate, user, navigate]);

  // 🔹 Handle Google token from callback
  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [params, navigate]);

  return (
    <Wrapper>
      <form
        onSubmit={handleLogin}
        className="w-full sm:w-[80%] md:w-[50%] lg:w-[30%]
        bg-white max-h-screen border border-blue-200 rounded-2xl shadow-md
        py-10 px-8 flex flex-col justify-center items-center mx-auto space-y-6"
      >
        <img src={Fotter} alt="logo" className="h-20" />

        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600">
            Login to continue your learning journey
          </p>
        </div>

        {/* 🔹 Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div className="w-full space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* 🔹 Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2
          bg-blue-700 hover:bg-white hover:text-blue-700
          disabled:bg-blue-400 disabled:cursor-not-allowed
          text-white py-2.5 rounded-lg font-medium transition-all duration-300"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="animate-pulse">Logging In...</span>
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* 🔹 Signup Link */}
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-400 cursor-pointer font-semibold hover:underline"
          >
            Signup
          </span>
        </p>

        {/* 🔹 Divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* 🔹 Google Login */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="h-5 w-5"
          />
          Continue with Google
        </button>
      </form>
    </Wrapper>
  );
}

export default Login;