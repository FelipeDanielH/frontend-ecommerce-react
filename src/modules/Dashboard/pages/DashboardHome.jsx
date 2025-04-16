import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

export default function DashboardHome() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardHeader />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
