import { Topbar } from '../../../layouts';

const Index = () => {
  return (
    <div className="h-screen">
      <Topbar />
      <div className="flex flex-col items-center mt-5">
        <div className="mt-10 text-h2">Covigator</div>

        <div className="flex flex-col mt-11">
          <div className="text-body5">휴대폰 번호 (숫자만 입력)</div>
          <span className="flex"></span>
        </div>
      </div>
    </div>
  );
};

export default Index;
