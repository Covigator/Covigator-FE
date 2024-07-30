import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { IoStar } from 'react-icons/io5';

export type CourseItemProps = {
  title: string;
  caption: string;
  img?: string;
  rate: number;
  isLike: boolean;
};

const CourseItem = ({ title, caption, img, rate, isLike }: CourseItemProps) => {
  return (
    <div className="w-full h-[220px] rounded-[5px] bg-wh border">
      <div className="h-[150px] relative">
        <img src={img} className="w-full h-full bg-bk-50" />
        {isLike ? (
          <IoMdHeart className="absolute top-[9px] right-3 cursor-pointer" />
        ) : (
          <IoMdHeartEmpty className="absolute top-[9px] right-3 cursor-pointer" />
        )}
      </div>

      <section className="flex justify-between px-3 pt-[13px] pb-[18px]">
        <div className="flex flex-col gap-[3px]">
          <p className="text-body3 text-bk-90">{title}</p>
          <p className="text-body6 text-bk-70">{caption}</p>
        </div>
        <div className="flex gap-[3px]">
          <IoStar className="top-[2px] w-[15px] h-[15px] text-[#FFD600]" />
          <p className="text-body6 text-bk-70">{rate}</p>
        </div>
      </section>
    </div>
  );
};

export default CourseItem;
