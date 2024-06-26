import { /*Outlet,*/ Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout';
import Home from './pages/Home';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/order" element={<Outlet />}>
          <Route index element={<Order />} />
          <Route path="detail/:droneId" element={<OrderDetail />} />
          <Route path="estimate" element={<Estimate />} />
        </Route> */}
      </Route>
    </Routes>
  );
};

export default Router;
