const Divider = () => {
  return (
    <div className="flex items-center w-full max-w-[280px] mt-[33px] mb-[15px]">
      <div className="flex-grow border-t border-bk-50 w-[120px]"></div>
      <span className="flex-shrink mx-[7px] text-body4 text-bk-50 whitespace-nowrap">
        또는
      </span>
      <div className="flex-grow border-t border-bk-50  w-[120px]"></div>
    </div>
  );
};

export default Divider;
