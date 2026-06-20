import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileUp, Building, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Upload', path: '/upload', icon: FileUp },
    { name: 'Add Property', path: '/add-property', icon: Building },
  ];

  const handleLogout = async () => {
    /*
    // TODO: BACKEND API INTEGRATION
    // 1. If your backend requires invalidating a session, uncomment and call the logout endpoint:
    try {
      // Make sure to import axios at the top: import axios from 'axios';
      await axios.post('YOUR_BACKEND_API_URL/logout', {}, {
        // headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
      });
    } catch (err) {
      console.error('Logout failed on the server', err);
    }
    */

    // 2. Clear local session data (Remove token as well if using JWT)
    // localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">MatchEngine</span>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 mr-2 ${location.pathname === item.path ? 'text-primary-600' : 'text-slate-400'}`} />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="h-6 w-px bg-slate-200 mx-2" aria-hidden="true"></div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} MatchEngine Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
