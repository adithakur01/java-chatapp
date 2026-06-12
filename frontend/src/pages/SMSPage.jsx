import Navbar from '../components/Layout/Navbar';

export default function SMSPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-4">
        {/* SMS form and history will go here */}
      </div>
    </div>
  );
}
