import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UserStore";

function Login() {
  const navigate = useNavigate();
  const { isLogin, login } = UseAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <header className="w-full max-w-md flex justify-between items-center py-6">
        <div className="flex items-center gap-2">
          <img src="offerLogo.png" alt="logo" className="w-10 h-10 md:w-12 md:h-12" />
          <h1 className="text-2xl md:text-3xl font-bold ">OfferLetter</h1>
        </div>
        <p className="text-sm text-blue-600 cursor-pointer hover:underline">Help?</p>
      </header>

      <main className="w-full max-w-md shadow-md border rounded-2xl p-8">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Welcome back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {isLogin ? "Logging in..." : "Login"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;
