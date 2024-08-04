import { Outlet, useLocation } from 'react-router-dom';

import { Navigation } from '.';

const Layout = () => {
  const location = useLocation();

  /*  TODO: 바텀내비 조건  */
  const navNotNeeded =
    location.pathname.includes('detail') ||
    location.pathname.includes('chat') ||
    location.pathname.includes('review');
  // const topbarNeeded =

  return (
    <div className="w-full h-screen">
      <div className={!navNotNeeded ? 'pb-16' : ''}>
        <Outlet />
      </div>
      {!navNotNeeded && <Navigation />}
    </div>
  );
};

export default Layout;
