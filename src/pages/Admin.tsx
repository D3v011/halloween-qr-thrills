import React from 'react';
import { ConfigProvider } from '@/contexts/ConfigContext';
import AdminDashboard from '@/components/AdminDashboard';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider>
      <AdminDashboard onClose={() => navigate('/')} />
    </ConfigProvider>
  );
};

export default Admin;