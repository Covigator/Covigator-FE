import { Route, Routes } from 'react-router-dom';

import Loading from './components/common/Loading';
import Layout from './layouts/Layout';
import Community from './pages/Community';
import Course from './pages/Course';
import Register from './pages/Course/Register';
import Review from './pages/Course/Review';
import Home from './pages/Home';
import Map from './pages/Home/Map';
import Login from './pages/Login';
import FindId from './pages/Login/Find/Id';
import FindPassword from './pages/Login/Find/Password';
import Mypage from './pages/Mypage';
import Info from './pages/Mypage/Info';
import Modify from './pages/Mypage/Info/Modify';
import Like from './pages/Mypage/Like';
import Mycourse from './pages/Mypage/Mycourse';
import Notice from './pages/Mypage/Notice';
import SignUp from './pages/SignUp';
import Hasang from './pages/Test/Hasang';
import Seohyun from './pages/Test/Seohyun';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/find">
          <Route path="id" element={<FindId />} />
          <Route path="password" element={<FindPassword />} />
        </Route>

        <Route path="/loading" element={<Loading />} />
        <Route path="/community" element={<Community />} />
        <Route path="/course">
          <Route path=":courseId" element={<Course />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/review" element={<Review />} />
        <Route path="/mypage">
          <Route index element={<Mypage />} />
          <Route path="info" element={<Info />} />
          <Route path="info/modify" element={<Modify />} />
          <Route path="like" element={<Like />} />
          <Route path="mycourse" element={<Mycourse />} />
          <Route path="notice" element={<Notice />} />
        </Route>
        {/* <Route path="/order" element={<Outlet />}>
          <Route index element={<Order />} />
          <Route path="detail/:droneId" element={<OrderDetail />} />
          <Route path="estimate" element={<Estimate />} />
        </Route> */}
        <Route path="/test">
          <Route path="seohyun" element={<Seohyun />} />
          <Route path="hasang" element={<Hasang />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
