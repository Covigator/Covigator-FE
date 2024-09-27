import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
}

// 인증된 사용자만 접근 가능한 라우트를 위한 컴포넌트
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 인증된 사용자는 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default PrivateRoute;
