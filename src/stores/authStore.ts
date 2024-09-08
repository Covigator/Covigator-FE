import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 인증 상태를 위한 인터페이스 정의
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setAuth: (token: string) => void;
  logout: () => void;
}

// Zustand 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false, // 초기 인증 상태
      token: null, // 초기 토큰 상태
      setAuth: (token: string) => set({ isAuthenticated: true, token }), // 로그인 시 상태 업데이트
      logout: () => set({ isAuthenticated: false, token: null }), // 로그아웃 시 상태 리셋
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    },
  ),
);
