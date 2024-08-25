import { HiOutlineChevronRight } from 'react-icons/hi';

import { MypageMenuItems } from '../../constants/object';

const Mypage = () => {
  return (
    <div className="w-full !px-5 pt-[105px] flex flex-col items-center">
      <img
        src=""
        alt="프로필 사진"
        className="w-[100px] h-[100px] rounded-full mb-[15px] bg-bk-30"
      />
      <p className="mb-[5px] text-h3 text-bk-90">박재욱</p>
      <div className="px-[15px] py-[3px] rounded-[10px] bg-bk-30 text-body6 text-bk-70">
        asdf@naver.com
      </div>
      <div className="w-full flex flex-col gap-[5px] mt-[31px]">
        {MypageMenuItems.map((d, i) => {
          return (
            <div className="rounded-[10px] !px-5 !py-3 bg-bk-10 flex flex-row justify-between">
              <div className="flex flex-row gap-[10px] whitespace-nowrap">
                {<d.icon className="w-6 h-6 text-bk-90" />}
                <span className="text-body1 text-bk-90">{d.text}</span>
              </div>
              <HiOutlineChevronRight className="w-6 h-6 text-bk-90" />
            </div>
          );
        })}
      </div>
      <span className="w-full mt-[23px] text-body5 text-bk-70">
        버전 정보 | v1.0.0
      </span>
    </div>
  );
};

export default Mypage;