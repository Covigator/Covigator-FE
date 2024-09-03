import React, { useState, useEffect } from 'react';
import { HiUser } from 'react-icons/hi2';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { signupUser } from '../../api/auth';
import Button from '../../components/common/button/Button';
import Input from '../../components/common/input';
import KakaoLogin from '../../components/login/KakaoLogin';
import { Topbar } from '../../layouts';
import { useAuthStore } from '../../stores/authStore';

import { z } from 'zod';

// Zod 스키마를 사용하여 폼 유효성 검사 규칙 정의
const signupSchema = z
  .object({
    image_url: z.string().optional(),
    name: z
      .string()
      .min(1, '이름은 필수입니다')
      .max(15, '이름은 15자 이하여야 합니다'),
    nickname: z
      .string()
      .min(1, '닉네임은 필수입니다')
      .max(10, '닉네임은 10자 이하여야 합니다'),

    email: z.string().email('유효한 이메일 주소를 입력해주세요'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

// Zod 스키마로부터 타입 추론
type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState<SignupFormData>({
    image_url: '',
    name: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // 에러 상태 관리
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const navigate = useNavigate();
  // Zustand 스토어에서 인증 설정 함수 가져오기
  const setAuth = useAuthStore((state) => state.setAuth);

  // React Query를 사용한 회원가입 mutation 설정
  const signupMutation = useMutation(signupUser, {
    onSuccess: (token) => {
      setAuth(token); // 성공 시 인증 상태 설정
      navigate('/'); // 홈페이지로 이동
    },
    onError: (error) => {
      console.error('회원가입 실패', error);
      setErrors({ email: '회원가입에 실패했습니다. 다시 시도해 주세요.' });
    },
  });

  useEffect(() => {
    if (isFormSubmitted) {
      validateForm();
    }
  }, [formData, isFormSubmitted]);

  const validateForm = () => {
    try {
      signupSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<SignupFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof SignupFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SignupFormData,
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (validateForm()) {
      signupMutation.mutate(formData);
    }
  };

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mx-10 mt-[76px]"
      >
        {/* 프로필 이미지 섹션 */}
        <div className="flex justify-center mb-6">
          <div className="h-[100px] w-[100px] border border-bk-50 rounded-full flex items-center justify-center relative">
            <span className="text-bk-50">
              <HiUser className="h-20 w-20" />
            </span>
          </div>
        </div>

        {/* 프로필 사진 등록 버튼 */}
        <div className="mt-3 mb-[23px]">
          <Button
            size="xs"
            color="sub_300"
            shape="square"
            className="rounded-[5px] !px-[10px] !py-[4px]"
          >
            프로필 사진 등록하기
          </Button>
        </div>

        {/* 입력 필드 섹션 */}
        <div className="flex flex-col items-center gap-y-3 w-full">
          {/* 닉네임 입력 필드 */}
          <Input
            size="md"
            placeholder="닉네임을 입력해주세요"
            maxLength={10}
            onChange={(e) => handleInputChange(e, 'nickname')}
          />
          {isFormSubmitted && errors.nickname && (
            <p className="text-red-500 text-sm">{errors.nickname}</p>
          )}

          {/* 이름 입력 필드 */}
          <Input
            size="md"
            placeholder="이름을 입력해주세요"
            maxLength={15}
            onChange={(e) => handleInputChange(e, 'name')}
          />
          {isFormSubmitted && errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}

          <Input
            size="md"
            placeholder="이메일을 입력해주세요"
            onChange={(e) => handleInputChange(e, 'email')}
          />
          {isFormSubmitted && errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          {/* 비밀번호 입력 필드 */}
          <Input
            size="md"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            maxLength={15}
            onChange={(e) => handleInputChange(e, 'password')}
          />
          {isFormSubmitted && errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {/* 비밀번호 확인 입력 필드 */}
          <Input
            size="md"
            placeholder="비밀번호를 확인해주세요"
            type="password"
            maxLength={15}
            onChange={(e) => handleInputChange(e, 'confirmPassword')}
          />
          {isFormSubmitted && errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* 가입하기 버튼 */}
        <div className="mt-7">
          <Button
            size="lg"
            color="default"
            shape="square"
            disabled={signupMutation.isLoading}
            type="submit"
          >
            {signupMutation.isLoading ? '처리 중...' : '가입하기'}
          </Button>
        </div>

        {/* 구분선 */}
        <div className="flex w-full items-center max-w-[280px] mt-[21px] mb-4">
          <div className="flex-grow border-t border-bk-50 w-[95px]"></div>
          <span className="flex-shrink text-bk-50 mx-[7px] text-body4 whitespace-nowrap">
            간편 회원 가입
          </span>
          <div className="flex-grow border-t border-bk-50 w-[95px]"></div>
        </div>

        {/* 카카오 로그인 버튼 */}
        <div className="flex justify-center mb-28">
          <KakaoLogin />
        </div>
      </form>
    </div>
  );
};

export default Signup;
