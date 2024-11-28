import React, { useState, ChangeEvent } from 'react';
import { CiLock } from 'react-icons/ci';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../api/auth';
import Button from '../../components/common/button/Button';
import Input from '../../components/common/input';
import { useAuthStore } from '../../stores/authStore';

import { z } from 'zod';

// 로그인 폼 유효성 검사를 위한 Zod 스키마 정의
const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

// LoginFormData 타입 정의 (Zod 스키마로부터 추론)
type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  // 에러 상태 관리

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  // 로그인 API 호출을 위한 React Query mutation 설정
  const loginMutation = useMutation(loginUser, {
    onSuccess: (token) => {
      console.log('로그인 성공');
      setAuth(token); // Zustand store 업데이트
      navigate('/'); // 홈페이지로 리다이렉트
    },
    onError: () => {
      console.error('로그인 실패');
      setErrors({
        email: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      });
    },
  });

  // 입력 필드 변경 핸들러
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof LoginFormData,
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Zod를 사용한 폼 데이터 유효성 검사
      loginSchema.parse(formData);
      // 유효성 검사 통과 시 로그인 API 호출
      loginMutation.mutate(formData);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Zod 에러 처리 및 에러 메시지 설정

        const fieldErrors: Partial<LoginFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-[18px]"
    >
      {/* 이메일 입력 필드 */}
      <div className="w-[280px]">
        <Input
          size="lg"
          icon={<HiOutlineEnvelope className="w-6 h-6" />}
          placeholder="이메일을 입력해주세요"
          className="w-full"
          defaultValue={formData.email}
          onChange={(e) => handleInputChange(e, 'email')}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="w-[280px]">
        <Input
          size="lg"
          icon={<CiLock className="w-6 h-6" />}
          placeholder="비밀번호를 입력해주세요"
          className="w-full"
          type="password"
          defaultValue={formData.password}
          onChange={(e) => handleInputChange(e, 'password')}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* 로그인 버튼 */}
      <div className="mt-11">
        <Button
          size="lg"
          color="default"
          shape="square"
          className="text-btn1"
          type="submit"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
