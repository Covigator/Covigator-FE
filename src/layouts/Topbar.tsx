import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Topbar = (props: { handleClick?: (e: React.MouseEvent) => void }) => {
  const navigate = useNavigate();
  const handlePrevPage = () => {
    navigate(-1);
  };

  return (
    <div className="absolute top-0 left-0 z-10 box-border w-full h-[60px] px-[15px] flex items-center justify-between bg-wh">
      <HiOutlineChevronLeft
        className="w-6 h-6 text-bk-90"
        onClick={props.handleClick || handlePrevPage}
      />
    </div>
  );
};

export default Topbar;
