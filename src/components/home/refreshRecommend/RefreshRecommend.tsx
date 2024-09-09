import { HiOutlineRefresh } from 'react-icons/hi';

const RefreshRecommend = (props: {
  handleClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <button
      className="absolute top-[22px] right-[15px] z-10 box-border flex gap-x-[2px] bg-transparent"
      onClick={props.handleClick}
    >
      <nav className="text-nav text-bk-70">다시 추천받고 싶어요</nav>
      <HiOutlineRefresh />
    </button>
  );
};

export default RefreshRecommend;
