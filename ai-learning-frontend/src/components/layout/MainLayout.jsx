import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, BarChart2, LogOut, School } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-indigo-600'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  // Menu theo role
  const menuItems = [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/' },
    { icon: GraduationCap, label: 'Góc học tập (AI)', path: '/learn' },
    { icon: BarChart2, label: 'Kết quả', path: '/analytics' },
  ];

  // Nếu là teacher mới thêm menu này
  if (role === "teacher") {
    menuItems.push({
      icon: School,
      label: 'Khu vực Giáo viên',
      path: '/teacher'
    });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 fixed h-full z-10 left-0 top-0">
        
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            AI
          </div>
          <span className="text-xl font-bold text-gray-800">
            Learning.io
          </span>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut size={20} /> Đăng xuất
          </button>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-8 w-full">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;