import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { kakaoLogin } from '../../api/auth';
import { KakaoLoginResponseSchema } from './../../types/kakaoLogin';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL에서 파라미터를 추출
    const params = new URL(document.location.toString()).searchParams;
    // 'code' 파라미터 값을 가져옴 (카카오에서 제공하는 인증 코드)
    const code = params.get('code');

    if (code) {
      // 인증 코드가 존재하면 카카오 로그인 API 호출
      kakaoLogin(code)
        .then((response) => {
          console.log('카카오 로그인 성공', response);
          // Zod 스키마를 사용하여 응답 데이터 검증
          const validatedResponse = KakaoLoginResponseSchema.parse(response);

          // 신규 사용자인 경우 회원가입 페이지로 이동
          if (validatedResponse.is_new) {
            navigate('/signup');
          } else {
            // 기존 사용자인 경우 메인 페이지로 이동
            navigate('/');
          }
        })
        .catch((error) => {
          console.error('카카오 로그인 에러', error);
          // Zod 검증 에러 처리
          if (error.name === 'ZodError') {
            console.error('응답 데이터 형식 에러:', error.errors);
          }
          // 로그인 실패 시 로그인 페이지로 이동
          navigate('/login');
        });
    }
  }, [navigate]); // navigate 함수가 변경될 때마다 useEffect 재실행

  // 로그인 처리 중 표시
  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoCallback;
