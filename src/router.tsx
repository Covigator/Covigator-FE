import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
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
import Onboarding from './pages/Onboarding';
import Result from './pages/Result';
import ResultPlace from './pages/ResultPlace';
import SignUp from './pages/SignUp';
import Hasang from './pages/Test/Hasang';
import Seohyun from './pages/Test/Seohyun';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />
        <Route
          path="/result/:placeId"
          element={
            <PrivateRoute>
              <ResultPlace />
            </PrivateRoute>
          }
        />
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <Map lat={37.5385} lng={127.0823} />
            </PrivateRoute>
          }
        />
        <Route path="/login">
          <Route index element={<Login />} />
          <Route path="oauth2/callback/kakao" element={<KakaoCallback />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/onboarding"
          element={
            <PrivateRoute>
              <Onboarding />
            </PrivateRoute>
          }
        />

        <Route path="/find">
          <Route path="id" element={<FindId />} />
          <Route path="password" element={<FindPassword />} />
        </Route>

        <Route
          path="/loading"
          element={
            <PrivateRoute>
              <Loading />
            </PrivateRoute>
          }
        />
        <Route
          path="/community"
          element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          }
        />
        <Route path="/course">
          <Route
            path=":courseId"
            element={
              <PrivateRoute>
                <Course />
              </PrivateRoute>
            }
          />
          <Route
            path="register"
            element={
              <PrivateRoute>
                <Register />
              </PrivateRoute>
            }
          />
          <Route
            path="chat/:courseId"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/review"
          element={
            <PrivateRoute>
              <Review />
            </PrivateRoute>
          }
        />
        <Route path="/mypage">
          <Route
            index
            element={
              <PrivateRoute>
                <Mypage />
              </PrivateRoute>
            }
          />
          <Route
            path="info"
            element={
              <PrivateRoute>
                <Info />
              </PrivateRoute>
            }
          />
          <Route
            path="info/modify"
            element={
              <PrivateRoute>
                <Modify />
              </PrivateRoute>
            }
          />
          <Route
            path="like"
            element={
              <PrivateRoute>
                <Like />
              </PrivateRoute>
            }
          />
          <Route
            path="mycourse"
            element={
              <PrivateRoute>
                <Mycourse />
              </PrivateRoute>
            }
          />
          <Route
            path="notice"
            element={
              <PrivateRoute>
                <Notice />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/test">
          <Route
            path="seohyun"
            element={
              <PrivateRoute>
                <Seohyun />
              </PrivateRoute>
            }
          />
          <Route
            path="hasang"
            element={
              <PrivateRoute>
                <Hasang />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/accounts/oauth/kakao" element={<KakaoCallback />} />
      </Route>
    </Routes>
  );
};

export default Router;
