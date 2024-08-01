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
          <img src={img} />
          <p className="text-body6 text-bk-70">{name}</p>
        </div>
        {/* TODO: 별점 추가 */}
      </section>
      <div className="mt-[9px] text-body5 text-bk-90">{content}</div>
    </div>
  );
};

export default ReviewItem;
