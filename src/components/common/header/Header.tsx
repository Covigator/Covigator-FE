import { HeaderProps } from '.';

import clsx from 'clsx';

const Header = ({ title, subtitle, className }: HeaderProps) => {
  return (
    <div className={clsx(className, 'w-full flex flex-col gap-[6px]')}>
      <p className="text-h1 text-bk-90 whitespace-pre-wrap">{title}</p>
      <p className="text-body3 text-bk-70">{subtitle}</p>
    </div>
  );
};

export default Header;
