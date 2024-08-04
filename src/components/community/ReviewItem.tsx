import { IoStar, IoStarOutline } from 'react-icons/io5';

import { v4 as uuid } from 'uuid';

export type ReviewItemProps = {
  name: string;
  content: string;
  img?: string;
  rate: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ReviewItem = ({ name, content, img, rate }: ReviewItemProps) => {
  return (
    <div className="min-w-[190px] min-h-[90px] px-[10px] py-2 rounded-[5px] bg-bk-10">
      <section className="flex justify-between">
        <div className="flex gap-[5px] items-center">
          <img src={img} className="w-7 h-7 rounded-full bg-bk-40" />
          <p className="text-body6 text-bk-70">{name}</p>
        </div>
        <div className="flex gap-0">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={uuid()}>
              {index < rate ? (
                <IoStar className="text-[#FFD600] w-4 h-4" />
              ) : (
                <IoStarOutline className="text-[#FFD600] w-4 h-4" />
              )}
            </span>
          ))}
        </div>
      </section>
      <div className="mt-[9px] text-body5 text-bk-90">{content}</div>
    </div>
  );
};

export default ReviewItem;
