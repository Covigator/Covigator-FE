import { Outlet, useLocation } from 'react-router-dom';

import { Navigation } from '.';

const Layout = () => {
  const location = useLocation();

  /*  TODO: 바텀내비 및 헤더 조건  */
  // const navNotNeeded = location.pathname === ''
  // const topbarNeeded =

  return (
    <div className="w-full h-screen">
      <Outlet />
      <Navigation />
    </div>
  );
};

export default Layout;
