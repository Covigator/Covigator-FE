import { Route, Routes } from 'react-router-dom';

import Loading from './components/common/Loading';
import Layout from './layouts/Layout';
import Community from './pages/Community';
import FindId from './pages/Find/Id';
import FindPassword from './pages/Find/Password';
import Home from './pages/Home';
import Map from './pages/Home/Map';
import Login from './pages/Login';
import Register from './pages/Register';
import Seohyun from './pages/Test/Seohyun';
import User from './pages/User';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/find">
          <Route path="id" element={<FindId />} />
          <Route path="password" element={<FindPassword />} />
        </Route>

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
