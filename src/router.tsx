
import { Route, Routes } from 'react-router-dom';

import Loading from './components/common/Loading';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Map from './pages/Home/Map';
import Login from './pages/Login';
import Community from './pages/Community';
import User from './pages/User';
import Seohyun from './pages/Test/Seohyun';


const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/community" element={<Community />} />
        <Route path="/user" element={<User />} />
        {/* <Route path="/order" element={<Outlet />}>
          <Route index element={<Order />} />
          <Route path="detail/:droneId" element={<OrderDetail />} />
          <Route path="estimate" element={<Estimate />} />
        </Route> */}
        <Route path="/test">
          <Route path="seohyun" element={<Seohyun />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
