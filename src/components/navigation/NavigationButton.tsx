interface Props {
  Icon: React.ReactNode;
  title: string;
}

const NavigationButton: React.FC<Props> = ({ Icon, title }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>{Icon}</div>

      <div className="text-black">{title}</div>
    </div>
  );
};

export default NavigationButton;
