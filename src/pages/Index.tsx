import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ConfigProvider } from '@/contexts/ConfigContext';
import HalloweenLanding from '@/components/HalloweenLanding';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <ConfigProvider>
      <div className="relative">
        {/* Secret Admin Access Button */}
        <button
          onClick={() => setShowAdmin(true)}
          className="fixed top-4 left-4 z-50 btn-ghost p-2 rounded-lg opacity-20 hover:opacity-100 transition-opacity duration-300"
          title="Acesso Administrativo"
        >
          <Settings size={20} />
        </button>

        {/* Main Landing Page */}
        <HalloweenLanding />

        {/* Admin Dashboard Modal */}
        {showAdmin && (
          <AdminDashboard onClose={() => setShowAdmin(false)} />
        )}
      </div>
    </ConfigProvider>
  );
};

export default Index;
