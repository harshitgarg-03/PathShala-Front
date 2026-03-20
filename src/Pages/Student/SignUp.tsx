import { useNavigate } from "react-router-dom";
import Wrapper from "../../Componets/ReuseCompo/Wrapper";
import Fotter from "../../../public/FooterLogo.png";
import { User, Mail, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../ZustandStore/AuthStore";

function SignUp() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const Register = useAuth((s) => s.Register);
  const isLoading = useAuth((s) => s.isLoading);
  const isAuthenticate = useAuth((s) => s.isAuthenticate);
  const error = useAuth((s) => s.error);
  const handleGoogle = useAuth((s) => s.handleGoogleLogin);

  // 🔹 Handle Signup
  const handlesignup = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!name || !email || !password) return;

    const res = await Register({ name, email, password });
    if(res){
      navigate("/login")
    }
  };

  // 🔹 Redirect if already logged in
  useEffect(() => {
    if (isAuthenticate) {
      console.log("hello is ", isAuthenticate);
      navigate("/");
    }
  }, [isAuthenticate, navigate]);

  return (
    <Wrapper>
      <form
        onSubmit={handlesignup}
        className="w-full sm:w-[80%] md:w-[50%] lg:w-[30%]
        bg-white max-h-screen border border-blue-200 rounded-2xl shadow-md
        py-10 px-8 flex flex-col justify-center items-center mx-auto space-y-6"
      >
        <img src={Fotter} alt="logo" className="h-20" />

        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-600">
            Sign up to start learning from the best instructors
          </p>
        </div>

        {/* 🔹 Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div className="w-full space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

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
              minLength={6}
            />
          </div>
        </div>

        {/* 🔹 Signup Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2
          bg-green-500 hover:bg-white hover:text-green-500
          disabled:bg-green-300 disabled:cursor-not-allowed
          text-white py-2.5 rounded-lg font-medium transition-all cursor-pointer duration-300"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="animate-pulse">Signing Up...</span>
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* 🔹 Login Link */}
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-700 cursor-pointer font-semibold hover:underline"
          >
            Login
          </span>
        </p>

        {/* 🔹 Divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* 🔹 Google Signup */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="h-5 w-5 cursor-pointer"
          />
          Continue with Google
        </button>
      </form>
    </Wrapper>
  );
}

export default SignUp;