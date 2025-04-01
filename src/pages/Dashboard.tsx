
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VoiceTranslator from '@/components/VoiceTranslator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <VoiceTranslator />
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
