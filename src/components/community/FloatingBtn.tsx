import { HiOutlinePencil } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const FloatingBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      className="fixed right-[14px] bottom-16 mb-[23px] z-10 bg-sub-300
                w-[65px] h-[65px] rounded-full flex justify-center items-center"
      onClick={() => navigate('/register')}
    >
      <HiOutlinePencil className="text-wh w-10 h-10" />
    </button>
  );
};

export default FloatingBtn;
