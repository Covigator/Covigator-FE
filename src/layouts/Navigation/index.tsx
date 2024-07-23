import { useState } from 'react';
import {
  HiOutlineHome,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUser,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import NavigationButton from '../../components/navigation/NavigationButton';

const Navigation = () => {
  const [activeButton, setActiveButton] = useState<String>('home');
  const navigate = useNavigate();

  const handleNavigation = (path: string, buttonName: string) => {
    setActiveButton(buttonName);
    navigate(path);
  };

  return (
    <section className="fixed w-full h-16 bottom-0">
      <nav className="bg-white w-full h-16 mx-auto flex items-center justify-between rounded-t-lg">
        <div className="w-full max-w-5xl mx-auto px-11 flex items-center justify-between">
          <NavigationButton
            Icon={HiOutlineHome}
            title="홈"
            isActive={activeButton === 'home'}
            onClick={() => handleNavigation('/', 'home')}
          />
          <NavigationButton
            Icon={HiOutlineChatBubbleLeftRight}
            title="커뮤니티"
            isActive={activeButton === 'community'}
            onClick={() => handleNavigation('/community', 'community')}
          />
          <NavigationButton
            Icon={HiOutlineUser}
            title="유저"
            isActive={activeButton === 'user'}
            onClick={() => handleNavigation('/user', 'user')}
          />
        </div>
      </nav>
    </section>
  );
};


export default Navigation;
