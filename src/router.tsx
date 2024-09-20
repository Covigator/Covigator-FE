import { Route, Routes } from 'react-router-dom';

import Loading from './components/common/Loading';
import KakaoCallback from './components/login/KakaoCallback';
import Layout from './layouts/Layout';
import Community from './pages/Community';
import Course from './pages/Course';
import Chat from './pages/Course/Chat';
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
import Result from './pages/Result';
import SignUp from './pages/SignUp';
import Hasang from './pages/Test/Hasang';
import Seohyun from './pages/Test/Seohyun';

// 새로 추가

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/map" element={<Map lat={37.5385} lng={127.0823} />} />
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
          <Route path="chat/:courseId" element={<Chat />} />
        </Route>
        <Route path="/review" element={<Review />} />
        <Route path="/mypage">
          <Route index element={<Mypage />} />
          <Route path="info/:userId" element={<Info />} />
          <Route path="info/modify/:userId" element={<Modify />} />
          <Route path="like/:userId" element={<Like />} />
          <Route path="mycourse/:userId" element={<Mycourse />} />
          <Route path="notice" element={<Notice />} />
        </Route>
        <Route path="/test">
          <Route path="seohyun" element={<Seohyun />} />
          <Route path="hasang" element={<Hasang />} />
        </Route>

        <Route path="/accounts/oauth/kakao" element={<KakaoCallback />} />
      </Route>
    </Routes>
  );
};

export default Router;
