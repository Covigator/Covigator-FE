import { Outlet } from 'react-router-dom';

import { Navigation } from '.';

const Layout = () => {
  return (
    <div className="w-full h-screen">
      <Outlet />
      <Navigation />
    </div>
  );
};

export default Layout;
