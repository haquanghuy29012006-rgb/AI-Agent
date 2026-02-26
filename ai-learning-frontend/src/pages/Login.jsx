import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap, User } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Demo database (giả lập)
  const users = [
    { username: "teacher1", password: "123", role: "teacher" },
    { username: "student1", password: "123", role: "student" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    if (user) {
      // Lưu trạng thái đăng nhập
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);

      // Điều hướng theo vai trò
      if (user.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/");
      }
    } else {
      alert("Sai tài khoản, mật khẩu hoặc vai trò");
    }
  };

  return (
    <div className="flex h-screen">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 text-white flex-col justify-center items-center p-10">
        <GraduationCap size={80} />
        <h1 className="text-4xl font-bold mt-6">AI Learning System</h1>
        <p className="mt-4 text-lg text-center max-w-sm">
          Nền tảng học tập thông minh dành cho giáo viên và học sinh.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-2xl shadow-xl w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Đăng nhập hệ thống
          </h2>

          {/* ROLE SELECT */}
          <div className="flex mb-6 bg-gray-200 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 p-2 rounded-lg transition ${
                role === "student"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Học sinh
            </button>

            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`flex-1 p-2 rounded-lg transition ${
                role === "teacher"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              Giáo viên
            </button>
          </div>

          {/* USERNAME */}
          <div className="relative mb-4">
            <User
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Đăng nhập
          </button>

          <p className="text-sm text-gray-500 mt-6 text-center">
             2026 AI Learning System
          </p>
        </form>
      </div>
    </div>
  );
}