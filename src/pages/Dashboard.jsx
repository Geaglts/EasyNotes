import React from 'react';
import { Layout } from 'containers/Layout/Layout';
import { UserNoteList } from 'containers/UserNoteList';
import { DashboardHeader } from 'containers/DashboardHeader';

const Dashboard = () => {
  return (
    <Layout>
      <DashboardHeader />
      <UserNoteList />
    </Layout>
  );
};

export default Dashboard;
