import { /*Outlet,*/ Route, Routes } from 'react-router-dom';

import Loading from './components/common/Loading';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Community from './pages/Community';
import User from './pages/User';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/community" element={<Community />} />
        <Route path="/user" element={<User />} />
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
