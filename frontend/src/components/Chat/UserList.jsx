import { useTheme } from "../../context/ThemeContext";

const UserList = ({ currentUser, onLogout, onProfileClick }) => {
  const { isDark, setIsDark } = useTheme();

  return (
    <div className="w-64 bg-white/3 border-r border-white/10 flex flex-col">

      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 
                          to-purple-600 flex items-center justify-center text-white font-bold">
            {currentUser?.photoURL
              ? <img src={currentUser.photoURL} className="w-10 h-10 rounded-full" alt="" />
              : currentUser?.displayName?.[0]?.toUpperCase()
            }
          </div>
          <div>
            <p className="text-white text-sm font-medium">
              {currentUser?.displayName || "User"}
            </p>
            <p className="text-green-400 text-xs">● Online</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-2 flex-1">
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Actions</p>

      </div>

      {/* Theme Toggle */}
      <div className="px-4 pb-2">
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl 
                     hover:bg-white/10 border border-white/10 
                     text-gray-400 hover:text-white text-sm transition duration-200"
        >
          {isDark ? (
            <>
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
              </svg>
              Light Mode
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
              </svg>
              Dark Mode
            </>
          )}
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl 
                     hover:bg-red-500/10 border border-transparent hover:border-red-500/20 
                     text-gray-400 hover:text-red-400 text-sm transition duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>

    </div>
  );
};

export default UserList;