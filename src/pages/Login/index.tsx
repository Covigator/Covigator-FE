import Divider from '../../components/login/Divider';
import LoginForm from '../../components/login/LoginForm';
import SocialLogin from '../../components/login/SocialLogin';

const index = () => {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="flex flex-col items-center justify-center mx-10">
        <h1 className="mt-[135px] text-h1 mb-[57px]">Covigator</h1>

        <LoginForm />

        <div className="text-sm mt-[18px]">
          <a href="/find/id" className="mr-[11px]">
            이메일 찾기
          </a>
          |
          <a href="/find/password" className="mx-[11px]">
            비밀번호 찾기
          </a>
          |
          <a href="/signup" className="ml-[11px]">
            회원가입
          </a>
        </div>

        <Divider />

        <SocialLogin />
      </div>
    </div>
  );
};

export default index;
