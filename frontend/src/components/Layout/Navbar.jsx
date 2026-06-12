import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">ChatApp</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:bg-blue-700 px-4 py-2 rounded">Chat</Link>
        <span className="px-4 py-2">{user?.email}</span>
      </div>
    </nav>
  );
}
