
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Headphones, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const Header = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const email = user?.email || '';

  return (
    <header className="bg-voice-primary text-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Headphones className="h-6 w-6" />
          <Link to="/dashboard" className="text-xl md:text-2xl font-bold">SpeakEasy Access</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm opacity-90">{email}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
