import { useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { Topbar } from '../../../layouts';
import { NoticeItemType } from '../../../types/notice';

import { v4 as uuid } from 'uuid';

const variants = {
  itemContainer:
    'w-full px-1 pt-4 pb-2 border-b-[1px] border-b-bk-60 flex flex-row justify-between',
  title: 'text-bk-90 text-body3',
  date: 'text-btn3 text-bk-70',
  content:
    'mt-[6px] w-full bg-bk-10 rounded-[5px] p-2 text-body6 text-bk-80 whitespace-pre-line',
  chevron: 'w-6 h-6 text-bk-70',
};
const Notice = () => {
  const navigate = useNavigate();
  const dummy: NoticeItemType[] = [
    {
      title: '시스템 정기점검 안내',
      content: '시스템 정기 점검이 예정되어 있습니다.\n어쩌고저쩌고\n랄랄라',
      date: '24.08.17',
    },
    {
      title: '추가 업데이트 안내',
      content: '추가 업데이트가 예정되어 있습니다.\n어쩌고저쩌고\n랄랄라',
      date: '24.08.09',
    },
    {
      title: '서비스 업데이트 안내',
      content: '서비스 업데이트가 예정되어 있습니다.\n어쩌고저쩌고\n랄랄라',
      date: '24.08.01',
    },
  ];

  const [openNotices, setOpenNotices] = useState<number[]>([]);

  return (
    <div className="w-full pt-[63px] px-[30px]">
      <Topbar handleClick={() => navigate('/mypage')} />
      <p className="text-h3 text-bk-90 mb-[19px]">공지사항</p>
      <main className="h-full flex flex-col gap-[3px]">
        {dummy.map((d, i) =>
          openNotices.includes(i) ? (
            <div key={uuid()}>
              <div
                className={variants.itemContainer}
                onClick={() =>
                  setOpenNotices((prev) => prev.filter((index) => i !== index))
                }
              >
                <div className="flex flex-col">
                  <span className={variants.title}>{d.title}</span>
                  <span className={variants.date}>{d.date}</span>
                </div>
                <HiOutlineChevronUp className={variants.chevron} />
              </div>
              <div className={variants.content}>{d.content}</div>
            </div>
          ) : (
            <div
              key={uuid()}
              className={variants.itemContainer}
              onClick={() => setOpenNotices((prev) => [...prev, i])}
            >
              <div className="flex flex-col">
                <span className={variants.title}>{d.title}</span>
                <span className={variants.date}>{d.date}</span>
              </div>
              <HiOutlineChevronDown className={variants.chevron} />
            </div>
          ),
        )}
      </main>
    </div>
  );
};

export default Notice;
