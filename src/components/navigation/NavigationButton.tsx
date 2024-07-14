interface Props {
  Icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const NavigationButton: React.FC<Props> = ({
  Icon,
  title,
  isActive,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center"
      onClick={onClick}
    >
      <div>{Icon}</div>

      <div className={`text-black ${isActive ? 'text-[#606AB1]' : ''}`}>
        {title}
      </div>
    </div>
  );
};

export default NavigationButton;
